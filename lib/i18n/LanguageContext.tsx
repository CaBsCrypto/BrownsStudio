"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { translations, type Lang } from "./translations";

type T = typeof translations.en;

interface LangCtx {
  lang: Lang;
  t: T;
  toggle: () => void;
}

const Context = createContext<LangCtx>({
  lang: "es",
  t: translations.es as unknown as T,
  toggle: () => {},
});

function getLangFromPath(pathname: string | null): Lang {
  if (pathname?.startsWith("/en")) return "en";
  return "es"; // default — /es or anything else
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [lang, setLang] = useState<Lang>(() => getLangFromPath(pathname));

  // Keep lang in sync when user navigates (e.g. browser back/forward)
  useEffect(() => {
    setLang(getLangFromPath(pathname));
  }, [pathname]);

  const toggle = () => {
    const next: Lang = lang === "en" ? "es" : "en";
    // Replace /en or /es at the start of the path, preserve the rest
    const newPath = (pathname ?? "/").replace(/^\/(en|es)(\/|$)/, `/${next}$2`);
    router.push(newPath || `/${next}`);
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
