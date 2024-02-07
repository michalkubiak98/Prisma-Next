import { cache } from 'react';
import prisma from '@/src/lib/prisma';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import JobPage from '@/src/components/JobPage';

/*

To ensure efficient loading and enable static caching for dynamic pages in Next.js, it's crucial to 
predefine the dynamic paths Next.js should expect. This process involves fetching the slugs 
(or identifiers for dynamic content) from the database in advance and then informing Next.js about 
these slugs using the getStaticPaths function (or generateStaticParams in the App Router model). 
This method allows Next.js to pre-render these pages at build time, making the pages load faster 
since the HTML is already prepared and served from cache, enhancing the user experience and SEO.

Implementing generateStaticParams involves fetching the necessary slugs from your database and mapping 
them to a format that Next.js can understand. This process is essential for pages with dynamic routes, 
like detailed views of database entries, where the content changes based on the URL slug.

For pages not covered by the pre-fetched slugs, Next.js will render the page on the first request and cache 
it for subsequent visitors, ensuring that only the first visitor experiences a longer load time. 
This server-side rendering and caching mechanism significantly improves loading times and SEO, benefiting any content-driven website.

Here's a concise implementation guide:

Fetch Slugs from Database: Use Prisma or your ORM to fetch the slugs of all entries you wish to pre-render.
Implement generateStaticParams: Map the fetched slugs into the format { params: { slug } } for Next.js to pre-render these paths.
Recompile: Run npm run build to see the paths statically cached by Next.js.
Observe Improved Loading Times: Start your application and notice how pre-rendered pages load instantly due to static caching.
This strategy not only improves user experience through faster page loads but also optimizes your application for search engines.

*/
interface PageProps {
  params: {
    slug: string;
  };
}

interface JobWithSlug {
  slug: string;
}

export async function generateStaticParams() {
  const jobs: JobWithSlug[] = await prisma.job.findMany({
    where: { approved: true },
    select: { slug: true },
  });

  return jobs.map(({ slug }) => slug);
}

const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: { slug },
  });

  if (!job) notFound(); // 404 page

  return job;
});

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const job = await getJob(slug); // cant share data must call this again to get the metadata, hence the getJob func is cached

  return {
    title: job.title,
  };
}

export default async function Page({ params: { slug } }: PageProps) {
  const job = await getJob(slug);

  return (
    <main className="max-w-5xl m-auto my-10 flex flex-col md:flex-row ">
      <JobPage job={job} />
    </main>
  );
}
