import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageLayout } from "@/components/services/service-page-layout";
import { services, serviceSlugs, type ServiceSlug } from "@/lib/services-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services[slug as ServiceSlug];
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.name} for B2B SaaS`,
    description: service.subheadline,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = services[slug as ServiceSlug];
  if (!service) notFound();
  return <ServicePageLayout service={service} />;
}
