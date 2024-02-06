'use client';

import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import LoadingButton from './LoadingButton';

export default function FormSubmitButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  // uses the form status of the parent component, keeping parent as a server component
  const { pending } = useFormStatus();

  return (
   <LoadingButton {...props} type='submit' loading={pending}/>
  );
}
