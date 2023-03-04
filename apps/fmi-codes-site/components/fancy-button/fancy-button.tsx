import { ReactNode } from 'react';

export interface FancyButtonProps {
  onClick?: () => void;
  isPrimary?: boolean;
  children: ReactNode;
}

export function FancyButton(props: FancyButtonProps) {
  return (
    <button
      type="submit"
      onClick={props.onClick}
      className={
        (props.isPrimary
          ? 'bg-blue-600  border-transparent active:bg-blue-600 focus:outline-none focus:shadow-outline-blue'
          : 'border-blue-600 active:bg-blue-600 hover:bg-opacity-50') +
        ' border hover:bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 rounded-lg'
      }
    >
      {props.children}
    </button>
  );
}

export default FancyButton;
