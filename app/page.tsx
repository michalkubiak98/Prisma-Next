import JobFilterSidebar from '@/components/JobFilterSidebar';
import JobListItem from '@/components/JobListItem';
import prisma from '@/lib/prisma';
import { Key } from 'react';

export default async function Home() {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="flex flex-col items-center space-y-10 m-auto mt-10 max-w-7xl w-full px-4">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight">
          Developer Jobs
        </h1>
      </div>
      <section className="flex flex-col md:flex-row gap-4 justify-center items-start w-full">
        <JobFilterSidebar />
        <div className="flex flex-col gap-4 max-w-3xl w-full">
          {jobs.map((job: { id: Key | null | undefined }) => (
            <JobListItem job={job} key={job.id} />
          ))}
        </div>
      </section>
    </main>
  );
}
