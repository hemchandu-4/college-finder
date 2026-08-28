import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const colleges = [
  {
    name: "IIT Madras",
    location: "Chennai",
    description:
      "Indian Institute of Technology Madras is a premier engineering and research institute in India.",
    fees: 240000,
    rating: 4.8,
    averagePlacement: 2000000,
    highestPlacement: 4000000,

    courses: [
      {
        name: "B.Tech Computer Science",
        duration: "4 Years",
        degree: "B.Tech",
      },
      {
        name: "B.Tech Electrical Engineering",
        duration: "4 Years",
        degree: "B.Tech",
      },
      {
        name: "B.Tech Mechanical Engineering",
        duration: "4 Years",
        degree: "B.Tech",
      },
    ],

    reviews: [
      {
        studentName: "Rahul",
        rating: 5,
        comment: "Excellent academics and strong placements.",
      },
      {
        studentName: "Priya",
        rating: 4.5,
        comment: "Great faculty and research opportunities.",
      },
    ],

    cutoffs: [
      {
        exam: "JEE Main",
        year: 2026,
        branch: "Computer Science",
        closingRank: 1500,
      },
      {
        exam: "JEE Main",
        year: 2026,
        branch: "Electrical Engineering",
        closingRank: 4000,
      },
      {
        exam: "JEE Advanced",
        year: 2026,
        branch: "Computer Science",
        closingRank: 500,
      },
      {
        exam: "JEE Advanced",
        year: 2026,
        branch: "Electrical Engineering",
        closingRank: 2000,
      },
    ],
  },

  {
    name: "IIT Delhi",
    location: "New Delhi",
    description:
      "Indian Institute of Technology Delhi is a leading engineering and research institute.",
    fees: 250000,
    rating: 4.8,
    averagePlacement: 2200000,
    highestPlacement: 4500000,

    courses: [
      {
        name: "B.Tech Computer Science",
        duration: "4 Years",
        degree: "B.Tech",
      },
      {
        name: "B.Tech Electrical Engineering",
        duration: "4 Years",
        degree: "B.Tech",
      },
    ],

    reviews: [
      {
        studentName: "Arjun",
        rating: 5,
        comment: "Very strong academic environment.",
      },
      {
        studentName: "Sneha",
        rating: 4.5,
        comment: "Excellent placement opportunities.",
      },
    ],

    cutoffs: [
      {
        exam: "JEE Main",
        year: 2026,
        branch: "Computer Science",
        closingRank: 1200,
      },
      {
        exam: "JEE Main",
        year: 2026,
        branch: "Electrical Engineering",
        closingRank: 3500,
      },
      {
        exam: "JEE Advanced",
        year: 2026,
        branch: "Computer Science",
        closingRank: 600,
      },
      {
        exam: "JEE Advanced",
        year: 2026,
        branch: "Electrical Engineering",
        closingRank: 2200,
      },
    ],
  },

  {
    name: "IIT Bombay",
    location: "Mumbai",
    description:
      "IIT Bombay is one of India's leading institutes for engineering, technology and research.",
    fees: 245000,
    rating: 4.9,
    averagePlacement: 2300000,
    highestPlacement: 5000000,

    courses: [
      {
        name: "B.Tech Computer Science",
        duration: "4 Years",
        degree: "B.Tech",
      },
      {
        name: "B.Tech Mechanical Engineering",
        duration: "4 Years",
        degree: "B.Tech",
      },
    ],

    reviews: [
      {
        studentName: "Karthik",
        rating: 5,
        comment: "Outstanding campus and opportunities.",
      },
      {
        studentName: "Ananya",
        rating: 4.5,
        comment: "Very competitive but rewarding environment.",
      },
    ],

    cutoffs: [
      {
        exam: "JEE Main",
        year: 2026,
        branch: "Computer Science",
        closingRank: 1000,
      },
      {
        exam: "JEE Main",
        year: 2026,
        branch: "Mechanical Engineering",
        closingRank: 5000,
      },
      {
        exam: "JEE Advanced",
        year: 2026,
        branch: "Computer Science",
        closingRank: 300,
      },
      {
        exam: "JEE Advanced",
        year: 2026,
        branch: "Mechanical Engineering",
        closingRank: 2500,
      },
    ],
  },

  {
    name: "NIT Trichy",
    location: "Tiruchirappalli",
    description:
      "National Institute of Technology Tiruchirappalli is a leading public technical university.",
    fees: 210000,
    rating: 4.6,
    averagePlacement: 1400000,
    highestPlacement: 3000000,

    courses: [
      {
        name: "B.Tech Computer Science",
        duration: "4 Years",
        degree: "B.Tech",
      },
      {
        name: "B.Tech Electronics and Communication",
        duration: "4 Years",
        degree: "B.Tech",
      },
    ],

    reviews: [
      {
        studentName: "Vishal",
        rating: 5,
        comment: "Strong placements and good campus life.",
      },
      {
        studentName: "Meera",
        rating: 4,
        comment: "Good faculty and infrastructure.",
      },
    ],

    cutoffs: [
      {
        exam: "JEE Main",
        year: 2026,
        branch: "Computer Science",
        closingRank: 9000,
      },
      {
        exam: "JEE Main",
        year: 2026,
        branch: "Electronics and Communication",
        closingRank: 14000,
      },
    ],
  },

  {
    name: "NIT Warangal",
    location: "Warangal",
    description:
      "National Institute of Technology Warangal is a prominent engineering institute.",
    fees: 220000,
    rating: 4.5,
    averagePlacement: 1300000,
    highestPlacement: 2800000,

    courses: [
      {
        name: "B.Tech Computer Science",
        duration: "4 Years",
        degree: "B.Tech",
      },
      {
        name: "B.Tech Electrical Engineering",
        duration: "4 Years",
        degree: "B.Tech",
      },
    ],

    reviews: [
      {
        studentName: "Rohit",
        rating: 4.5,
        comment: "Good academics and placements.",
      },
      {
        studentName: "Divya",
        rating: 4,
        comment: "Nice campus and student community.",
      },
    ],

    cutoffs: [
      {
        exam: "JEE Main",
        year: 2026,
        branch: "Computer Science",
        closingRank: 12000,
      },
      {
        exam: "JEE Main",
        year: 2026,
        branch: "Electrical Engineering",
        closingRank: 18000,
      },
    ],
  },

  {
    name: "NIT Surathkal",
    location: "Mangalore",
    description:
      "National Institute of Technology Karnataka is a leading technical institution.",
    fees: 215000,
    rating: 4.6,
    averagePlacement: 1350000,
    highestPlacement: 2900000,

    courses: [
      {
        name: "B.Tech Computer Science",
        duration: "4 Years",
        degree: "B.Tech",
      },
      {
        name: "B.Tech Information Technology",
        duration: "4 Years",
        degree: "B.Tech",
      },
    ],

    reviews: [
      {
        studentName: "Aditya",
        rating: 5,
        comment: "Great location and strong academics.",
      },
      {
        studentName: "Neha",
        rating: 4,
        comment: "Good placement opportunities.",
      },
    ],

    cutoffs: [
      {
        exam: "JEE Main",
        year: 2026,
        branch: "Computer Science",
        closingRank: 10000,
      },
      {
        exam: "JEE Main",
        year: 2026,
        branch: "Information Technology",
        closingRank: 13000,
      },
    ],
  },

  {
    name: "IIIT Hyderabad",
    location: "Hyderabad",
    description:
      "International Institute of Information Technology Hyderabad focuses on computer science and technology.",
    fees: 350000,
    rating: 4.7,
    averagePlacement: 1800000,
    highestPlacement: 3500000,

    courses: [
      {
        name: "B.Tech Computer Science",
        duration: "4 Years",
        degree: "B.Tech",
      },
      {
        name: "B.Tech Electronics and Communication",
        duration: "4 Years",
        degree: "B.Tech",
      },
    ],

    reviews: [
      {
        studentName: "Varun",
        rating: 5,
        comment: "Excellent for computer science and research.",
      },
      {
        studentName: "Isha",
        rating: 4.5,
        comment: "Very strong technical environment.",
      },
    ],

    cutoffs: [
      {
        exam: "JEE Main",
        year: 2026,
        branch: "Computer Science",
        closingRank: 8000,
      },
    ],
  },

  {
    name: "BITS Pilani",
    location: "Pilani",
    description:
      "Birla Institute of Technology and Science Pilani is a leading private technical university.",
    fees: 620000,
    rating: 4.7,
    averagePlacement: 1800000,
    highestPlacement: 3500000,

    courses: [
      {
        name: "B.E. Computer Science",
        duration: "4 Years",
        degree: "B.E.",
      },
      {
        name: "B.E. Electronics",
        duration: "4 Years",
        degree: "B.E.",
      },
    ],

    reviews: [
      {
        studentName: "Sahil",
        rating: 5,
        comment: "Excellent academics and flexible curriculum.",
      },
      {
        studentName: "Pooja",
        rating: 4.5,
        comment: "Great opportunities and campus culture.",
      },
    ],

    cutoffs: [
      {
        exam: "BITSAT",
        year: 2026,
        branch: "Computer Science",
        closingRank: 3000,
      },
      {
        exam: "BITSAT",
        year: 2026,
        branch: "Electronics",
        closingRank: 6000,
      },
    ],
  },

  {
    name: "VIT Vellore",
    location: "Vellore",
    description:
      "Vellore Institute of Technology is a private engineering university with a large student community.",
    fees: 450000,
    rating: 4.3,
    averagePlacement: 900000,
    highestPlacement: 3000000,

    courses: [
      {
        name: "B.Tech Computer Science",
        duration: "4 Years",
        degree: "B.Tech",
      },
      {
        name: "B.Tech Electronics",
        duration: "4 Years",
        degree: "B.Tech",
      },
    ],

    reviews: [
      {
        studentName: "Akash",
        rating: 4,
        comment: "Large campus with many opportunities.",
      },
      {
        studentName: "Nikhil",
        rating: 4,
        comment: "Good number of companies visit for placements.",
      },
    ],

    cutoffs: [
      {
        exam: "VITEEE",
        year: 2026,
        branch: "Computer Science",
        closingRank: 15000,
      },
      {
        exam: "VITEEE",
        year: 2026,
        branch: "Electronics",
        closingRank: 25000,
      },
    ],
  },
];

async function main() {
  console.log("🌱 Starting database seed...");

  /*
   * Delete dependent records first.
   */
  await prisma.cutoff.deleteMany();
  await prisma.review.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();

  /*
   * Create colleges with courses, reviews and cutoffs.
   */
  for (const college of colleges) {
    await prisma.college.create({
      data: {
        name: college.name,
        location: college.location,
        description: college.description,
        fees: college.fees,
        rating: college.rating,
        averagePlacement: college.averagePlacement,
        highestPlacement: college.highestPlacement,

        courses: {
          create: college.courses,
        },

        reviews: {
          create: college.reviews,
        },

        cutoffs: {
          create: college.cutoffs,
        },
      },
    });
  }

  console.log(`✅ Added ${colleges.length} colleges`);
  console.log("✅ Added courses and reviews");
  console.log("✅ Added cutoff data");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });