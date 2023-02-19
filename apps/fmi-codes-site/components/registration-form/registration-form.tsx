'use client';

import { useForm } from 'react-hook-form';
import FormImageField from '../form-image-field/form-image-field';
import FormDropdownField from '../form-dropdown-field/form-dropdown-field';
import FormTextField from '../form-text-field/form-text-field';
import { router } from 'next/client';

export function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formFields = [
    {
      name: 'firstName',
      type: 'text',
      label: 'Име',
      required: true,
      placeholder: 'Георги',
      formOptions: {
        minLength: 2,
        maxLength: 30,
        pattern: /^[а-яА-Я-]+$/,
      },
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Фамилия',
      required: true,
      placeholder: 'Георгиев',
      formOptions: {
        minLength: 2,
        maxLength: 30,
        pattern: /^[а-яА-Я-]+$/,
      },
    },
    {
      name: 'phone',
      type: 'phone',
      label: 'Телефон',
      required: true,
      placeholder: '0888888888',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Имейл адрес',
      required: true,
      placeholder: 'name@email.com',
    },
    {
      name: 'password',
      type: 'password',
      label: 'Парола',
      required: true,
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
      options: universities,
    },
    {
      name: 'universityDegree',
      type: 'dropdown',
      label: 'Степен',
      required: true,
      options: ['Бакалавър', 'Магистър', 'Докторант'],
    },
    {
      name: 'universityMajor',
      type: 'text',
      label: 'Специалност',
      required: true,
      placeholder: 'Компютърни науки',
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
      placeholder: 'Първи',
      options: ['Първи', 'Втори', 'Трети', 'Четвърти', 'Пети', 'Шести'],
    },
    {
      name: 'universityFacultyNumber',
      type: 'text',
      label: 'Факултетен номер',
      required: true,
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
      description:
        'Снимка на студентската Ви книжка или профила Ви в студентската система на университета, на която се вижда, че сте записали летен семестър през учебната 2022/2023 година',
    },
  ];

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('universityProofImage', data.universityProofImage[0]);
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    try {
      const res = await fetch(`/api/users`, {
        method: 'POST',
        body: formData,
      }); // TODO: replace with = await createUser(body);

      if (res.status === 201) {
        await router.push('/auth/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-6xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
          Регистрация
        </h1>
        <form
          className="space-y-4 md:space-y-6 xl:columns-2"
          onSubmit={handleSubmit(onSubmit)}
        >
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
            }
          })}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
            >
              Регистрация
            </button>
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
