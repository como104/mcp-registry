import "./assets/style.css";

import Footer from "./components/footer";
import Header from "./components/header";
import { Page } from "@/types/landing";

export default function ({
  children,
  page,
}: Readonly<{
  children: React.ReactNode;
  page: Page;
}>) {
  // Determine if the search bar should be shown based on page or other logic
  // For now, let's assume it's always shown if a header exists.
  // You can customize this logic.
  const showSearch = !!page.header;
  const searchQuery = page.metadata?.searchQuery;

  return (
    <main>
      {page.header && <Header header={page.header} showSearch={showSearch} searchQuery={searchQuery} />}
      {children}
      {page.footer && <Footer footer={page.footer} />}
    </main>
  );
}
