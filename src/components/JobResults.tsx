import JobListItem from '@/src/components/JobListItem';
import prisma from '@/src/lib/prisma';
import { Key } from 'react';
import { JobFilterValues } from '../lib/validation';
import { Prisma } from '@prisma/client';
import { Label } from '@/src/components/ui/label';

interface JobResultsProps {
  filterValues: JobFilterValues;
}

export default async function JobResults({
  filterValues: { q, type, location, remote },
}: JobResultsProps) {
  // create a full text search string for prisma, this will search for all words independently from the search bar
  const searchString = q
    ?.split(' ')
    .filter((word) => word.length > 0)
    .join(' & ');

  // if search string is defined, otherwise empty
  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        // OR shows results that match ANY word not all words
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { type: { search: searchString } },
          { locationType: { search: searchString } },
          { location: { search: searchString } },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    // when we select a location then it must match, hence AND
    AND: [
      searchFilter,
      type ? { type } : {}, // if type is defined put it here otherwise empty
      location ? { location } : {},
      remote ? { locationType: 'Remote' } : {}, // if not checked return remote and onsite jobs
      { approved: true },
    ],
  };

  // prisma find all jobs filtered by all filtered values from sidebar
  const jobs = await prisma.job.findMany({
    where, // we can use the short syntax here and just pass in the where from above
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="flex flex-col gap-4 max-w-3xl w-full">
      {jobs.map((job: { id: Key | null | undefined }) => (
        <JobListItem job={job} key={job.id} />
      ))}
      {jobs.length === 0 && (
        <p className="text-center m-auto mt-40">
          No jobs found, try adjusting your search filters.
        </p>
      )}
    </div>
  );
}
