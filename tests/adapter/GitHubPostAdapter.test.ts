import "reflect-metadata";
import { expect, test } from "vitest";
import { GitHubFileMetadataAdapter } from "@/lib/adapter/GitHubFileMetadataAdapter";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
const ID = "2022-11-alive";

test("getFileMetadata", async () => {
  const fileMetadataAdapter = new GitHubFileMetadataAdapter(GITHUB_TOKEN);
  const fileMetadata = await fileMetadataAdapter.getFileMetadata(ID);

  expect(fileMetadata.dateCreated).toEqual(
    new Date("2024-11-26T09:29:03.000Z"),
  );
  expect(fileMetadata.dateModified).toEqual(
    new Date("2024-11-26T16:43:36.000Z"),
  );
});
