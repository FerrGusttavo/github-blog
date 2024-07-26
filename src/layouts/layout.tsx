import { ReactNode } from "react";
import { Header } from "../components/header";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const shouldShowHeader = location.pathname !== "/404";

  return (
    <div>
      {shouldShowHeader && <Header />}
      <main>{children}</main>
    </div>
  );
}
