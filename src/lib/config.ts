import catalogJson from "../../data/catalog.json";
import type { Catalog } from "./types";

const catalog = catalogJson as Catalog;

/**
 * Storefront identity. Change `store_name` (and related copy) in
 * `data/catalog.json` — this constant is the single re-export used by the UI.
 */
export const STORE_NAME = catalog.store_name;
export const STORE_NAME_NOTE = catalog.store_name_note ?? "";
export const STORE_TAGLINE =
  catalog.tagline ?? "A private collection of Persian carpets";
export const ENQUIRY_NOTE =
  catalog.enquiry_note ?? "Visit the gallery to view pieces in person.";
export const CURRENCY = catalog.currency ?? "ZAR";
export const PRICE_DISCLAIMER =
  catalog.price_disclaimer ?? "Indicative price — confirm with the gallery";
export const PRICE_MODE = catalog.price_mode;
export const HOMEPAGE_HERO_ID = catalog.homepage_hero_id ?? null;
export const TYPE_COPY: Record<string, string> = catalog.type_copy ?? {};

export const store = {
  name: STORE_NAME,
  nameNote: STORE_NAME_NOTE,
  tagline: STORE_TAGLINE,
  enquiryNote: ENQUIRY_NOTE,
  currency: CURRENCY,
  priceDisclaimer: PRICE_DISCLAIMER,
  priceMode: PRICE_MODE,
  homepageHeroId: HOMEPAGE_HERO_ID,
  typeCopy: TYPE_COPY,
} as const;
