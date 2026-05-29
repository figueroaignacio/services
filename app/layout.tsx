// Root layout is intentionally minimal.
// The [locale] segment layout handles HTML/body with fonts, ThemeProvider, and NextIntlClientProvider.
// This root layout exists only to satisfy Next.js app directory requirements.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
