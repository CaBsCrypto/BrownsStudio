"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/businesses");
    } else {
      const data = await res.json();
      setError(data.error ?? "Error al iniciar sesión");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#47c4ff]/20 border border-[#47c4ff]/30 flex items-center justify-center">
              <span className="text-[#47c4ff] text-sm font-bold">B</span>
            </div>
            <span className="text-[#e5e5e5] font-semibold text-lg">Browns Studio</span>
          </div>
          <p className="text-[#9e9e9e] text-sm">Panel de administración</p>
        </div>

        {/* Card */}
        <div className="bg-[#131313] border border-[#484848]/30 rounded-2xl p-6">
          <h1 className="text-[#e5e5e5] font-semibold text-lg mb-1">Iniciar sesión</h1>
          <p className="text-[#9e9e9e] text-sm mb-6">Ingresá tu contraseña de administrador</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[#9e9e9e] text-xs font-medium mb-1.5 uppercase tracking-wider">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#1f1f1f] border border-[#484848]/40 rounded-lg px-4 py-2.5 text-[#e5e5e5] text-sm placeholder:text-[#484848] focus:outline-none focus:border-[#47c4ff]/50 transition-colors"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#47c4ff] hover:bg-[#05a9e3] disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold rounded-lg py-2.5 text-sm transition-colors"
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        </div>

        <p className="text-center text-[#484848] text-xs mt-6">
          Browns Studio · Admin Panel
        </p>
      </div>
    </div>
  );
}
