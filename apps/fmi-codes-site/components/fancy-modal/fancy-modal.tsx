import { ReactNode } from 'react';

export interface FancyModalProps {
  isModalShown: boolean;
  setIsModalShown: (isModalShown: boolean) => void;
  children?: ReactNode;
  title: string;
}

export function FancyModal(props: FancyModalProps) {
  if (!props.isModalShown) {
    return null;
  }
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">{props.title}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => props.setIsModalShown(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 h-72 flex-auto">{props.children}</div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => props.setIsModalShown(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="opacity-50 fixed inset-0 z-40 bg-black"
        onClick={() => props.setIsModalShown(false)}
      ></div>
    </>
  );
}

export default FancyModal;
