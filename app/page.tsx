import JobListItem from '@/components/JobListItem';
import prisma from '@/lib/prisma';
import { Key } from 'react';

export default async function Home() {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>hello</h1>
      {jobs.map((job: { id: Key | null | undefined }) => (
        <JobListItem job={job} key={job.id} />
      ))}
    </main>
  );
}
