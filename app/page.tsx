import { PostGroupedList } from "@/components/PostList";
import { ProfileCard } from "@/components/ProfileCard";
import { fetchApi } from "@/lib/fetchApi";
import { Post } from "@/lib/model/Post";

export default async function Home() {
  const res = await fetchApi("/api/posts");
  const data = (await res.json()) as Record<number, Post[]>;
  const posts = new Map<number, Post[]>(
    Object.entries(data).map(([key, value]) => [Number(key), value]),
  );

  return (
    <>
      <ProfileCard />
      <PostGroupedList posts={posts} />
    </>
  );
}
