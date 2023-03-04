import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';

interface FormSearchInputProps {
  placeholder?: string;
}

export function FormSearchInput(props: FormSearchInputProps) {
  const {
    register,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  return (
    <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
      <div className="grid place-items-center h-full w-12 text-gray-300">
        <MagnifyingGlassIcon className="h-5 w-5" />
      </div>

      <input
        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
        type="text"
        placeholder={props.placeholder}
      />
    </div>
  );
}

export default FormSearchInput;
