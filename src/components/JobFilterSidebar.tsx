import { jobTypes } from '@/src/lib/job-types';
import { Input } from './ui/input';
import { Label } from './ui/label';
import Select from './ui/select';
import prisma from '@/src/lib/prisma';
import { Button } from './ui/button';
import { jobFilterSchema } from '@/src/lib/validation';
import { redirect } from 'next/navigation';

async function filterJobs(formData: FormData) {
  'use server';

  // console log the search value on submit
  // console.log(formData.get("q") as string)

  const values = Object.fromEntries(formData.entries());

  const { q, type, location, remote } = jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    // syntax below passes the q trimmed if q exists etc etc.....
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: 'true' }),
  });

  // puts the '?q=dell&location=somewhere...' into the search bar for SEO and for filtering data
  redirect(`/?${searchParams.toString()}`);
}

export default async function JobFilterSidebar() {
  interface JobLocation {
    location: string;
  }

  const locationsResult = await prisma.job.findMany({
    where: { approved: true },
    select: { location: true },
    distinct: ['location'],
  });

  // Explicitly type the parameter in the map function
  const distinctLocations: string[] = locationsResult
    .map(({ location }: JobLocation) => location)
    .filter(Boolean) as string[];

  return (
    <aside className="w-full md:w-[260px] sticky top-0 border border-gray-200 p-4">
      {/* We are utilizing the forms actions to pass in server actions, which will 
          automatically turn into a post endpoint. filterJobs sends a request to the server without javascript,
          so the search or filter for example will work even when the user has slow internet (like a plane) or disabled js
     */}

      <form action={filterJobs}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input id="q" name="q" placeholder="Search..." />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Job Type</Label>
            <Select id="type" name="type" defaultValue="">
              <option value="">All Jobs</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select id="location" name="location" defaultValue="">
              <option value="">All Locations</option>
              {distinctLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="scale-125 accent-black ml-1"
            />
            <Label htmlFor="location">Remote Jobs</Label>
          </div>
          {/* When the submit button is clicked it triggers our server action 'filterJobs' */}
          <Button type="submit" className="w-full">
            Filter Jobs
          </Button>
        </div>
      </form>
    </aside>
  );
}
