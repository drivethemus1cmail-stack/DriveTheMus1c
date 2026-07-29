import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * Minimal history-based router. The site is two pages — a routing library
 * would be more dependency than the problem deserves.
 */

type RouterApi = { path: string; navigate: (to: string) => void };

const RouterContext = createContext<RouterApi | null>(null);

function currentPath() {
  if (typeof window === "undefined") return "/";
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    const onPop = () => setPath(currentPath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((to: string) => {
    if (to !== currentPath()) {
      window.history.pushState({}, "", to);
      setPath(to.replace(/\/+$/, "") || "/");
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const value = useMemo<RouterApi>(() => ({ path, navigate }), [path, navigate]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRouter(): RouterApi {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useRouter must be used inside RouterProvider");
  return ctx;
}

type LinkProps = {
  to: string;
  className?: string;
  children: ReactNode;
};

/**
 * A real <a> so middle-click, ctrl/cmd-click, and "open in new tab" behave
 * normally — it only intercepts plain left-clicks.
 */
export function Link({ to, className, children }: LinkProps) {
  const { navigate } = useRouter();

  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}
