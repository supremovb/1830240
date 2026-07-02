import { Clock, Hourglass, Infinity, Sparkle } from "lucide-react";
import Section from "./Section";

const stats = [
  { label: "Years", value: "3", icon: Infinity },
  { label: "Months", value: "6", icon: Sparkle },
  { label: "Days", value: "29", icon: Hourglass },
  { label: "Hours", value: "30,504", icon: Clock },
  { label: "Minutes", value: "1,830,240", icon: Clock },
];

export default function Stats() {
  return (
    <Section eyebrow="Our time" title="Every moment became ours">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="group rounded-3xl border border-white/80 bg-white/65 p-6 text-center shadow-gold backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/85"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rosewood group-hover:bg-rosewood group-hover:text-white">
              <Icon className="h-5 w-5" />
            </div>
            <p className="font-display text-4xl font-bold text-rosewood">{value}</p>
            <p className="mt-1 text-sm font-semibold uppercase tracking-[0.22em] text-rosewood/55">{label}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
