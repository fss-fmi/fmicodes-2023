import { ReactNode } from 'react';

export interface FancyButtonProps {
  onClick?: () => void;
  isPrimary?: boolean;
  disabled?: boolean;
  children: ReactNode;
}

export function FancyButton(props: FancyButtonProps) {
  return (
    <button
      type="submit"
      onClick={props.onClick}
      disabled={props.disabled}
      className={
        (props.isPrimary
          ? 'bg-red-600  border-transparent active:bg-red-600 focus:outline-none focus:shadow-outline-red'
          : 'border-red-600 active:bg-red-600 hover:bg-opacity-50') +
        ' border hover:bg-red-700 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 rounded-lg'
      }
    >
      {props.children}
    </button>
  );
}

export default FancyButton;
