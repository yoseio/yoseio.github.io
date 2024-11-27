import { FileMetadata } from "@/lib/model/FileMetadata";
import { PostMetadata } from "@/lib/model/PostMetadata";

export interface GetPostMetadataPort {
  getPostMetadata(data: FileMetadata): Promise<PostMetadata>;
}
