"use client";

import { useState } from "react";
import Image from "next/image";
import { WhatsAppIcon, XIcon } from "@/components/icons";
import { getWhatsAppLink } from "@/lib/contact";

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open ? (
        <div className="w-[19rem] overflow-hidden rounded-2xl bg-white shadow-2xl shadow-navy-900/25 ring-1 ring-black/5">
          <div className="flex items-center gap-3 bg-[#25D366] px-4 py-3.5 text-white">
            <Image src="/logo.jpeg" alt="Basavashree Education" width={36} height={36} className="h-9 w-9 rounded-full bg-white object-contain p-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold">Basavashree Education</p>
              <p className="text-xs text-white/85">Typically replies within a few hours</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex h-7 w-7 items-center justify-center rounded-full text-white/90 hover:bg-white/15"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="bg-sky-50 p-4">
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white p-3 text-sm text-navy-800 shadow-sm">
              Hi there! Have a question about a course or need help enrolling? Chat with us directly on WhatsApp.
            </div>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1fb857]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Start Chat on WhatsApp
            </a>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close chat" : "Chat with us on WhatsApp"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-navy-900/25 transition-transform hover:scale-105"
      >
        {open ? <XIcon className="h-6 w-6" /> : <WhatsAppIcon className="h-7 w-7" />}
      </button>
    </div>
  );
}
