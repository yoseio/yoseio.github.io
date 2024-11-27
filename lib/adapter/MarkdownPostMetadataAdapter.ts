import { injectable } from "tsyringe";
import { unified } from "unified";
import remarkExtractFrontmatter from "remark-extract-frontmatter";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import YAML from "yaml";

import { type FileMetadata } from "@/lib/model/FileMetadata";
import { type PostMetadata } from "@/lib/model/PostMetadata";
import { type GetPostMetadataPort } from "@/lib/port/GetPostMetadataPort";

@injectable()
export class MarkdownPostMetadataAdapter implements GetPostMetadataPort {
  async getPostMetadata(data: FileMetadata): Promise<PostMetadata> {
    const processor = unified()
      .use(remarkParse)
      .use(remarkStringify)
      .use(remarkFrontmatter, [
        {
          type: "yaml",
          marker: "-",
          anywhere: false,
        },
      ])
      .use(remarkExtractFrontmatter, { yaml: YAML.parse });
    const processed = await processor.process(data.contents);
    return processed.data as unknown as PostMetadata; // TODO: Fix this type cast
  }
}
