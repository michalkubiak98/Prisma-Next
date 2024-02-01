// this seed puts the placeholder data into our db. Must add seed script to scripts in package json. Then run npm run seed.
// Then run npx prisma studio to open the interface to see your db

const { placeholderJobs } = require('./placeholder-data');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    placeholderJobs.map(async (job) => {
      await prisma.job.upsert({
        where: {
          slug: job.slug,
        },
        update: job,
        create: job,
      });
    })
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error while seeding database:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
