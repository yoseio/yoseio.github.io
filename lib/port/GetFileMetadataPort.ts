import { FileMetadata } from "@/lib/model/FileMetadata";

export interface GetFileMetadataPort {
  getFileMetadata(id: string): Promise<FileMetadata>;
}
