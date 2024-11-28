import { compileMDX } from "next-mdx-remote/rsc";

import { container } from "@/lib/di";
import { fetchApi } from "@/lib/fetchApi";
import { GetPostsService } from "@/lib/service/GetPostsService";
import { Post } from "@/lib/model/Post";

export async function generateStaticParams() {
  const service = container.resolve(GetPostsService);
  const posts = await service.getPosts();

  return posts.map((post) => ({
    id: post.identifier,
  }));
}

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
