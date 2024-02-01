// import the job schema item
import { Job } from '@prisma/client';
import { FiMapPin, FiClock, FiDollarSign, FiBriefcase } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';

interface JobListItemProps {
  job: Job;
}

export default function JobListItem({
  job: {
    title,
    companyName,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
    createdAt,
    description,
  },
}: JobListItemProps) {
  return (
    <article className="flex flex-col gap-4 border rounded-lg p-5 m-5 hover:bg-slate-50 transition duration-150 ease-in-out">
      <div className="flex items-start justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <time className="flex items-center text-sm text-gray-500">
          <FiClock className="mr-1" />
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </time>
      </div>
      {companyLogoUrl && (
        <div className="flex items-center gap-2">
          <img
            src={companyLogoUrl}
            alt={`${companyName} Logo`}
            className="w-10 h-10 object-cover rounded-full"
          />
          <span className="text-lg font-medium">{companyName}</span>
        </div>
      )}
      <div className="text-gray-700">
        <p className="flex items-center">
          <FiBriefcase className="mr-2" />
          {type}
        </p>
        <p className="flex items-center">
          <FiMapPin className="mr-2" />
          {location ? location : locationType}
        </p>
        <p className="flex items-center">
          <FiDollarSign className="mr-2" />
          {`$${salary.toLocaleString()}`}
        </p>
      </div>
      {description && <p className="mt-2 text-gray-600">{description}</p>}
    </article>
  );
}
