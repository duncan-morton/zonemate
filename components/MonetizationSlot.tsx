export default function MonetizationSlot() {
  const isEnabled = process.env.NEXT_PUBLIC_MONETIZATION === "1";

  if (!isEnabled) {
    return null;
  }

  return (
    <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-6 text-center">
      <div className="text-xs font-medium uppercase tracking-wide text-neutral-500">
        Sponsored
      </div>
      <div className="mt-2 text-sm text-neutral-600">Ad placement</div>
    </div>
  );
}

