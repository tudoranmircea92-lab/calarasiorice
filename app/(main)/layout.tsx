import { BottomNav } from "@/lib/components/bottom-nav";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="main-container">
      {children}
      <BottomNav />
    </div>
  );
}
