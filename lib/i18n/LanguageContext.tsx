"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { translations, type Lang } from "./translations";

type T = typeof translations.en;

interface LangCtx {
  lang: Lang;
  t: T;
  toggle: () => void;
}

const Context = createContext<LangCtx>({
  lang: "en",
  t: translations.en as T,
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "en" || saved === "es") setLang(saved);
  }, []);

  const toggle = () => {
    const next: Lang = lang === "en" ? "es" : "en";
    setLang(next);
    localStorage.setItem("lang", next);
  };

  return (
    <Context.Provider value={{ lang, t: translations[lang] as T, toggle }}>
      {children}
    </Context.Provider>
  );
}

export function useLang() {
  return useContext(Context);
}
