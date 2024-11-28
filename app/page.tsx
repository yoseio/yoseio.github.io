import "reflect-metadata";

import { PostGroupedList } from "@/components/PostList";
import { ProfileCard } from "@/components/ProfileCard";
import { GetPostsService } from "@/lib/service/GetPostsService";
import { container } from "@/lib/di";

export default async function Home() {
  const service = container.resolve(GetPostsService);
  const posts = await service.getGroupedPosts();

  return (
    <>
      <ProfileCard />
      <PostGroupedList posts={posts} />
    </>
  );
}
