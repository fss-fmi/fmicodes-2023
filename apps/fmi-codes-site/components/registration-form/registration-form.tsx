'use client';

import { useForm } from 'react-hook-form';
import FormImageField from '../form-image-field/form-image-field';
import FormDropdownField from '../form-dropdown-field/form-dropdown-field';
import FormTextField from '../form-text-field/form-text-field';
import FancyButton from '../fancy-button/fancy-button';
import { useRouter } from 'next/navigation';
import FormTechnologiesField from '../form-technologies-field/form-technologies-field';
import { Technology } from '@prisma/client';
import { useState } from 'react';
import FormConditionsField from '../form-conditions-field/form-conditions-field';
import CircularLoadingIndicator from '../circular-loading-indicator/circular-loading-indicator';

interface RegistrationFormProps {
  technologies: Technology[];
}

export function RegistrationForm(props: RegistrationFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const formFields = [
    {
      name: 'name',
      type: 'text',
      label: 'Име',
      required: true,
      placeholder: 'Георги Георгиев',
      spanRow: true,
      formOptions: {
        minLength: 2,
        maxLength: 60,
        pattern: /^[а-яА-Я- ]+$/,
      },
    },
    {
      name: 'phone',
      type: 'phone',
      label: 'Телефон',
      required: true,
      placeholder: '0888888888',
      spanRow: false,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Имейл адрес',
      required: true,
      placeholder: 'name@email.com',
      spanRow: false,
    },
    {
      name: 'password',
      type: 'password',
      label: 'Парола',
      required: true,
      spanRow: true,
      placeholder: '••••••••',
      formOptions: {
        minLength: 8,
        maxLength: 120,
      },
    },
    {
      name: 'university',
      type: 'dropdown',
      label: 'Университет',
      required: true,
      spanRow: false,
      options: universities,
    },
    {
      name: 'universityDegree',
      type: 'dropdown',
      label: 'Степен',
      required: true,
      spanRow: false,
      options: ['Бакалавър', 'Магистър'],
    },
    {
      name: 'universityMajor',
      type: 'text',
      label: 'Специалност',
      required: true,
      placeholder: 'Компютърни науки',
      spanRow: false,
      formOptions: {
        minLength: 2,
        maxLength: 120,
        pattern: /^[а-яА-Я- ]+$/,
      },
    },
    {
      name: 'universityYear',
      type: 'dropdown',
      label: 'Курс',
      required: true,
      spanRow: false,
      placeholder: 'Първи',
      options: ['Първи', 'Втори', 'Трети', 'Четвърти', 'Пети'],
    },
    {
      name: 'universityFacultyNumber',
      type: 'text',
      label: 'Факултетен номер',
      required: true,
      spanRow: true,
      placeholder: '0MI123456',
      formOptions: {
        minLength: 3,
        maxLength: 10,
        pattern: /^[A-Z0-9- ]+$/,
      },
    },
    {
      name: 'universityProofImage',
      type: 'image',
      label: 'Снимка за удостоверение',
      required: true,
      spanRow: true,
      description:
        'Снимка на студентската Ви книжка или профила Ви в студентската система на университета, на която се вижда, че сте записали летен семестър през учебната 2022/2023 година',
    },
    {
      name: 'userTechnologies',
      type: 'technologies',
      label: 'Технологии',
      required: true,
      spanRow: true,
      technologies: props.technologies,
    },
  ];

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('universityProofImage', data.universityProofImage[0]);
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    try {
      setIsLoading(true);
      const req = fetch(`/api/users`, {
        method: 'POST',
        body: formData,
      }); // TODO: replace with = await createUser(body);

      reset();

      const res = await req;
      setIsLoading(false);

      if (res.status === 201) {
        router.push('/auth/login');
      } else {
        const error = await res.json();
        setError(error.error);
      }
    } catch (error) {
      console.error(error);
      setError(error.toString());
    }
  };

  return (
    <div className="w-full acrylic rounded-lg md:mt-0 sm:max-w-6xl xl:p-0">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            {formFields.map((field) => {
              switch (field.type) {
                case 'text':
                case 'email':
                case 'phone':
                case 'password':
                  return (
                    <FormTextField
                      key={field.name}
                      register={register}
                      errors={errors}
                      {...field}
                    />
                  );

                case 'dropdown':
                  return (
                    // TODO: Fix field type
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    <FormDropdownField
                      key={field.name}
                      register={register}
                      errors={errors}
                      {...field}
                    />
                  );
                case 'image':
                  return (
                    <FormImageField
                      key={field.name}
                      register={register}
                      errors={errors}
                      {...field}
                    />
                  );
                case 'technologies':
                  return (
                    // @ts-expect-error Server component.
                    <FormTechnologiesField
                      key={field.name}
                      register={register}
                      errors={errors}
                      {...field}
                    />
                  );
              }
            })}
            <div className="flex items-center">
              <FormConditionsField />
            </div>
            <div className="flex justify-end">
              {isLoading ? (
                <CircularLoadingIndicator />
              ) : (
                <FancyButton isPrimary>Регистрация</FancyButton>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const universities = [
  'Софийски университет "Св. Климент Охридски"',
  'Аграрен университет',
  'Академия за музикално, танцово и изобразително изкуство',
  'Академия на МВР',
  'Американски университет в България',
  'Бургаски свободен университет',
  'Варненски свободен университет "Черноризец Храбър"',
  'Великотърновски университет "Свети свети Кирил и Методий"',
  'Висше военноморско училище "Никола Вапцаров"',
  'Висше строително училище "Любен Каравелов"',
  'Висше транспортно училище "Тодор Каблешков"',
  'Висше училище по агробизнес и развитие на регионите',
  'Висше училище по застраховане и финанси',
  'Висше училище по мениджмънт',
  'Висше училище по сигурност и икономика',
  'Висше училище по телекомуникации и пощи',
  'Военна академия "Георги Раковски"',
  'Европейски политехнически университет',
  'Европейско висше училище по икономика и мениджмънт',
  'Икономически университет',
  'Колеж по мениджмънт, търговия и маркетинг',
  'Лесотехнически университет',
  'Медицински университет, Плевен',
  'Медицински университет, Пловдив',
  'Медицински университет, София',
  'Медицински университет "Професор доктор Параскев Стоянов", Варна',
  'Международно висше бизнес училище',
  'Минно-геоложки университет "Свети Иван Рилски"',
  'Национален военен университет "Васил Левски"',
  'Национална академия за театрално и филмово изкуство "Кръстьо Сарафов"',
  'Национална музикална академия "Професор Панчо Владигеров"',
  'Национална спортна академия "Васил Левски"',
  'Национална художествена академия',
  'Нов български университет',
  'Пловдивски университет "Паисий Хилендарски"',
  'Русенски университет "Ангел Кънчев"',
  'Стопанска академия "Димитър Ценов"',
  'Театрален колеж "Любен Гройс"',
  'Технически университет, Варна',
  'Технически университет, Габрово',
  'Технически университет, София',
  'Тракийски университет',
  'Университет "Проф. д-р Асен Златаров"',
  'Университет за национално и световно стопанство',
  'Университет по архитектура, строителство и геодезия',
  'Университет по библиотекознание и информационни технологии',
  'Университет по хранителни технологии',
  'Химикотехнологичен и металургичен университет',
  'Шуменски университет "Епископ Константин Преславски"',
  'Югозападен университет "Неофит Рилски"',
];

export default RegistrationForm;
