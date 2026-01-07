"use client";

import { useState } from "react";

interface EmbedCodeBoxProps {
  code: string;
  label?: string;
}

export default function EmbedCodeBox({ code, label }: EmbedCodeBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = code;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch (err) {
        // Ignore
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-neutral-700">
          {label}
        </label>
      )}
      <div className="relative">
        <textarea
          readOnly
          value={code}
          rows={6}
          className="w-full rounded-md border border-neutral-300 bg-neutral-50 px-3 py-2 font-mono text-sm text-neutral-900 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
          onClick={(e) => {
            e.currentTarget.select();
          }}
        />
        <button
          type="button"
          onClick={handleCopy}
          className="absolute right-2 top-2 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-neutral-500"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}

