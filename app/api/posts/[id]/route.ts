import { container } from "@/lib/di";
import { GetPostService } from "@/lib/service/GetPostService";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  const service = container.resolve(GetPostService);
  const post = await service.getPost(id);
  return Response.json(post);
}
