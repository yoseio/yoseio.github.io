import { type FileMetadata } from "@/lib/model/FileMetadata";
import { type PostMetadata } from "@/lib/model/PostMetadata";

export interface GetPostMetadataPort {
  getPostMetadata(data: FileMetadata): Promise<PostMetadata>;
}
