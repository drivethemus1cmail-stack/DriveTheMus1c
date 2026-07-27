export default function MileMarker({ number }: { number: string }) {
  return (
    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[4px] border-2 border-[var(--reflector)]/60 bg-[var(--sign-green)] font-display text-xl font-bold text-white">
      {number}
    </div>
  );
}
