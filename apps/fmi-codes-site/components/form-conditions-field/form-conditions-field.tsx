import Link from 'next/link';

export function FormConditionsField() {
  return (
    <>
      <input
        type="checkbox"
        id="termsOfService"
        required
        className="w-4 h-4 text-white"
      />
      <label htmlFor="termsOfService" className="ml-2 block text-md">
        Съгласен съм с{' '}
        <Link href="/regulation" target="_blank" className="underline">
          регламента на хакатона
        </Link>
      </label>
    </>
  );
}

export default FormConditionsField;
