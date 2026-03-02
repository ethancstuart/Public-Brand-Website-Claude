import Parser from "rss-parser";

export interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  categories?: string[];
}

const parser = new Parser<Record<string, unknown>, SubstackPost>({
  customFields: {
    item: ["contentSnippet"],
  },
});

const SUBSTACK_FEED_URL =
  process.env.SUBSTACK_URL ||
  "https://thedataproductagent.substack.com/feed";

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
      categories: item.categories,
    }));

    return limit ? posts.slice(0, limit) : posts;
  } catch (error) {
    console.error("Failed to fetch Substack feed:", error);
    return [];
  }
}
