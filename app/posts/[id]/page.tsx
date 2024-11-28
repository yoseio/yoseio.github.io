import { compileMDX } from "next-mdx-remote/rsc";

import { fetchApi } from "@/lib/fetchApi";
import { Post } from "@/lib/model/Post";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const res = await fetchApi(`/api/posts/${id}`);
  const post = (await res.json()) as Post;

  const { content } = await compileMDX({
    source: post.articleBody,
    options: { parseFrontmatter: true },
  });

  return <article className="prose">{content}</article>;
}
