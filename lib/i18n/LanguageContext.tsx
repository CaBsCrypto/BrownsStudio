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

const CYCLE: Lang[] = ["es", "en", "pt"];

function getLangFromPath(pathname: string | null): Lang {
  if (pathname?.startsWith("/en")) return "en";
  if (pathname?.startsWith("/pt")) return "pt";
  return "es"; // default
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
    const idx = CYCLE.indexOf(lang);
    const next = CYCLE[(idx + 1) % CYCLE.length];
    const newPath = (pathname ?? "/").replace(/^\/(en|es|pt)(\/|$)/, `/${next}$2`);
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
