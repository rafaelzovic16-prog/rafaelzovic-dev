import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/views/CaseStudyView";
import { getProject, projects } from "@/content/projects";
import { caseStudyMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

/* Só os projetos conhecidos são gerados; qualquer outro endereço é tratado pelo proxy (404). */
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return caseStudyMetadata("pt", slug);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <CaseStudyView locale="pt" project={project} />;
}
