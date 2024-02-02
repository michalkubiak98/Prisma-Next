'use client';

import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function FormSubmitButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  // uses the form status of the parent component, keeping parent as a server component
  const { pending } = useFormStatus();

  return (
    <Button {...props} type="submit" disabled={props.disabled || pending}>
      <span className="flex items-center justify-center gap-1">
        {pending && (
          <AiOutlineLoading3Quarters size={16} className="animate-spin" />
        )}
        {props.children}
      </span>
    </Button>
  );
}
