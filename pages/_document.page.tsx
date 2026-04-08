import Document, { Html, Head, Main, NextScript, type DocumentContext } from "next/document";
import { rtlLocales, type SupportedLocale } from "@/i18n/messages";

type Props = {
  locale: SupportedLocale;
};

class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const locale = ((ctx.locale ?? "en") as SupportedLocale);
    return { ...initialProps, locale };
  }

  render() {
    const locale = this.props.locale || "en";
    const dir = rtlLocales.includes(locale) ? "rtl" : "ltr";

    return (
      <Html lang={locale} dir={dir}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
