"use client";

import { useEffect, useState } from "react";

type College = {
  id: number;
  name: string;
  location: string;
  description: string;
  fees: number;
  rating: number;
  averagePlacement: number;
  highestPlacement: number;
};

type ApiResponse = {
  data: College[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export default function Home() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxFees, setMaxFees] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchColleges() {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      if (search) params.set("search", search);
      if (location) params.set("location", location);
      if (minRating) params.set("minRating", minRating);
      if (maxFees) params.set("maxFees", maxFees);

      params.set("page", page.toString());
      params.set("limit", "5");

      const response = await fetch(
        `/api/colleges?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch colleges");
      }

      const result: ApiResponse = await response.json();

      setColleges(result.data);
      setTotalPages(result.pagination.totalPages);
    } catch (err) {
      console.error(err);
      setError("Unable to load colleges.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchColleges();
  }, [page]);

  function handleSearch() {
    setPage(1);
    fetchColleges();
  }

  function clearFilters() {
    setSearch("");
    setLocation("");
    setMinRating("");
    setMaxFees("");
    setPage(1);

    setTimeout(() => {
      fetchColleges();
    }, 0);
  }

  function formatCurrency(amount: number) {
    return `₹${amount.toLocaleString("en-IN")}`;
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                🎓 CollegeFinder
              </h1>

              <p className="mt-1 text-sm text-slate-700">
                Find and compare the right college for your future
              </p>
            </div>

            {/* Navigation */}
            <nav className="flex flex-wrap gap-3">

              <a
                href="/"
                className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
              >
                Colleges
              </a>

              <a
                href="/compare"
                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 font-medium text-slate-800 transition hover:bg-slate-50"
              >
                Compare
              </a>

              <a
                href="/predictor"
                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 font-medium text-slate-800 transition hover:bg-slate-50"
              >
                Predictor
              </a>

            </nav>

          </div>

        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Hero */}
        <section className="mb-8">

          <h2 className="text-4xl font-bold tracking-tight text-slate-900">
            Find Your Perfect College
          </h2>

          <p className="mt-3 max-w-3xl text-lg text-slate-700">
            Search colleges, compare fees, ratings and placement
            information to make a better decision.
          </p>

        </section>

        {/* Search and Filters */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          <h3 className="text-2xl font-semibold text-slate-900">
            Search & Filters
          </h3>

          <p className="mt-1 text-slate-600">
            Find colleges based on your preferences.
          </p>

          {/* First row */}
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">

            {/* Search */}
            <div className="lg:col-span-2">

              <label
                htmlFor="college-search"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Search College
              </label>

              <input
                id="college-search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Search by college name..."
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

            {/* Location */}
            <div>

              <label
                htmlFor="location"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Location
              </label>

              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Mumbai"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

            {/* Rating */}
            <div>

              <label
                htmlFor="rating"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Minimum Rating
              </label>

              <select
                id="rating"
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Any Rating</option>
                <option value="4.0">4.0+</option>
                <option value="4.5">4.5+</option>
                <option value="4.7">4.7+</option>
                <option value="4.8">4.8+</option>
                <option value="4.9">4.9+</option>
              </select>

            </div>

          </div>

          {/* Second row */}
          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end">

            {/* Maximum Fees */}
            <div className="w-full sm:max-w-xs">

              <label
                htmlFor="max-fees"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Maximum Fees
              </label>

              <input
                id="max-fees"
                type="number"
                value={maxFees}
                onChange={(e) => setMaxFees(e.target.value)}
                placeholder="e.g. 300000"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

            <button
              onClick={handleSearch}
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Search Colleges
            </button>

            <button
              onClick={clearFilters}
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-800 transition hover:bg-slate-50"
            >
              Clear Filters
            </button>

          </div>

        </section>

        {/* Results */}
        <section className="mt-8">

          <div className="mb-4 flex items-center justify-between">

            <h3 className="text-xl font-bold text-slate-900">
              College Listings
            </h3>

            <span className="text-sm font-medium text-slate-600">
              {colleges.length} results
            </span>

          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-slate-700">
              Loading colleges...
            </div>
          )}

          {/* Table */}
          {!loading && colleges.length > 0 && (
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

              <div className="overflow-x-auto">

                <table className="w-full min-w-[900px] text-left">

                  <thead className="border-b border-slate-200 bg-slate-100">

                    <tr>

                      <th className="px-6 py-4 text-sm font-semibold text-slate-800">
                        College
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-slate-800">
                        Location
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-slate-800">
                        Fees
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-slate-800">
                        Rating
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-slate-800">
                        Avg. Placement
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-slate-800">
                        Highest Placement
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-slate-200">

                    {colleges.map((college) => (

                      <tr
                        key={college.id}
                        className="transition hover:bg-slate-50"
                      >

                        <td className="px-6 py-5">

                          <a
                            href={`/${college.id}`}
                            className="font-semibold text-slate-900 hover:text-blue-600 hover:underline"
                          >
                            {college.name}
                          </a>

                          <p className="mt-1 max-w-md text-sm text-slate-600">
                            {college.description}
                          </p>

                        </td>

                        <td className="px-6 py-5 text-slate-800">
                          📍 {college.location}
                        </td>

                        <td className="px-6 py-5 font-semibold text-slate-900">
                          {formatCurrency(college.fees)}
                        </td>

                        <td className="px-6 py-5">

                          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-800">
                            ⭐ {college.rating}
                          </span>

                        </td>

                        <td className="px-6 py-5 font-semibold text-green-700">
                          {formatCurrency(college.averagePlacement)}
                        </td>

                        <td className="px-6 py-5 font-semibold text-green-700">
                          {formatCurrency(college.highestPlacement)}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>
          )}

          {/* No results */}
          {!loading && colleges.length === 0 && !error && (
            <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">

              <div className="text-4xl">
                🔍
              </div>

              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                No colleges found
              </h3>

              <p className="mt-2 text-slate-600">
                Try changing your search or filters.
              </p>

            </div>
          )}

          {/* Pagination */}
          {!loading && colleges.length > 0 && (
            <div className="mt-6 flex items-center justify-between">

              <button
                disabled={page === 1}
                onClick={() => setPage((current) => current - 1)}
                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 font-medium text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Previous
              </button>

              <span className="text-sm text-slate-700">
                Page <strong>{page}</strong> of{" "}
                <strong>{totalPages}</strong>
              </span>

              <button
                disabled={page >= totalPages}
                onClick={() => setPage((current) => current + 1)}
                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 font-medium text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next →
              </button>

            </div>
          )}

        </section>

      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-8 text-center">

          <p className="font-semibold text-slate-900">
            🎓 CollegeFinder
          </p>

          <p className="mt-1 text-sm text-slate-600">
            College discovery and decision-making platform
          </p>

        </div>

      </footer>

    </main>
  );
}