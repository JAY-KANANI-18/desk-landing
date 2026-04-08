import { useMemo } from "react";
import type { AnchorHTMLAttributes, PropsWithChildren, ReactElement, ReactNode } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

type To = string | { pathname: string; query?: Record<string, string | number | boolean | undefined> };

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: To;
  replace?: boolean;
  state?: unknown;
};

export function Link({ to, replace, children, ...props }: PropsWithChildren<LinkProps>) {
  const href = typeof to === "string" ? to : { pathname: to.pathname, query: to.query };
  return (
    <NextLink href={href} replace={replace} {...props}>
      {children}
    </NextLink>
  );
}

export function useParams<T extends Record<string, string | undefined>>() {
  const { query } = useRouter();
  return query as T;
}

export function useNavigate() {
  const router = useRouter();
  return (to: string | number) => {
    if (typeof to === "number") {
      if (to === -1) router.back();
      return;
    }
    void router.push(to);
  };
}

export function useLocation() {
  const router = useRouter();
  return useMemo(() => {
    const asPath = router.asPath || "/";
    const [pathAndQuery, hashPart] = asPath.split("#");
    const [pathnamePart, queryPart] = pathAndQuery.split("?");
    return {
      pathname: pathnamePart || "/",
      search: queryPart ? `?${queryPart}` : "",
      hash: hashPart ? `#${hashPart}` : "",
    };
  }, [router.asPath]);
}

export function BrowserRouter({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function Routes({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function Route({ element }: { path?: string; element?: ReactElement }) {
  return element ?? null;
}
