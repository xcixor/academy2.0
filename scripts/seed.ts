const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function createCategories() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Music" },
        { name: "Fitness" },
        { name: "Photography" },
        { name: "Accounting" },
        { name: "Engineering" },
        { name: "Filming" },
      ],
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

async function createPlans() {
  try {
    await database.plan.createMany({
      data: [{ name: "Free" }, { name: "Basic" }, { name: "Premium" }],
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database plans", error);
  } finally {
    await database.$disconnect();
  }
}

async function clearDB() {
  try {
    await database.comment.deleteMany({});

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database plans", error);
  } finally {
    await database.$disconnect();
  }
}

async function main() {
  // createCategories();
  // createPlans();
  clearDB();
}

main();
