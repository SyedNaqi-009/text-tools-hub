export interface MetaTagAnalysis {
  titleLength: number;
  descriptionLength: number;
  titleStatus: 'optimal' | 'warning' | 'danger';
  titleMessage: string;
  descriptionStatus: 'optimal' | 'warning' | 'danger';
  descriptionMessage: string;
  truncatedTitle: string;
  truncatedDescription: string;
}

export function analyzeMetaTags(title: string, description: string): MetaTagAnalysis {
  const titleLength = title.length;
  const descriptionLength = description.length;

  let titleStatus: 'optimal' | 'warning' | 'danger' = 'optimal';
  let titleMessage = 'Title length is optimal for Google search results (30-60 chars).';

  if (titleLength === 0) {
    titleStatus = 'danger';
    titleMessage = 'Title is empty. Please enter a page title.';
  } else if (titleLength < 30) {
    titleStatus = 'warning';
    titleMessage = 'Title is somewhat short. Consider adding helpful keywords.';
  } else if (titleLength > 60) {
    titleStatus = 'danger';
    titleMessage = 'Title is over 60 characters and may be truncated on Google.';
  }

  let descriptionStatus: 'optimal' | 'warning' | 'danger' = 'optimal';
  let descriptionMessage = 'Meta description length is ideal (120-160 chars).';

  if (descriptionLength === 0) {
    descriptionStatus = 'danger';
    descriptionMessage = 'Description is empty. Please write a meta description.';
  } else if (descriptionLength < 100) {
    descriptionStatus = 'warning';
    descriptionMessage = 'Description is short. Consider providing more detail (aim for 120-160 chars).';
  } else if (descriptionLength > 160) {
    descriptionStatus = 'danger';
    descriptionMessage = 'Description exceeds 160 characters and will likely be cut off on Google snippets.';
  }

  const truncatedTitle = titleLength > 60 ? `${title.slice(0, 57)}...` : title;
  const truncatedDescription = descriptionLength > 160 ? `${description.slice(0, 157)}...` : description;

  return {
    titleLength,
    descriptionLength,
    titleStatus,
    titleMessage,
    descriptionStatus,
    descriptionMessage,
    truncatedTitle,
    truncatedDescription,
  };
}
