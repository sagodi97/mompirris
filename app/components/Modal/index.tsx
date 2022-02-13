import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useState } from "react";

interface ModalProps {
  title?: string;
  buttonClassName?: string;
  buttonLabel?: string;
  defaultOpen?: boolean;
  onClose?: () => void;
}
const Modal: FC<ModalProps> = ({
  children,
  buttonClassName = "btn-m btn-primary w-max",
  title = "",
  buttonLabel,
  defaultOpen,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(!!defaultOpen);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <>
      {buttonLabel && (
        <button type="button" onClick={openModal} className={buttonClassName}>
          {buttonLabel}
        </button>
      )}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto p-10 md:inset-x-0 md:-top-1/4"
          onClose={() => {
            closeModal();
            onClose && onClose();
          }}
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0" />

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="mb-5 text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
                {children}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default Modal;
