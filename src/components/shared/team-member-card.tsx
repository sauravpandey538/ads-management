import { ExternalLink } from "lucide-react";
import { PlayfulCard } from "@/components/ui/playful-card";
import { LinkedInButton, PersonAvatar } from "@/components/shared/person-links";
import type { TeamMember } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type TeamMemberCardProps = {
  member: TeamMember;
  className?: string;
};

/** Team roster card with headshot and LinkedIn link. */
export function TeamMemberCard({ member, className }: TeamMemberCardProps) {
  return (
    <PlayfulCard
      variant="ticket"
      tone="neutral"
      hover
      className={cn("p-5 sm:p-6 h-full flex flex-col", className)}
    >
      <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
        <PersonAvatar
          name={member.name}
          imageSrc={member.imageSrc}
          className="size-20 sm:size-24 text-2xl"
        />
        <p className="mt-4 font-bold text-ink">{member.name}</p>
        <p className="mt-0.5 text-sm font-semibold text-primary">{member.title}</p>
        {member.formerRole && member.formerCompany && (
          <p className="mt-1 text-xs text-muted-foreground">
            Former {member.formerRole} at {member.formerCompany}
          </p>
        )}
      </div>

      <p className="mt-4 text-sm text-muted-foreground leading-relaxed flex-1">
        {member.bio}
      </p>

      <a
        href={member.linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A66C2] hover:underline"
      >
        <span className="flex size-4 items-center justify-center rounded-sm bg-[#0A66C2] text-[8px] font-black text-white">
          in
        </span>
        LinkedIn profile
        <ExternalLink className="size-3 opacity-70" />
      </a>
    </PlayfulCard>
  );
}
