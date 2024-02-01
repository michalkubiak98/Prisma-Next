import JobFilterSidebar from '@/src/components/JobFilterSidebar';
import JobResults from '../components/JobResults';
import H1 from '../components/ui/h1';
import { JobFilterValues } from '../lib/validation';

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string; // turn it into a boolean later on parse
  };
}

export default async function Home({
  searchParams: { q, type, location, remote },
}: PageProps) {
  // filtered values from the search params that we set using the filtered sidebar
  // are passed as optional parameters into the JobResults
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === 'true',
  };

  return (
    <main className="flex flex-col items-center space-y-10 m-auto mt-10 max-w-7xl w-full px-4">
      <div>
        <H1>Developer Jobs</H1>
      </div>
      <section className="flex flex-col md:flex-row gap-4 justify-center items-start w-full">
        <JobFilterSidebar defaultValues={filterValues}/>
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  );
}
