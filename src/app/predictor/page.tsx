"use client";

import Link from "next/link";
import { useState } from "react";

type College = {
  id: number;
  name: string;
  location: string;
  description?: string;
  fees: number;
  rating: number;
  averagePlacement: number;
  highestPlacement: number;
};

export default function PredictorPage() {
  const [exam, setExam] = useState("JEE Main");
  const [rank, setRank] = useState("");
  const [results, setResults] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function predictColleges() {
    const studentRank = Number(rank);

    if (!Number.isInteger(studentRank) || studentRank <= 0) {
      alert("Please enter a valid rank.");
      return;
    }

    setLoading(true);
    setSearched(true);
    setResults([]);

    try {
      const response = await fetch("/api/predictor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          exam,
          rank: studentRank,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to predict colleges");
      }

      const colleges: College[] = result.data || [];

      setResults(colleges.slice(0, 5));
    } catch (error) {
      console.error("Prediction failed:", error);
      setResults([]);
      alert("Failed to find colleges. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function formatMoney(value: number) {
    return `₹${value.toLocaleString("en-IN")}`;
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <div>
            <Link
              href="/"
              className="text-2xl font-bold text-slate-900"
            >
              🎓 CollegeFinder
            </Link>

            <p className="mt-1 text-sm text-slate-600">
              Find and compare the right college for your future
            </p>
          </div>

          <nav className="flex gap-3">

            <Link
              href="/"
              className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-medium text-slate-900 transition hover:bg-slate-50"
            >
              Colleges
            </Link>

            <Link
              href="/compare"
              className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-medium text-slate-900 transition hover:bg-slate-50"
            >
              Compare
            </Link>

            <Link
              href="/predictor"
              className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Predictor
            </Link>

          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}

      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* BACK */}

        <Link
          href="/"
          className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
        >
          ← Back to Colleges
        </Link>

        {/* PAGE HEADING */}

        <h1 className="mt-6 text-4xl font-bold text-slate-900">
          College Predictor
        </h1>

        <p className="mt-2 text-slate-600">
          Enter your exam and rank to find suitable colleges.
        </p>

        {/* PREDICTOR FORM */}

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-semibold text-slate-900">
            Enter Your Details
          </h2>

          <p className="mt-2 text-slate-600">
            Select your entrance exam and enter your rank.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* EXAM */}

            <div>
              <label
                htmlFor="exam"
                className="mb-2 block font-semibold text-slate-900"
              >
                Exam
              </label>

              <select
                id="exam"
                value={exam}
                onChange={(e) => setExam(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="JEE Main">JEE Main</option>
                <option value="JEE Advanced">JEE Advanced</option>
              </select>
            </div>

            {/* RANK */}

            <div>
              <label
                htmlFor="rank"
                className="mb-2 block font-semibold text-slate-900"
              >
                Your Rank
              </label>

              <input
                id="rank"
                type="number"
                min="1"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                placeholder="e.g. 15000"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

          </div>

          {/* BUTTON */}

          <button
            onClick={predictColleges}
            disabled={loading}
            className="mt-7 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Finding Colleges..." : "Find Colleges"}
          </button>

        </section>

        {/* RESULTS */}

        {searched && !loading && (
          <section className="mt-10">

            {/* RESULTS HEADER */}

            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Recommended Colleges
                </h2>

                <p className="mt-1 text-slate-600">
                  Based on your {exam} rank of{" "}
                  {Number(rank).toLocaleString("en-IN")}.
                </p>
              </div>

              {results.length > 0 && (
                <span className="font-medium text-slate-700">
                  {results.length} colleges found
                </span>
              )}

            </div>

            {/* NO RESULTS */}

            {results.length === 0 ? (

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

                <div className="text-4xl">
                  🔍
                </div>

                <h3 className="mt-4 text-2xl font-semibold text-slate-900">
                  No recommendations found
                </h3>

                <p className="mt-2 text-slate-600">
                  Try entering a different rank or selecting another exam.
                </p>

              </div>

            ) : (

              /* COLLEGE RESULTS */

              <div className="mt-6 space-y-6">

                {results.map((college, index) => (

                  <article
                    key={college.id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                  >

                    {/* COLLEGE HEADER */}

                    <div className="border-b border-slate-200 p-6">

                      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

                        <div>

                          <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
                            Recommendation #{index + 1}
                          </div>

                          <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                            {college.name}
                          </h3>

                          <p className="mt-2 text-lg text-slate-600">
                            📍 {college.location}
                          </p>

                        </div>

                        {/* RATING */}

                        <div className="flex w-fit items-center gap-2 rounded-full bg-yellow-100 px-4 py-2">

                          <span className="text-xl">
                            ⭐
                          </span>

                          <span className="text-lg font-semibold text-yellow-700">
                            {college.rating}
                          </span>

                        </div>

                      </div>

                    </div>

                    {/* COLLEGE INFORMATION */}

                    <div className="p-6">

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        {/* FEES */}

                        <div className="rounded-xl bg-slate-50 p-4">

                          <p className="text-sm font-medium text-slate-500">
                            Annual Fees
                          </p>

                          <p className="mt-2 text-xl font-bold text-slate-900">
                            {formatMoney(college.fees)}
                          </p>

                        </div>

                        {/* RATING */}

                        <div className="rounded-xl bg-slate-50 p-4">

                          <p className="text-sm font-medium text-slate-500">
                            Rating
                          </p>

                          <p className="mt-2 text-xl font-bold text-slate-900">
                            ⭐ {college.rating}
                          </p>

                        </div>

                        {/* AVERAGE PLACEMENT */}

                        <div className="rounded-xl bg-slate-50 p-4">

                          <p className="text-sm font-medium text-slate-500">
                            Avg. Placement
                          </p>

                          <p className="mt-2 text-xl font-bold text-green-600">
                            {formatMoney(college.averagePlacement)}
                          </p>

                        </div>

                        {/* HIGHEST PLACEMENT */}

                        <div className="rounded-xl bg-slate-50 p-4">

                          <p className="text-sm font-medium text-slate-500">
                            Highest Placement
                          </p>

                          <p className="mt-2 text-xl font-bold text-green-600">
                            {formatMoney(college.highestPlacement)}
                          </p>

                        </div>

                      </div>

                      {/* EXAM INFORMATION */}

                      <div className="mt-5 rounded-xl bg-slate-50 p-4">

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                          <div>
                            <p className="text-sm font-medium text-slate-500">
                              Entrance Exam
                            </p>

                            <p className="mt-1 text-lg font-semibold text-slate-900">
                              {exam}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-slate-500">
                              Your Rank
                            </p>

                            <p className="mt-1 text-lg font-semibold text-slate-900">
                              {Number(rank).toLocaleString("en-IN")}
                            </p>
                          </div>

                        </div>

                      </div>

                      {/* ONLY CLICKABLE COLLEGE LINK */}

                      <Link
                        href={`/${college.id}`}
                        className="mt-6 block rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                      >
                        View College Details →
                      </Link>

                    </div>

                  </article>

                ))}

              </div>

            )}

          </section>
        )}

      </div>

    </main>
  );
}