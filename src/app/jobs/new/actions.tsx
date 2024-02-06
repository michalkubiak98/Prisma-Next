'use server';

import { toSlug } from '@/src/lib/utils';
import { createJobSchema } from '@/src/lib/validation';
import { nanoid } from 'nanoid';
import { redirect } from 'next/navigation';
import prisma from '@/src/lib/prisma';

export async function createJobPosting(FormData: FormData) {
  const values = Object.fromEntries(FormData.entries());

  const {
    title,
    type,
    companyName,
    // companyLogo,
    locationType,
    location,
    description,
    applicationEmail,
    applicationUrl,
    salary,
  } = createJobSchema.parse(values);

  const slug = `${toSlug(title)}-${nanoid(10)}`;

  // blob (s3 like service from Vercel for storing image and getting image url)
  /*

  const companyLogo Url: string | undefined = undefined;
  if (companyLogo){
    const blob = await put(
      `company_logos/${slug}${path.extname(companyLogo.name)}`,
      companyLogo,
      {
        access: "public",
        addRandomSuffix: 'false'
      }
    )
    companyLogoUrl - blob.url
  }
  */

  console.log({
    slug,
    title: title.trim(),
    type,
    companyName: companyName.trim(),
    locationType,
    location,
    applicationEmail: applicationEmail?.trim(),
    applicationUrl: applicationUrl?.trim(),
    description: description?.trim(),
    salary: parseInt(salary),
    approved: true,
  });
  

  await prisma?.job.create({
    data: {
      slug,
      title: title.trim(),
      type,
      companyName: companyName.trim(),
      //companyLogoUrl
      locationType,
      location,
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl?.trim(),
      description: description?.trim(),
      salary: parseInt(salary),
      approved: true, // automatically approve job, otherwise we can have an admin login that will approve jobs (update db function)
    },
  });

  redirect('/job-submitted');
}
