import React, { Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";

import Button from "../UI/Button";

interface IConfirmChangeStatusModal {
  label: string;
  isOpen: boolean;
  handleChangeStatusActivity: (pass: boolean) => Promise<void>;
  closeModal: () => void;
}

const ConfirmChangeStatusModal = ({
  label,
  isOpen,
  handleChangeStatusActivity,
  closeModal,
}: IConfirmChangeStatusModal) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform space-y-5 overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="p"
                  className={clsx(
                    `text-center text-header-5 leading-6 text-gray-900`,
                  )}
                >
                  คุณต้องการให้กิจกรรมนี้{" "}
                  <span
                    className={clsx(
                      label === "ผ่าน" ? `text-success-500` : `text-red-500`,
                    )}
                  >
                    {label}
                  </span>{" "}
                  ใช่หรือไม่ ?
                </Dialog.Title>
                <div
                  className={clsx(
                    `flex w-full items-center justify-center space-x-5`,
                  )}
                >
                  <Button
                    variant="success"
                    onClick={() => {
                      if (label === "ผ่าน") {
                        handleChangeStatusActivity(true);
                      } else {
                        handleChangeStatusActivity(false);
                      }
                    }}
                  >
                    ใช่
                  </Button>
                  <Button
                    variant="milk-pink"
                    onClick={() => {
                      closeModal();
                    }}
                  >
                    ไม่ใช่
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConfirmChangeStatusModal;
