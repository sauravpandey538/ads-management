import { Check, X } from "lucide-react";
import { PlayfulBadge } from "@/components/ui/playful-badge";
import { PlayfulCard } from "@/components/ui/playful-card";
import { TeamMemberCard } from "@/components/shared/team-member-card";
import { LinkedInButton, PersonAvatar } from "@/components/shared/person-links";
import { FadeIn } from "@/components/motion/fade-in";
import {
  founder,
  teamIntro,
  teamMembers,
  whyOurTeam,
  whyWeAreBetter,
} from "@/lib/site-config";

/** CEO message block — headshot, bio, and LinkedIn. */
export function CeoIntroSection() {
  return (
    <section className="py-16 sm:py-20 border-b border-ink/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <PlayfulBadge variant="chip" className="mb-4">
            From our CEO
          </PlayfulBadge>
          <h2 className="text-3xl font-bold text-ink sm:text-4xl text-balance max-w-2xl">
            Built by someone who&apos;s owned the pipeline number
          </h2>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-10">
          <PlayfulCard variant="ticket" tone="sun" className="p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
              <div className="flex flex-col items-center lg:items-start shrink-0">
                <PersonAvatar
                  name={founder.name}
                  imageSrc={founder.imageSrc}
                  className="size-32 sm:size-40 text-3xl"
                />
                <div className="mt-5 text-center lg:text-left">
                  <p className="text-xl font-bold text-ink">{founder.name}</p>
                  <p className="mt-0.5 text-sm font-semibold text-primary">{founder.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Former {founder.formerRole} at {founder.formerCompany}
                  </p>
                  <LinkedInButton href={founder.linkedinUrl} className="mt-4" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <blockquote className="border-l-4 border-primary pl-5 text-lg font-semibold text-ink leading-snug italic">
                  &ldquo;{founder.quote}&rdquo;
                </blockquote>
                <div className="mt-6 space-y-4">
                  {founder.bio.map((paragraph, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </PlayfulCard>
        </FadeIn>
      </div>
    </section>
  );
}

/** Team intro copy + roster grid. */
export function TeamSection() {
  return (
    <section className="py-16 sm:py-24 border-b border-ink/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="max-w-3xl">
          <PlayfulBadge variant="flag" className="mb-4">
            Our team
          </PlayfulBadge>
          <h2 className="text-3xl font-bold text-ink sm:text-4xl text-balance">
            {teamIntro.headline}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{teamIntro.subheadline}</p>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            {teamIntro.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, i) => (
            <FadeIn key={member.name} delay={0.06 + i * 0.05}>
              <TeamMemberCard member={member} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Why this team — four differentiators. */
export function WhyTeamSection() {
  return (
    <section className="py-16 sm:py-24 bg-sky/10 border-b border-ink/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="max-w-2xl">
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">{whyOurTeam.headline}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{whyOurTeam.subheadline}</p>
        </FadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {whyOurTeam.points.map((point, i) => (
            <FadeIn key={point.title} delay={0.05 + i * 0.06}>
              <PlayfulCard variant="pin" tone="neutral" className="p-6 h-full">
                <p className="font-bold text-ink">{point.title}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {point.description}
                </p>
              </PlayfulCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Us vs generalist agencies comparison. */
export function WhyBetterSection() {
  return (
    <section className="py-16 sm:py-24 border-b border-ink/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="max-w-2xl">
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">{whyWeAreBetter.headline}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{whyWeAreBetter.subheadline}</p>
        </FadeIn>

        <div className="mt-12 space-y-4">
          {whyWeAreBetter.comparisons.map((row, i) => (
            <FadeIn key={row.title} delay={0.04 + i * 0.04}>
              <div className="card-2d-sm bg-white overflow-hidden">
                <p className="px-4 py-3 text-sm font-bold text-ink border-b-2 border-ink/10 bg-cream/50">
                  {row.title}
                </p>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x-2 divide-ink/10">
                  <div className="flex gap-3 p-4 sm:p-5 bg-muted/30">
                    <X className="size-5 shrink-0 text-destructive mt-0.5" aria-hidden />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Generalist agencies
                      </p>
                      <p className="text-sm text-ink/70 leading-relaxed">{row.them}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 sm:p-5">
                    <Check className="size-5 shrink-0 text-primary mt-0.5" aria-hidden />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                        adMarkapture
                      </p>
                      <p className="text-sm text-ink leading-relaxed font-medium">{row.us}</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
