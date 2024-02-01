// not from shadcn/ui, custom built from scratch to work without JS in the browser

import { cn } from '@/src/lib/utils';
import { forwardRef } from 'react';
import { FiChevronDown } from 'react-icons/fi';

// Select component will now take the same props as the normal html component,
// we can now pass classNames into this custom component and reuse it.

// We will also add a forward ref to use these inside a custom form to access the select values
// adding thew forwardRef adds the ref in addition to the props

export default forwardRef<
  HTMLSelectElement,
  React.HTMLProps<HTMLSelectElement>
>(function Select({ className, ...props }, ref) {
  return (
    <div className="relative">
      <select
        // cn() intelligently overrides tailwind classes when passed in as props
        className={cn(
          'h-10 border w-full rounded-md appearance-none truncate bg-white border-input py-2 pl-3 pr-8 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
      <FiChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50 text-zinc-600" />
    </div>
  );
});
