import "reflect-metadata";
import { expect, test } from "vitest";
import { GitHubListPostsAdapter } from "@/lib/adapter/GitHubListPostsAdapter";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";

test("listPosts", async () => {
  const listPostsAdapter = new GitHubListPostsAdapter(GITHUB_TOKEN);
  const listPosts = await listPostsAdapter.listPosts();

  expect(listPosts).toEqual(["2022-11-alive"]);
});
