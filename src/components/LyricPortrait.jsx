import Section from "./Section";

const lyricLines = [
  "I'll be the greatest fan of your life",
  "I will choose you through every season",
  "Your love is my softest place to rest",
  "Every memory keeps singing your name",
  "Forever sounds better when it is us",
];

export default function LyricPortrait({ image }) {
  return (
    <Section eyebrow="Lyric Portrait" title="Drawn with our song">
      <div className="lyric-portrait mx-auto max-w-6xl">
        <img src={image.src} alt="Lyric portrait memory" loading="lazy" decoding="async" />
        <div className="lyric-veil" aria-hidden="true">
          {Array.from({ length: 9 }, (_, repeat) =>
            lyricLines.map((line, index) => (
              <span key={`${repeat}-${index}`} style={{ animationDelay: `${(repeat + index) * 0.2}s` }}>
                {line}
              </span>
            )),
          )}
        </div>
      </div>
      <p className="mx-auto mt-5 max-w-3xl text-center text-sm leading-6 text-rosewood/60">
        Add any private custom text in <span className="font-semibold">src/components/LyricPortrait.jsx</span>.
      </p>
    </Section>
  );
}
