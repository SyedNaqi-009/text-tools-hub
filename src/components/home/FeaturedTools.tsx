import React from 'react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { ToolCard } from '../tools/ToolCard';
import { TextTool } from '@/lib/tools-data';

export function FeaturedTools({ tools }: { tools: TextTool[] }) {
  return (
    <section className="py-16 bg-slate-50/50">
      <Container>
        <SectionHeading
          title="Featured Gateway Tools"
          subtitle="Our most visited and essential utilities for everyday editing, content creation, and analysis."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </Container>
    </section>
  );
}
