import Link from 'next/link';
import { Button } from './ui/button';

export default function Navbar() {
  return (
    <header className="shadow-sm">
      <nav className="max-w-5xl m-auto py-5 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 text-2xl font-extrabold"
        >
          DevJobs
        </Link>

        <Button asChild>
          <Link href="/jobs/new">Create New Job</Link>
        </Button>
      </nav>
    </header>
  );
}
