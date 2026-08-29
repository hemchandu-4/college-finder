import Link from "next/link";

type Course = {
  id: number;
  name: string;
  duration: string;
  degree: string;
};

type Review = {
  id: number;
  studentName: string;
  rating: number;
  comment: string;
};

type College = {
  id: number;
  name: string;
  location: string;
  description: string;
  fees: number;
  rating: number;
  averagePlacement: number;
  highestPlacement: number;
  courses: Course[];
  reviews: Review[];
};

async function getCollege(id: string): Promise<College | null> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const response = await fetch(
      `${baseUrl}/api/colleges/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    const result = await response.json();

    return result.data || null;
  } catch (error) {
    console.error("Failed to fetch college:", error);
    return null;
  }
}

function formatMoney(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export default async function CollegeDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const college = await getCollege(id);

  /*
   * College not found
   */
  if (!college) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-slate-50 px-6">
        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            College not found
          </h1>

          <p className="mt-3 text-slate-600">
            The college you are looking for does not exist.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            ← Back to Colleges
          </Link>
        </div>
      </main>
    );
  }

  const courses = college.courses ?? [];
  const reviews = college.reviews ?? [];

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-slate-50">
      {/* ================= HEADER ================= */}

      <header className="w-full border-b border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6">
          <Link
            href="/"
            className="font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
          >
            ← Back to Colleges
          </Link>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}

      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">

        {/* ================= COLLEGE HEADER ================= */}

        <section className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

            <div className="min-w-0">
              <h1 className="break-words text-3xl font-bold text-slate-900 sm:text-4xl">
                {college.name}
              </h1>

              <p className="mt-3 break-words text-lg text-slate-600">
                📍 {college.location}
              </p>
            </div>

            <div className="w-fit shrink-0 rounded-full bg-yellow-100 px-5 py-2 text-lg font-semibold text-yellow-700">
              ⭐ {college.rating}
            </div>
          </div>
        </section>

        {/* ================= OVERVIEW ================= */}

        <section className="mt-6 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Overview
          </h2>

          <p className="mt-4 break-words leading-7 text-slate-600">
            {college.description}
          </p>
        </section>

        {/* ================= STATISTICS ================= */}

        <section className="mt-6 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Annual Fees */}

          <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Annual Fees
            </p>

            <p className="mt-2 break-words text-2xl font-bold text-slate-900">
              {formatMoney(college.fees)}
            </p>
          </div>

          {/* Rating */}

          <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Rating
            </p>

            <p className="mt-2 text-2xl font-bold text-yellow-600">
              ⭐ {college.rating}
            </p>
          </div>

          {/* Average Placement */}

          <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Average Placement
            </p>

            <p className="mt-2 break-words text-2xl font-bold text-green-600">
              {formatMoney(college.averagePlacement)}
            </p>
          </div>

          {/* Highest Placement */}

          <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Highest Placement
            </p>

            <p className="mt-2 break-words text-2xl font-bold text-green-600">
              {formatMoney(college.highestPlacement)}
            </p>
          </div>
        </section>

        {/* ================= PLACEMENTS ================= */}

        <section className="mt-6 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Placements
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Average */}

            <div className="rounded-xl bg-green-50 p-6">
              <p className="text-sm font-medium text-slate-600">
                Average Placement
              </p>

              <p className="mt-2 break-words text-3xl font-bold text-green-700">
                {formatMoney(college.averagePlacement)}
              </p>
            </div>

            {/* Highest */}

            <div className="rounded-xl bg-blue-50 p-6">
              <p className="text-sm font-medium text-slate-600">
                Highest Placement
              </p>

              <p className="mt-2 break-words text-3xl font-bold text-blue-700">
                {formatMoney(college.highestPlacement)}
              </p>
            </div>
          </div>
        </section>

        {/* ================= COURSES ================= */}

        <section className="mt-6 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div className="min-w-0">
              <h2 className="text-2xl font-bold text-slate-900">
                Courses Offered
              </h2>

              <p className="mt-1 break-words text-slate-600">
                Courses offered by {college.name}
              </p>
            </div>

            <span className="w-fit shrink-0 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              {courses.length} {courses.length === 1 ? "Course" : "Courses"}
            </span>
          </div>

          {courses.length === 0 ? (
            <div className="mt-6 rounded-xl bg-slate-50 p-6 text-center">
              <p className="text-slate-600">
                No course information available.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">

              {courses.map((course) => (
                <div
                  key={course.id}
                  className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-5"
                >
                  <h3 className="break-words text-lg font-bold text-slate-900">
                    {course.name}
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-3">

                    <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-700">
                      🎓 {course.degree}
                    </span>

                    <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-700">
                      ⏱ {course.duration}
                    </span>

                  </div>
                </div>
              ))}

            </div>
          )}
        </section>

        {/* ================= REVIEWS ================= */}

        <section className="mt-6 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div className="min-w-0">
              <h2 className="text-2xl font-bold text-slate-900">
                Student Reviews
              </h2>

              <p className="mt-1 text-slate-600">
                Reviews from students
              </p>
            </div>

            <span className="w-fit shrink-0 rounded-full bg-yellow-50 px-4 py-2 text-sm font-semibold text-yellow-700">
              {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
            </span>
          </div>

          {reviews.length === 0 ? (
            <div className="mt-6 rounded-xl bg-slate-50 p-6 text-center">
              <p className="text-slate-600">
                No reviews available.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">

              {reviews.map((review) => (
                <article
                  key={review.id}
                  className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6"
                >

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <div className="min-w-0">
                      <h3 className="break-words font-bold text-slate-900">
                        {review.studentName}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Student Review
                      </p>
                    </div>

                    <span className="w-fit shrink-0 rounded-full bg-yellow-100 px-3 py-1 font-semibold text-yellow-700">
                      ⭐ {review.rating}
                    </span>

                  </div>

                  <p className="mt-4 break-words leading-7 text-slate-600">
                    "{review.comment}"
                  </p>

                </article>
              ))}

            </div>
          )}
        </section>

        {/* ================= BACK BUTTON ================= */}

        <div className="mt-8 pb-10">
          <Link
            href="/"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            ← Back to Colleges
          </Link>
        </div>

      </div>
    </main>
  );
}