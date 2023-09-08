export type Frontmatter = {
  title: string;
  description?: string;
  tags: string[];
  published: string;
  lastEdited: string;
};

export type FrontmatterWithSlug = Frontmatter & {
  slug: string;
};

export type Heading = {
  id: string;
  title: string;
};