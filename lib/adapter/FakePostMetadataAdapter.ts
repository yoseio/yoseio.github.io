import { faker } from "@faker-js/faker";

import { FileMetadata } from "@/lib/model/FileMetadata";
import { PostMetadata } from "@/lib/model/PostMetadata";
import { GetPostMetadataPort } from "@/lib/port/GetPostMetadataPort";

export class FakePostMetadataAdapter implements GetPostMetadataPort {
  async getPostMetadata(_data: FileMetadata): Promise<PostMetadata> {
    return {
      draft: faker.datatype.boolean(),
    };
  }
}
