export interface ListPostsPort {
  listPosts(): Promise<string[]>;
}
