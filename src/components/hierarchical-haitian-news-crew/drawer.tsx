"use client";

import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { CustomizeCrew } from "@/components/hierarchical-haitian-news-crew/shared/customize-crew";

interface P {
  topNavHeight: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Drawer(P: P) {
  return (
    <Dialog
      open={P.open}
      onClose={P.setOpen}
      className={`relative z-10 xl:hidden`}
    >
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16 pt-16`}
          >
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-96 transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700 border-gray-900 border-l-2"
            >
              <CustomizeCrew parentTitle="Drawer" setDrawerOpen={P.setOpen} />
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
