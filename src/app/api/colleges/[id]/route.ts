import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const collegeId = Number(id);

    if (!Number.isInteger(collegeId) || collegeId <= 0) {
      return NextResponse.json(
        { error: "Invalid college ID" },
        { status: 400 }
      );
    }

    const college = await prisma.college.findUnique({
      where: {
        id: collegeId,
      },
      include: {
        courses: {
          orderBy: {
            name: "asc",
          },
        },
        reviews: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!college) {
      return NextResponse.json(
        { error: "College not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: college,
    });
  } catch (error) {
    console.error("Failed to fetch college:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch college",
      },
      {
        status: 500,
      }
    );
  }
}