export default function StepNumber({ number }: { number: string }) {
  return (
    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-md border border-[var(--gold)]/60 bg-[var(--panel)] font-display text-2xl text-gold-foil">
      {number}
    </div>
  );
}
