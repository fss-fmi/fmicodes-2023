'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode, useState } from 'react';
import FancyButton from '../fancy-button/fancy-button';

export interface FancyModalProps {
  children?: ReactNode;
  title: string;
  openButtonContent: ReactNode;
}

export function FancyModal(props: FancyModalProps) {
  const [isModalShown, setIsModalShown] = useState(false);

  return (
    <>
      <FancyButton
        isPrimary
        onClick={() => {
          setIsModalShown(true);
        }}
      >
        {props.openButtonContent}
      </FancyButton>

      <Transition.Root show={isModalShown} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsModalShown}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                  <div className="bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-white"
                        >
                          {props.title}
                        </Dialog.Title>
                        {props.children}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <FancyButton
                      isPrimary
                      onClick={() => setIsModalShown(false)}
                    >
                      Затвори
                    </FancyButton>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default FancyModal;
