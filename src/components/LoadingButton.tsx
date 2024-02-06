import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Button } from './ui/button';

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
}

export default function LoadingButton({
  children,
  loading,
  ...props
}: LoadingButtonProps) {
  return (
    <Button {...props} disabled={props.disabled || loading}>
      <span className="flex items-center justify-center gap-1">
        {loading && (
          <AiOutlineLoading3Quarters size={16} className="animate-spin" />
        )}
        {children}
      </span>
    </Button>
  );
}
