'use client';

import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { Regulation } from '@prisma/client';

export interface RegulationDisclosureProps {
  regulation: Regulation;
}

export function RegulationDisclosure(props: RegulationDisclosureProps) {
  return (
    <Disclosure as="div" className="mt-3">
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-red-700 px-4 py-2 text-left text-lg font-medium text-white focus:outline-none focus-visible:ring ">
            <span>{props.regulation.title}</span>
            <ChevronUpIcon
              className={`${
                !open ? 'rotate-180 transform' : ''
              } h-5 w-5 text-white`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="acrylic px-4 mt-2 py-2 text-md text-white rounded-lg">
            <div
              dangerouslySetInnerHTML={{ __html: props.regulation.content }}
            />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default RegulationDisclosure;
