import { FileMetadata } from "@/lib/model/FileMetadata";
import { PostMetadata } from "@/lib/model/PostMetadata";

export interface Metadata {
  file: FileMetadata;
  post: PostMetadata;
}
