import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // töm gamla friend-requests för ren testmiljö
  await prisma.friendRequest.deleteMany();

  // skapa/hämta Anna
  const anna = await prisma.user.upsert({
    where: { email: "anna@example.com" },
    update: {},
    create: {
      email: "anna@example.com",
      name: "Anna Test",
      password: "hash" // kan vara plaintext eller bcrypt-hash, spelar ingen roll för test
    }
  });

  // skapa/hämta Bert
  const bert = await prisma.user.upsert({
    where: { email: "bert@example.com" },
    update: {},
    create: {
      email: "bert@example.com",
      name: "Bert Test",
      password: "hash"
    }
  });

  console.log("✅ Seed klart!");
  console.log("Anna id:", anna.id);
  console.log("Bert id:", bert.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
