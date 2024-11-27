import Link from "next/link";
import { format } from "date-fns";

import { Post } from "@/lib/model/Post";

export interface PostGroupedListProps {
  posts: Map<number, Post[]>;
}

export async function PostGroupedList(props: PostGroupedListProps) {
  const years = Array.from(props.posts.keys()).sort().reverse();

  return (
    <div className="space-y-8">
      {years.map((year) => (
        <PostList key={year} year={year} posts={props.posts.get(year) || []} />
      ))}
    </div>
  );
}

export interface PostListProps {
  year: number;
  posts: Post[];
}

export function PostList(props: PostListProps) {
  return (
    <div>
      <h2 className="text-lg font-bold mb-2">{props.year}</h2>
      <ul className="space-y-2">
        {props.posts.map((post) => (
          <PostListItem key={post.identifier} post={post} />
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
        {format(props.post.dateCreated, "MM/dd")}
      </span>
      <Link href="#" className="flex-1 text-blue-600 truncate">
        {props.post.headline}
      </Link>
    </li>
  );
}
