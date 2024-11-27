import { faker } from "@faker-js/faker";
import YAML from "yaml";

import { FileMetadata } from "@/lib/model/FileMetadata";
import { PostMetadata } from "@/lib/model/PostMetadata";
import { GetFileMetadataPort } from "@/lib/port/GetFileMetadataPort";

export class FakeFileMetadataAdapter implements GetFileMetadataPort {
  constructor(private postMetadata?: PostMetadata) {}

  async getFileMetadata(id: string): Promise<FileMetadata> {
    // TODO: Fix this indentation
    const contents = `---
${YAML.stringify(this.postMetadata)}
---

${faker.lorem.paragraphs()}
`;

    return {
      id,
      contents,
      dateCreated: faker.date.past(),
      dateModified: faker.date.recent(),
    };
  }
}
