import React from 'react';
import { WordCounterTool } from './implementations/WordCounterTool';
import { CharacterCounterTool } from './implementations/CharacterCounterTool';
import { WordFrequencyCounterTool } from './implementations/WordFrequencyCounterTool';
import { KeywordDensityCheckerTool } from './implementations/KeywordDensityCheckerTool';
import { ReadingTimeCalculatorTool } from './implementations/ReadingTimeCalculatorTool';
import { CaseConverterTool } from './implementations/CaseConverterTool';
import { TextReverserTool } from './implementations/TextReverserTool';
import { TextRepeaterTool } from './implementations/TextRepeaterTool';
import { SlugGeneratorTool } from './implementations/SlugGeneratorTool';
import { NumberToWordsTool } from './implementations/NumberToWordsTool';
import { RemoveDuplicateLinesTool } from './implementations/RemoveDuplicateLinesTool';
import { RemoveExtraSpacesTool } from './implementations/RemoveExtraSpacesTool';
import { RemoveEmptyLinesTool } from './implementations/RemoveEmptyLinesTool';
import { RemoveLineBreaksTool } from './implementations/RemoveLineBreaksTool';
import { FindAndReplaceTool } from './implementations/FindAndReplaceTool';
import { SortTextLinesTool } from './implementations/SortTextLinesTool';
import { AddLineNumbersTool } from './implementations/AddLineNumbersTool';
import { AddPrefixSuffixTool } from './implementations/AddPrefixSuffixTool';
import { TextCompareTool } from './implementations/TextCompareTool';
import { LoremIpsumGeneratorTool } from './implementations/LoremIpsumGeneratorTool';
import { MetaTagCheckerTool } from './implementations/MetaTagCheckerTool';
import { TextToBinaryTool } from './implementations/TextToBinaryTool';

export function renderToolComponent(slug: string): React.ReactNode {
  switch (slug) {
    case 'word-counter':
      return <WordCounterTool />;
    case 'character-counter':
      return <CharacterCounterTool />;
    case 'word-frequency-counter':
      return <WordFrequencyCounterTool />;
    case 'keyword-density-checker':
      return <KeywordDensityCheckerTool />;
    case 'reading-time-calculator':
      return <ReadingTimeCalculatorTool />;
    case 'case-converter':
      return <CaseConverterTool />;
    case 'text-reverser':
      return <TextReverserTool />;
    case 'text-repeater':
      return <TextRepeaterTool />;
    case 'slug-generator':
      return <SlugGeneratorTool />;
    case 'number-to-words':
      return <NumberToWordsTool />;
    case 'remove-duplicate-lines':
      return <RemoveDuplicateLinesTool />;
    case 'remove-extra-spaces':
      return <RemoveExtraSpacesTool />;
    case 'remove-empty-lines':
      return <RemoveEmptyLinesTool />;
    case 'remove-line-breaks':
      return <RemoveLineBreaksTool />;
    case 'find-and-replace':
      return <FindAndReplaceTool />;
    case 'sort-text-lines':
      return <SortTextLinesTool />;
    case 'add-line-numbers':
      return <AddLineNumbersTool />;
    case 'add-prefix-suffix':
      return <AddPrefixSuffixTool />;
    case 'text-compare':
      return <TextCompareTool />;
    case 'lorem-ipsum-generator':
      return <LoremIpsumGeneratorTool />;
    case 'meta-tag-checker':
      return <MetaTagCheckerTool />;
    case 'text-to-binary':
      return <TextToBinaryTool />;
    default:
      return (
        <div className="p-8 text-center text-slate-500">
          Tool implementation coming soon...
        </div>
      );
  }
}
