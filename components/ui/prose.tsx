export function Prose({ paragraphs }: { paragraphs: string[] }) {
  const [lead, ...rest] = paragraphs;
  if (!lead) return null;

  return (
    <div className="mt-16 max-w-[34rem] md:mt-24 md:pl-14">
      <span className="mb-7 block h-px w-8 bg-current/30" aria-hidden />
      <p
        data-reveal
        className="font-display text-[clamp(1.65rem,2.3vw,2.15rem)] leading-[1.32] font-light tracking-[-0.02em]"
      >
        {lead}
      </p>
      {rest.length > 0 ? (
        <div className="mt-8 border-l border-current/20 pl-6">
          {rest.map((paragraph) => (
            <p
              data-reveal
              key={paragraph}
              className="mt-5 text-[1.02rem] leading-[1.8] tracking-[0.012em] first:mt-0"
            >
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}
