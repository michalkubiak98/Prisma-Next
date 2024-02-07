import { Job } from '@prisma/client';
import Link from 'next/link';
import { FiBriefcase } from 'react-icons/fi';

interface JobPageProps {
  job: Job;
}

export default function JobPage({
  job: {
    title,
    description,
    companyName,
    applicationUrl,
    type,
    locationType,
    location,
    salary,
    createdAt,
  },
}: JobPageProps) {
  return (
    <section className="w-full grow space-y-5">
      <div className="flex items-center ">
        <div>
          <div>
            <h1>{title}</h1>
            <p className="font-semibold">
              {applicationUrl ? (
                <Link
                  href={new URL(applicationUrl).origin}
                  className="text-blue-500 hover:underline"
                >
                  {companyName}
                </Link>
              ) : (
                <span>{companyName}</span>
              )}
            </p>
          </div>
          <div className="text-muted-foreground space-y-2 mt-10">
            <p className="flex items-center gap-1.5">
              <FiBriefcase size={16} className="shrink-0" />
              {type}
            </p>
            <p className="flex items-center gap-1.5">
              <FiBriefcase size={16} className="shrink-0" />
              {locationType}
            </p>
            <p className="flex items-center gap-1.5">
              <FiBriefcase size={16} className="shrink-0" />
              {location || 'Worldwide'}
            </p>
            <p className="flex items-center gap-1.5">
              <FiBriefcase size={16} className="shrink-0" />
              {salary}
            </p>
          </div>
          <div className="text-muted-foreground space-y-2 mt-10">
            {description}
          </div>
        </div>
      </div>
      <div></div>
    </section>
  );
}
