export interface AuthorConfig {
  name: string;
  affiliation?: string;
  email?: string;
  orcid?: string;
  github?: string;
  isDefault: boolean;
}

export const defaultAuthor: AuthorConfig = {
  name: "Md. Ismail Hossain",
  affiliation: "Jahangirnagar University, Institute of Information Technology",
  github: "smile-plzz",
  isDefault: true,
};

export const knownCoAuthors: Record<string, AuthorConfig> = {
  "ismail-hossain": defaultAuthor,
};

/**
 * Returns default author configuration when explicit publication metadata is absent.
 */
export function getDefaultAuthors(): AuthorConfig[] {
  return [defaultAuthor];
}

