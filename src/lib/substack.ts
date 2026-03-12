import Parser from "rss-parser";

export interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  content: string;
  slug: string;
  categories?: string[];
}

const parser = new Parser<
  Record<string, unknown>,
  { contentSnippet?: string; "content:encoded"?: string }
>({
  customFields: {
    item: ["contentSnippet", "content:encoded"],
  },
});

const SUBSTACK_FEED_URL =
  process.env.SUBSTACK_URL ||
  "https://thedataproductagent.substack.com/feed";

function extractSlug(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    const segments = pathname.split("/").filter(Boolean);
    return segments[segments.length - 1] || "untitled";
  } catch {
    return "untitled";
  }
}

export async function getSubstackPosts(
  limit?: number
): Promise<SubstackPost[]> {
  try {
    const feed = await parser.parseURL(SUBSTACK_FEED_URL);

    const posts: SubstackPost[] = (feed.items || []).map((item) => ({
      title: item.title || "Untitled",
      link: item.link || "#",
      pubDate: item.pubDate || "",
      contentSnippet: item.contentSnippet
        ? item.contentSnippet.slice(0, 200) + "…"
        : "",
      content: item["content:encoded"] || "",
      slug: extractSlug(item.link || ""),
      categories: item.categories,
    }));

    return limit ? posts.slice(0, limit) : posts;
  } catch (error) {
    console.error("Failed to fetch Substack feed:", error);
    return [];
  }
}

export async function getSubstackPostBySlug(
  slug: string
): Promise<SubstackPost | null> {
  const posts = await getSubstackPosts();
  return posts.find((p) => p.slug === slug) || null;
}
