import { container } from "@/lib/di";
import { GetPostsService } from "@/lib/service/GetPostsService";

export async function GET() {
  const service = container.resolve(GetPostsService);
  const posts = await service.getGroupedPosts();
  return Response.json(posts);
}
