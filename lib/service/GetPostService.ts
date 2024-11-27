import { injectable, inject } from "tsyringe";

import { type Post } from "@/lib/model/Post";
import { type GetFileMetadataPort } from "@/lib/port/GetFileMetadataPort";
import { type GetPostMetadataPort } from "@/lib/port/GetPostMetadataPort";

@injectable()
export class GetPostService {
  constructor(
    @inject("GetFileMetadataPort")
    private getFileMetadataPort: GetFileMetadataPort,
    @inject("GetPostMetadataPort")
    private getPostMetadataPort: GetPostMetadataPort,
  ) {}

  async getPost(id: string): Promise<Post> {
    const file = await this.getFileMetadataPort.getFileMetadata(id);
    const post = await this.getPostMetadataPort.getPostMetadata(file);
    return {
      metadata: {
        file,
        post,
      },
    };
  }
}
