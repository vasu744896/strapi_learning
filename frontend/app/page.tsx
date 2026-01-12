"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Baiondata Solution
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-lg md:text-xl mb-12 leading-relaxed">
          A secure and intelligent platform to manage analytics, dashboards,
          and enterprise data with confidence.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          {/* Login */}
          <button
            onClick={() => router.push("/login")}
            className="px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-700/40 transition-all duration-200"
          >
            Login
          </button>

          {/* Register */}
          <button
            onClick={() => router.push("/register")}
            className="px-8 py-3 rounded-xl border border-blue-500/60 text-blue-400 font-semibold hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200"
          >
            Register
          </button>
        </div>
      </div>
    </main>
  );
}
