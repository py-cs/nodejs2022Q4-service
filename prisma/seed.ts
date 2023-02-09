import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  try {
    await prisma.favorites.create({ data: {} });
  } catch {}
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
