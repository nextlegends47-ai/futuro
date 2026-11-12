"use client";

import { useSyncExternalStore } from "react";
import { MAX_QTY } from "@/config/site";
import { productBySlug, type Amount, type Product } from "@/data/catalog";

/* ---------------------------------------------------------------------------
 * Kleiner Speicher für Zustand im Browser.
 * Warenkorb und Merkliste liegen im Speicher des Geräts (technisch notwendig,
 * von der Person selbst ausgelöst). „Zuletzt angesehen“ lebt nur im
 * Arbeitsspeicher und wird nie auf dem Gerät abgelegt.
 * ------------------------------------------------------------------------- */

type Listener = () => void;

interface Store<T> {
  get: () => T;
  getServer: () => T;
  set: (next: T | ((prev: T) => T)) => void;
  subscribe: (listener: Listener) => () => void;
}

function createStore<T>(initial: T, storageKey?: string, sanitize?: (value: unknown) => T, serverValue: T = initial): Store<T> {
  let state = initial;
  let loaded = !storageKey;
  const listeners = new Set<Listener>();

  const read = () => {
    try {
      const raw = window.localStorage.getItem(storageKey!);
      if (raw == null) return initial;
      const parsed: unknown = JSON.parse(raw);
      return sanitize ? sanitize(parsed) : (parsed as T);
    } catch {
      return initial;
    }
  };

  const load = () => {
    if (loaded || typeof window === "undefined") return;
    loaded = true;
    state = read();
    // Änderungen aus einem anderen Tab übernehmen
    window.addEventListener("storage", (event) => {
      if (event.key !== storageKey) return;
      state = read();
      listeners.forEach((l) => l());
    });
  };

  return {
    get: () => {
      load();
      return state;
    },
    getServer: () => serverValue,
    set: (next) => {
      load();
      state = typeof next === "function" ? (next as (prev: T) => T)(state) : next;
      if (storageKey) {
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(state));
        } catch {
          /* Speicher voll oder gesperrt: Zustand bleibt für diese Sitzung erhalten */
        }
      }
      listeners.forEach((l) => l());
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

export function useStore<T>(store: Store<T>): T {
  return useSyncExternalStore(store.subscribe, store.get, store.getServer);
}

/* ------------------------------- Warenkorb ------------------------------- */

export interface Gift {
  email: string;
  message: string;
}

export interface CartLine {
  id: string;
  slug: string;
  amountId: string;
  qty: number;
  gift?: Gift;
}

const clampQty = (n: number) => Math.min(MAX_QTY, Math.max(1, Math.round(n) || 1));

function sanitizeCart(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return [];
  const lines: CartLine[] = [];
  for (const raw of value) {
    if (!raw || typeof raw !== "object") continue;
    const { id, slug, amountId, qty, gift } = raw as Partial<CartLine>;
    if (typeof id !== "string" || typeof slug !== "string" || typeof amountId !== "string") continue;
    // Nur Positionen behalten, die es im Katalog mit Preis gibt
    if (!productBySlug(slug)?.amounts?.some((a) => a.id === amountId)) continue;
    const line: CartLine = { id, slug, amountId, qty: clampQty(Number(qty)) };
    if (gift && typeof gift.email === "string" && typeof gift.message === "string") line.gift = { email: gift.email, message: gift.message };
    lines.push(line);
  }
  return lines;
}

const EMPTY_CART: CartLine[] = [];
export const cartStore = createStore<CartLine[]>(EMPTY_CART, "ic.cart.v1", sanitizeCart);

let lineCounter = 0;
const newLineId = () => `${Date.now().toString(36)}-${(lineCounter++).toString(36)}`;

export function addToCart(slug: string, amountId: string, qty = 1, gift?: Gift) {
  cartStore.set((lines) => {
    // Gleiche Position ohne Geschenk zusammenfassen
    const existing = gift ? undefined : lines.find((l) => l.slug === slug && l.amountId === amountId && !l.gift);
    if (existing) return lines.map((l) => (l === existing ? { ...l, qty: clampQty(l.qty + qty) } : l));
    return [...lines, { id: newLineId(), slug, amountId, qty: clampQty(qty), ...(gift ? { gift } : {}) }];
  });
}

export const setLineQty = (id: string, qty: number) => cartStore.set((lines) => lines.map((l) => (l.id === id ? { ...l, qty: clampQty(qty) } : l)));
export const removeLine = (id: string) => cartStore.set((lines) => lines.filter((l) => l.id !== id));

export interface ResolvedLine extends CartLine {
  product: Product;
  amount: Amount;
  /** Preis der Position: Stückpreis mal Menge, immer aus dem Katalog */
  total: number;
}

export function resolveCart(lines: CartLine[]): ResolvedLine[] {
  const resolved: ResolvedLine[] = [];
  for (const line of lines) {
    const product = productBySlug(line.slug);
    const amount = product?.amounts?.find((a) => a.id === line.amountId);
    if (product && amount) resolved.push({ ...line, product, amount, total: amount.price * line.qty });
  }
  return resolved;
}

export const cartCount = (lines: CartLine[]) => lines.reduce((sum, l) => sum + l.qty, 0);
export const cartTotal = (lines: ResolvedLine[]) => lines.reduce((sum, l) => sum + l.total, 0);

/* ------------------------------- Merkliste ------------------------------- */

const EMPTY_LIST: string[] = [];
const sanitizeSlugs = (value: unknown) => (Array.isArray(value) ? value.filter((s): s is string => typeof s === "string" && Boolean(productBySlug(s))) : []);

export const wishlistStore = createStore<string[]>(EMPTY_LIST, "ic.wishlist.v1", sanitizeSlugs);

/** Schaltet ein Produkt auf der Merkliste um und meldet, ob es jetzt gemerkt ist. */
export function toggleWish(slug: string): boolean {
  const has = wishlistStore.get().includes(slug);
  wishlistStore.set((list) => (has ? list.filter((s) => s !== slug) : [...list, slug]));
  return !has;
}

/* --------------------------- Zuletzt angesehen --------------------------- */

export const recentStore = createStore<string[]>(EMPTY_LIST);
export const markViewed = (slug: string) => recentStore.set((list) => (list[0] === slug ? list : [slug, ...list.filter((s) => s !== slug)].slice(0, 12)));

/* ------------------------- Hinweis zu den Cookies ------------------------ */

/** `true`, sobald der Hinweis bestätigt ist. Auf dem Server gilt er als bestätigt, damit er nicht kurz aufblitzt. */
export const noticeStore = createStore<boolean>(false, "ic.notice.v1", (v) => v === true, true);

/* ------------------------------ Oberfläche ------------------------------- */

export type Panel = "search" | "menu" | "cart" | null;
export const panelStore = createStore<Panel>(null);
export const openPanel = (panel: Panel) => panelStore.set(panel);
export const closePanel = () => panelStore.set(null);

/** Nummer aus dem Abschnitt „Handy aufladen“ der Startseite. Nur im Arbeitsspeicher, nie in der Adresse. */
export const topupDraftStore = createStore<{ country: string; number: string }>({ country: "DE", number: "" });

/* -------------------------------- Meldungen ------------------------------ */

export interface Toast {
  id: number;
  text: string;
  link?: { href: string; label: string };
  /** Nur für Vorlese-Programme, ohne sichtbare Meldung */
  silent?: boolean;
}

const NO_TOASTS: Toast[] = [];
export const toastStore = createStore<Toast[]>(NO_TOASTS);
let toastCounter = 0;

export function toast(text: string, options: Omit<Toast, "id" | "text"> = {}) {
  const id = ++toastCounter;
  toastStore.set((list) => [...list.slice(-2), { id, text, ...options }]);
  window.setTimeout(() => toastStore.set((list) => list.filter((t) => t.id !== id)), 4200);
}
