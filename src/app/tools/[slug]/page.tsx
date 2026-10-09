import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { renderToolComponent } from '@/components/tools/ToolRegistry';
import { getToolBySlug, TOOLS_DATA } from '@/lib/tools-data';
import { constructMetadata } from '@/lib/seo';

interface ToolPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return TOOLS_DATA.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return constructMetadata({
      title: 'Tool Not Found',
      description: 'The requested text tool does not exist.',
    });
  }

  return constructMetadata({
    title: tool.metaTitle,
    description: tool.metaDescription,
    canonical: `/tools/${tool.slug}`,
  });
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  return (
    <ToolPageLayout tool={tool}>
      {renderToolComponent(tool.slug)}
    </ToolPageLayout>
  );
}
