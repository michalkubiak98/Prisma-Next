'use client';

import H1 from '../components/ui/h1';

// this page will show if the page.tsx will ever throw an error.
export default function Error(error: string) {
  return (
    <main className="m-auto my-10 max-w-5xl space-y-5 px-3 text-center">
      <H1>Error: </H1>
    </main>
  );
}

// can maybe pass in the error here at a later stage to be displayed.
