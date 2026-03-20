import "dotenv/config";
import prisma from "../src/client.js";

async function testDatabase() {
  console.log("Testing Prisma Postgres connection...\n");

  try {
    const health = await prisma.$queryRaw`SELECT 1`;
    console.log("Connected to database:", health);

    const username = `demo_${Date.now()}`;

    console.log("\nCreating a test user...");
    const newUser = await prisma.user.create({
      data: {
        username,
        password: "demo-password",
      },
    });
    console.log("Created user:", newUser);

    console.log("\nFetching all users...");
    const allUsers = await prisma.user.findMany();
    console.log(`Found ${allUsers.length} user(s).`);

    console.log("\nAll tests passed. Database access is working.\n");
  } catch (error) {
    console.error("Database test failed:", error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

void testDatabase();
