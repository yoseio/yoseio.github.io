import { injectable, inject } from "tsyringe";

import { type Metadata } from "@/lib/model/Metadata";
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

  private async getMetadata(id: string): Promise<Metadata> {
    const file = await this.getFileMetadataPort.getFileMetadata(id);
    const post = await this.getPostMetadataPort.getPostMetadata(file);
    return {
      file,
      post,
    };
  }

  async getPost(id: string): Promise<Post> {
    const metadata = await this.getMetadata(id);
    return {
      articleBody: metadata.file.contents,
      dateCreated: metadata.file.dateCreated,
      dateModified: metadata.file.dateModified,
      headline: metadata.post.headline,
      identifier: id,
    };
  }
}
