import { injectable, inject } from "tsyringe";
import { compareDesc } from "date-fns";

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

  async getGroupedPosts(): Promise<Map<number, Post[]>> {
    const posts = await this.getPosts();
    const group = new Map<number, Post[]>();

    posts.forEach((post) => {
      const year = post.dateCreated.getFullYear();
      if (!group.has(year)) {
        group.set(year, []);
      }
      group.get(year)?.push(post);
    });

    group.forEach((posts, _year) => {
      posts.sort((a, b) => compareDesc(a.dateCreated, b.dateCreated));
    });

    return group;
  }
}
