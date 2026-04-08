/**
 * SEOMeta — thin wrapper around useSEO for use in class-component or layout trees.
 * For most pages, call useSEO() directly at the top of the page component instead.
 */
import { useSEO, type SEOConfig } from "../hooks/useSEO";

type Props = SEOConfig;

export function SEOMeta(props: Props) {
  useSEO(props);
  return null;
}
