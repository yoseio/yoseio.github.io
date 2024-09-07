import Link from "next/link"
import { format, compareDesc } from "date-fns";

import { Post } from "@/lib/model"

export interface PostGroupedListProps {
  posts: Post[];
}

export function PostGroupedList(props: PostGroupedListProps) {
  const posts: Map<number, Post[]> = new Map();
  props.posts.forEach(post => {
    const year = post.datePublished.getFullYear();
    if (!posts.has(year)) {
      posts.set(year, []);
    }
    posts.get(year)!.push(post);
  });
  const years = Array.from(posts.keys()).sort().reverse();

  return (
    <div className="space-y-8">
      {years.map(year => (
        <PostList key={year} year={year} posts={posts.get(year) || []} />
      ))}
    </div>
  );
}

export interface PostListProps {
  year: number;
  posts: Post[];
}

export function PostList(props: PostListProps) {
  const posts = props.posts.sort((a, b) =>
    compareDesc(a.datePublished, b.datePublished));

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">
        {props.year}
      </h2>
      <ul className="space-y-2">
        {posts.map(post => (
          <PostListItem key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}

export interface PostListItemProps {
  post: Post;
}

export function PostListItem(props: PostListItemProps) {
  return (
    <li className="flex items-center">
      <span className="flex-none text-gray-600 w-24 inline-block text-right mr-4 font-mono">
        {format(props.post.datePublished, "MM/dd")}
      </span>
      <Link href="#" className="flex-1 text-blue-600 truncate">
        {props.post.headline}
      </Link>
    </li>
  );
}
