import { container } from "@/lib/di";
import { GetPostService } from "@/lib/service/GetPostService";
import { GetPostsService } from "@/lib/service/GetPostsService";

export async function generateStaticParams() {
  const service = container.resolve(GetPostsService);
  const posts = await service.getPosts();

  return posts.map((post) => ({
    id: post.identifier,
  }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  const service = container.resolve(GetPostService);
  const post = await service.getPost(id);
  return Response.json(post);
}
