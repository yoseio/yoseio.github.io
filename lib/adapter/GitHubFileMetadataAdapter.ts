import { graphql } from "@octokit/graphql";
import { Blob, Commit, Repository } from "@octokit/graphql-schema";

import { FileMetadata } from "@/lib/model/FileMetadata";
import { GetFileMetadataPort } from "@/lib/port/GetFileMetadataPort";

export class GitHubFileMetadataAdapter implements GetFileMetadataPort {
  private graphqlWithAuth: typeof graphql;
  // TODO: get values from environment variables
  private owner = "yoseio";
  private repo = "yoseio";
  private path = "blogs";

  constructor(token: string) {
    this.graphqlWithAuth = graphql.defaults({
      headers: {
        authorization: `token ${token}`,
      },
    });
  }

  private async fetchEndCursor(id: string): Promise<string> {
    const fetchEndCursorQuery = `
      query ($owner: String!, $repo: String!, $path: String!) {
        repository(owner: $owner, name: $repo) {
          ref(qualifiedName: "refs/heads/main") {
            target {
              ... on Commit {
                history(path: $path) {
                  pageInfo {
                    endCursor
                  }
                }
              }
            }
          }
        }
      }
    `;

    const fetchEndCursor = await this.graphqlWithAuth<{
      repository: Repository;
    }>(fetchEndCursorQuery, {
      owner: this.owner,
      repo: this.repo,
      path: `${this.path}/${id}.md`,
    });

    if (fetchEndCursor.repository.ref?.target) {
      const target = fetchEndCursor.repository.ref.target as Commit;
      if (target.history.pageInfo.endCursor) {
        const cursor = target.history.pageInfo.endCursor;
        const items = cursor.split(" ");
        return `${items[0]} ${parseInt(items[1]) + 1}`;
      }
    }

    throw new Error("Failed to fetch EndCursor");
  }

  private async fetchContents(id: string): Promise<string> {
    const fetchContentsQuery = `
      query ($owner: String!, $repo: String!, $path: String!) {
        repository(owner: $owner, name: $repo) {
          ref(qualifiedName: "refs/heads/main") {
            target {
              ... on Commit {
                history(first: 1, path: $path) {
                  edges {
                    node {
                      file(path: $path) {
                        object {
                          ... on Blob {
                            text
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const fetchContents = await this.graphqlWithAuth<{
      repository: Repository;
    }>(fetchContentsQuery, {
      owner: this.owner,
      repo: this.repo,
      path: `${this.path}/${id}.md`,
    });

    if (fetchContents.repository.ref?.target) {
      const target = fetchContents.repository.ref.target as Commit;
      if (target.history.edges) {
        const object = target.history.edges[0]?.node?.file?.object as Blob;
        if (object.text) {
          return object.text;
        }
      }
    }

    throw new Error("Failed to fetch Contents");
  }

  private async fetchDateCreated(id: string, cursor: string): Promise<Date> {
    const fetchDateCreatedQuery = `
      query ($owner: String!, $repo: String!, $path: String!, $cursor: String!) {
        repository(owner: $owner, name: $repo) {
          ref(qualifiedName: "refs/heads/main") {
            target {
              ... on Commit {
                history(last: 1, path: $path, before: $cursor) {
                  edges {
                    node {
                      committedDate
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const fetchDateCreated = await this.graphqlWithAuth<{
      repository: Repository;
    }>(fetchDateCreatedQuery, {
      owner: this.owner,
      repo: this.repo,
      path: `${this.path}/${id}.md`,
      cursor,
    });

    if (fetchDateCreated.repository.ref?.target) {
      const target = fetchDateCreated.repository.ref.target as Commit;
      if (target.history.edges) {
        const committedDate = target.history.edges[0]?.node?.committedDate;
        if (committedDate) {
          return new Date(committedDate);
        }
      }
    }

    throw new Error("Failed to fetch DateCreated");
  }

  private async fetchDateModified(id: string): Promise<Date> {
    const fetchDateModifiedQuery = `
      query ($owner: String!, $repo: String!, $path: String!) {
        repository(owner: $owner, name: $repo) {
          ref(qualifiedName: "refs/heads/main") {
            target {
              ... on Commit {
                history(first: 1, path: $path) {
                  edges {
                    node {
                      committedDate
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const fetchDateModified = await this.graphqlWithAuth<{
      repository: Repository;
    }>(fetchDateModifiedQuery, {
      owner: this.owner,
      repo: this.repo,
      path: `${this.path}/${id}.md`,
    });

    if (fetchDateModified.repository.ref?.target) {
      const target = fetchDateModified.repository.ref.target as Commit;
      if (target.history.edges) {
        const committedDate = target.history.edges[0]?.node?.committedDate;
        if (committedDate) {
          return new Date(committedDate);
        }
      }
    }

    throw new Error("Failed to fetch DateModified");
  }

  async getFileMetadata(id: string): Promise<FileMetadata> {
    const cursor = await this.fetchEndCursor(id);
    const contents = await this.fetchContents(id);
    const dateCreated = await this.fetchDateCreated(id, cursor);
    const dateModified = await this.fetchDateModified(id);

    const fileMetadata: FileMetadata = {
      id,
      contents,
      dateCreated,
      dateModified,
    };

    return fileMetadata;
  }
}
