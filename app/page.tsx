import { Container } from "@/components/Container"
import { NavBar } from "@/components/NavBar"
import { PostGroupedList } from "@/components/PostList"
import { ProfileCard } from "@/components/ProfileCard"
import { createFakePosts } from "@/lib/model";

export default function Home() {
  const posts = createFakePosts(10);

  return (
    <Container>
      <NavBar />
      <ProfileCard />
      <PostGroupedList posts={posts} />
    </Container>
  );
}
