import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = (
    await getCollection("writing", ({ data }) => !data.draft)
  ).sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );

  return rss({
    title: "anton kundenko · writing",
    description:
      "essays and notes on vector databases, simd, allocators, and tiny vms.",
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.publishedAt,
      link: `/writing/${post.id}`,
      categories: post.data.tags,
    })),
    customData: "<language>en</language>",
  });
}
