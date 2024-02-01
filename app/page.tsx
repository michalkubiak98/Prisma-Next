import prisma from '@/lib/prisma';

export default async function Home() {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>hello</h1>
      {JSON.stringify(jobs)}
    </main>
  );
}
