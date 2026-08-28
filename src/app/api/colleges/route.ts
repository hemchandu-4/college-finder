import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const location = searchParams.get("location") || "";

    const minRatingParam = searchParams.get("minRating");
    const maxFeesParam = searchParams.get("maxFees");

    const minRating =
      minRatingParam !== null && minRatingParam !== ""
        ? Number(minRatingParam)
        : undefined;

    const maxFees =
      maxFeesParam !== null && maxFeesParam !== ""
        ? Number(maxFeesParam)
        : undefined;

    const page = Math.max(
      Number(searchParams.get("page")) || 1,
      1
    );

    const limit = Math.min(
      Math.max(
        Number(searchParams.get("limit")) || 5,
        1
      ),
      50
    );

    const where = {
      ...(search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
              {
                location: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
            ],
          }
        : {}),

      ...(location
        ? {
            location: {
              contains: location,
              mode: "insensitive" as const,
            },
          }
        : {}),

      ...(minRating !== undefined && !Number.isNaN(minRating)
        ? {
            rating: {
              gte: minRating,
            },
          }
        : {}),

      ...(maxFees !== undefined && !Number.isNaN(maxFees)
        ? {
            fees: {
              lte: maxFees,
            },
          }
        : {}),
    };

    const skip = (page - 1) * limit;

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        orderBy: {
          name: "asc",
        },
        skip,
        take: limit,

        include: {
          courses: true,
          reviews: true,
        },
      }),

      prisma.college.count({
        where,
      }),
    ]);

    return NextResponse.json({
      data: colleges,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Failed to fetch colleges:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch colleges",
      },
      {
        status: 500,
      }
    );
  }
}