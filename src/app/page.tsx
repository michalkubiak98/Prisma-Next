import JobFilterSidebar from '@/src/components/JobFilterSidebar';
import JobListItem from '@/src/components/JobListItem';
import prisma from '@/src/lib/prisma';
import { Key } from 'react';
import H1 from '../components/ui/h1';

export default async function Home() {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="flex flex-col items-center space-y-10 m-auto mt-10 max-w-7xl w-full px-4">
      <div>
        <H1>Developer Jobs</H1>
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
