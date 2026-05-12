"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type UserData = {
  id: string;
  username: string;
  email: string;
  roles: string[];
};

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const res = await fetch("/api/test/user");
      const json = await res.text();

      if (!res.ok) {
        setError( "Failed to load user");
        setLoading(false);
        return;
      }

      setUser(JSON.parse(json));
      setLoading(false);
    }

    fetchUser();
  }, []);

  async function handleSignOut() {
    document.cookie = "accessToken=; path=/; max-age=0";
    router.push("/login");
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black text-slate-900">
        <p>Loading protected data...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black text-slate-900">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.push("/login")}
            className="rounded-lg bg-slate-900 px-4 py-2 text-white"
          >
            Go to Login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black text-slate-900">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">Protected Home</h1>
        <p className="mb-2">Welcome back, <strong>{user?.username}</strong>!</p>
        <p className="mb-4 text-slate-600">Your protected data is loaded from the backend via a proxied API call.</p>

        <div className="rounded-xl bg-slate-100 p-4">
          <pre className="whitespace-pre-wrap text-sm text-slate-800">{JSON.stringify(user, null, 2)}</pre>
        </div>

        <button
          onClick={handleSignOut}
          className="mt-6 rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
        >
          Sign out
        </button>
      </div>
    </main>
  );
}
