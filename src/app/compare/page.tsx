"use client";

import { useEffect, useState } from "react";

type College = {
  id: number;
  name: string;
  location: string;
  fees: number;
  rating: number;
  averagePlacement: number;
  highestPlacement: number;
};

export default function ComparePage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchColleges() {
      try {
        const response = await fetch("/api/colleges?limit=20");
        const result = await response.json();

        setColleges(result.data || []);
      } catch (error) {
        console.error("Failed to fetch colleges:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchColleges();
  }, []);

  function toggleCollege(id: number) {
    setSelectedIds((current) => {
      if (current.includes(id)) {
        return current.filter((collegeId) => collegeId !== id);
      }

      if (current.length >= 3) {
        alert("You can compare maximum 3 colleges.");
        return current;
      }

      return [...current, id];
    });
  }

  const selectedColleges = colleges.filter((college) =>
    selectedIds.includes(college.id)
  );

  function formatMoney(value: number) {
    return `₹${value.toLocaleString("en-IN")}`;
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-lg text-slate-600">Loading colleges...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <a
          href="/"
          className="text-blue-600 hover:underline"
        >
          ← Back to Colleges
        </a>

        <h1 className="mt-6 text-4xl font-bold text-slate-900">
          Compare Colleges
        </h1>

        <p className="mt-2 text-slate-600">
          Select 2 or 3 colleges to compare their fees, ratings and placement
          information.
        </p>

        {/* College selection */}
        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Select Colleges
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {colleges.map((college) => (
              <label
                key={college.id}
                className={`cursor-pointer rounded-xl border p-4 transition ${
                  selectedIds.includes(college.id)
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-200 hover:border-blue-400"
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(college.id)}
                    onChange={() => toggleCollege(college.id)}
                    className="mt-1 h-5 w-5"
                  />

                  <div>
                    <p className="font-semibold text-slate-900">
                      {college.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      📍 {college.location}
                    </p>
                  </div>
                </div>
              </label>
            ))}
          </div>

          <p className="mt-5 text-sm text-slate-600">
            Selected: <strong>{selectedIds.length}</strong> / 3
          </p>
        </section>

        {/* Comparison */}
        {selectedColleges.length >= 2 && (
          <section className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-slate-900">
                Comparison
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border-b p-5 text-left text-slate-700">
                      Feature
                    </th>

                    {selectedColleges.map((college) => (
                      <th
                        key={college.id}
                        className="border-b p-5 text-left text-slate-900"
                      >
                        {college.name}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="border-b p-5 font-semibold">
                      Location
                    </td>

                    {selectedColleges.map((college) => (
                      <td key={college.id} className="border-b p-5">
                        📍 {college.location}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="border-b p-5 font-semibold">
                      Annual Fees
                    </td>

                    {selectedColleges.map((college) => (
                      <td key={college.id} className="border-b p-5">
                        {formatMoney(college.fees)}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="border-b p-5 font-semibold">
                      Rating
                    </td>

                    {selectedColleges.map((college) => (
                      <td key={college.id} className="border-b p-5">
                        ⭐ {college.rating}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="border-b p-5 font-semibold">
                      Average Placement
                    </td>

                    {selectedColleges.map((college) => (
                      <td key={college.id} className="border-b p-5 font-semibold text-green-600">
                        {formatMoney(college.averagePlacement)}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-5 font-semibold">
                      Highest Placement
                    </td>

                    {selectedColleges.map((college) => (
                      <td key={college.id} className="p-5 font-semibold text-green-600">
                        {formatMoney(college.highestPlacement)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {selectedColleges.length < 2 && (
          <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="text-lg text-slate-600">
              Select at least 2 colleges to start comparing.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}