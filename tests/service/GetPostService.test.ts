import "reflect-metadata";
import { expect, test } from "vitest";
import { container } from "tsyringe";

import { GitHubFileMetadataAdapter } from "@/lib/adapter/GitHubFileMetadataAdapter";
import { MarkdownPostMetadataAdapter } from "@/lib/adapter/MarkdownPostMetadataAdapter";
import { GetPostService } from "@/lib/service/GetPostService";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
const ID = "2022-11-alive";

container.register("GetFileMetadataPort", {
  useValue: new GitHubFileMetadataAdapter(GITHUB_TOKEN),
});
container.register("GetPostMetadataPort", {
  useValue: new MarkdownPostMetadataAdapter(),
});

test("getPost", async () => {
  const getPostService = container.resolve(GetPostService);
  const post = await getPostService.getPost(ID);

  expect(post.metadata.post.draft).toBeTruthy();
});
