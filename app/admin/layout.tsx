"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin/businesses", label: "Negocios", icon: "🏢" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  // Don't render sidebar on login page
  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-[#0e0e0e] border-r border-[#484848]/20 flex flex-col">
        {/* Brand */}
        <div className="px-4 py-5 border-b border-[#484848]/20">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#47c4ff]/20 border border-[#47c4ff]/30 flex items-center justify-center">
              <span className="text-[#47c4ff] text-xs font-bold">B</span>
            </div>
            <div>
              <p className="text-[#e5e5e5] text-sm font-semibold leading-none">Browns Studio</p>
              <p className="text-[#484848] text-[10px] mt-0.5">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-[#47c4ff]/10 text-[#47c4ff] border border-[#47c4ff]/20"
                    : "text-[#9e9e9e] hover:bg-[#1f1f1f] hover:text-[#e5e5e5]"
                }`}
              >
                <span>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-[#484848]/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#9e9e9e] hover:bg-[#1f1f1f] hover:text-red-400 transition-colors"
          >
            <span>↩</span>
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
