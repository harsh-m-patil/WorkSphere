import { Fragment } from 'react';
import { HiOutlineChatAlt, HiOutlineBell } from 'react-icons/hi';
import { Popover, Transition } from '@headlessui/react';
import classNames from 'classnames';

export default function Header() {
  return (
    <div className="flex h-16 items-center justify-end border-b border-gray-200 bg-white px-4">
      {/* <div className="relative">
        <HiOutlineSearch
          fontSize={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="search..."
          className="h-10 w-[24rem] rounded-sm border border-gray-300 px-5 pl-11 text-sm focus:outline-none active:outline-none"
        />
      </div> */}
      <div className="mr-2 flex items-center gap-2">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && 'bg-gray-100', // Highlight when open
                  'inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100'
                )}
              >
                <HiOutlineChatAlt fontSize={24} />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-80">
                  <div className="rounded-sm bg-white px-2 py-2.5 shadow-md ring-1 ring-black ring-opacity-5">
                    <strong className="font-medium text-gray-700">
                      Messages
                    </strong>
                    <div className="mt-2 py-1 text-sm">
                      This is message pannel
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>

        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && 'bg-gray-100', // Highlight when open
                  'inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100'
                )}
              >
                <HiOutlineBell fontSize={24} />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-80">
                  <div className="rounded-sm bg-white px-2 py-2.5 shadow-md ring-1 ring-black ring-opacity-5">
                    <strong className="font-medium text-gray-700">
                      Notifications
                    </strong>
                    <div className="mt-2 py-1 text-sm">
                      This is notification pannel
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  );
}
