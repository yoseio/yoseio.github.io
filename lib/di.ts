import "reflect-metadata";
import { container } from "tsyringe";

import { GitHubFileMetadataAdapter } from "@/lib/adapter/GitHubFileMetadataAdapter";
import { GitHubListPostsAdapter } from "@/lib/adapter/GitHubListPostsAdapter";
import { MarkdownPostMetadataAdapter } from "@/lib/adapter/MarkdownPostMetadataAdapter";
import { GetPostService } from "@/lib/service/GetPostService";
import { GetPostsService } from "@/lib/service/GetPostsService";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";

container.register("GetFileMetadataPort", {
  useValue: new GitHubFileMetadataAdapter(GITHUB_TOKEN),
});
container.register("GetPostMetadataPort", {
  useValue: new MarkdownPostMetadataAdapter(),
});
container.register("ListPostsPort", {
  useValue: new GitHubListPostsAdapter(GITHUB_TOKEN),
});
container.register("GetPostService", GetPostService);
container.register("GetPostsService", GetPostsService);

export { container };
