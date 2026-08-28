import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const exam = String(body.exam || "").trim();
    const rank = Number(body.rank);

    if (!exam) {
      return NextResponse.json(
        {
          error: "Exam is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!Number.isInteger(rank) || rank <= 0) {
      return NextResponse.json(
        {
          error: "Rank must be a positive integer",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Find colleges whose cutoff allows the student's rank.
     *
     * Example:
     * Student rank = 1500
     * IIT Bombay cutoff = 5000
     *
     * 1500 <= 5000
     * Therefore IIT Bombay is recommended.
     */
    const cutoffs = await prisma.cutoff.findMany({
      where: {
        exam,
        year: 2026,
        closingRank: {
          gte: rank,
        },
      },
      include: {
        college: {
          include: {
            courses: true,
            reviews: true,
          },
        },
      },
      orderBy: {
        closingRank: "asc",
      },
    });

    /*
     * A college can have multiple branches.
     * Return each college only once.
     */
    const collegeMap = new Map<number, (typeof cutoffs)[number]["college"]>();

    for (const cutoff of cutoffs) {
      if (!collegeMap.has(cutoff.collegeId)) {
        collegeMap.set(cutoff.collegeId, cutoff.college);
      }
    }

    const colleges = Array.from(collegeMap.values());

    /*
     * Sort recommendations:
     * 1. Better rating first
     * 2. Higher average placement next
     */
    colleges.sort((a, b) => {
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }

      return b.averagePlacement - a.averagePlacement;
    });

    return NextResponse.json({
      data: colleges,
      count: colleges.length,
      exam,
      rank,
    });
  } catch (error) {
    console.error("Failed to predict colleges:", error);

    return NextResponse.json(
      {
        error: "Failed to predict colleges",
      },
      {
        status: 500,
      }
    );
  }
}