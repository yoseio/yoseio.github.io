import { faker } from "@faker-js/faker";
import { injectable } from "tsyringe";
import YAML from "yaml";

import { type FileMetadata } from "@/lib/model/FileMetadata";
import { type PostMetadata } from "@/lib/model/PostMetadata";
import { type GetFileMetadataPort } from "@/lib/port/GetFileMetadataPort";

@injectable()
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
