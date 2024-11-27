import "reflect-metadata";
import { expect, test } from "vitest";
import { faker } from "@faker-js/faker";

import { FakeFileMetadataAdapter } from "@/lib/adapter/FakeFileMetadataAdapter";
import { MarkdownPostMetadataAdapter } from "@/lib/adapter/MarkdownPostMetadataAdapter";

const ID = "2022-11-alive";

test("getPostMetadata", async () => {
  const POST_METADATA = {
    draft: faker.datatype.boolean(),
  };
  const FILE_METADATA = await new FakeFileMetadataAdapter(
    POST_METADATA,
  ).getFileMetadata(ID);

  const postMetadataAdapter = new MarkdownPostMetadataAdapter();
  const postMetadata = await postMetadataAdapter.getPostMetadata(FILE_METADATA);

  expect(postMetadata).toStrictEqual(POST_METADATA);
});
