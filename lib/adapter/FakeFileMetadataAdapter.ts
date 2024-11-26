import { faker } from "@faker-js/faker";

import { FileMetadata } from "@/lib/model/FileMetadata";
import { GetFileMetadataPort } from "@/lib/port/GetFileMetadataPort";

export class FakeFileMetadataAdapter implements GetFileMetadataPort {
  async getFileMetadata(id: string): Promise<FileMetadata> {
    return {
      id,
      contents: faker.lorem.paragraphs(),
      dateCreated: faker.date.past(),
      dateModified: faker.date.recent(),
    };
  }
}
