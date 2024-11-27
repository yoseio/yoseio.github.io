import { injectable, inject } from "tsyringe";

import { type Post } from "@/lib/model/Post";
import { type ListPostsPort } from "@/lib/port/ListPostsPort";
import { type GetPostService } from "@/lib/service/GetPostService";

@injectable()
export class GetPostsService {
  constructor(
    @inject("ListPostsPort")
    private listPostsPort: ListPostsPort,
    @inject("GetPostService")
    private getPostService: GetPostService,
  ) {}

  async getPosts(): Promise<Post[]> {
    const ids = await this.listPostsPort.listPosts();
    const posts = await Promise.all(
      ids.map((id) => this.getPostService.getPost(id)),
    );
    return posts;
  }
}
