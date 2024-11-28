import "reflect-metadata";
import { compileMDX } from "next-mdx-remote/rsc";

import { GetPostService } from "@/lib/service/GetPostService";
import { GetPostsService } from "@/lib/service/GetPostsService";
import { container } from "@/lib/di";

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
  const service = container.resolve(GetPostService);
  const post = await service.getPost(id);

  const { content } = await compileMDX({
    source: post.articleBody,
    options: { parseFrontmatter: true },
  });

  return <article className="prose">{content}</article>;
}
