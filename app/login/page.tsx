"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("http://localhost:8080/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data?.message || data?.error || "Login failed");
      return;
    }

    if (data?.accessToken) {
      document.cookie = `accessToken=${encodeURIComponent(data.accessToken)}; path=/; max-age=${60 * 60 * 24 * 7}`;
    }

    router.push("/");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black text-slate-900">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-semibold mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Email / Username</span>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              type="text"
              placeholder="dip@test.com"
              className="mt-1 w-full rounded-lg border px-3 py-2"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Password</span>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="test@12345"
              className="mt-1 w-full rounded-lg border px-3 py-2"
              required
            />
          </label>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-600">
          Don't have an account?{' '}
          <Link href="/register" className="font-semibold text-slate-900">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
