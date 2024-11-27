import { graphql } from "@octokit/graphql";
import { injectable } from "tsyringe";
import { Repository, Tree } from "@octokit/graphql-schema";

import { ListPostsPort } from "@/lib/port/ListPostsPort";

@injectable()
export class GitHubListPostsAdapter implements ListPostsPort {
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

  async listPosts(): Promise<string[]> {
    const listPostsQuery = `
      query ($owner: String!, $repo: String!, $expression: String!) {
        repository(owner: $owner, name: $repo) {
          object(expression: $expression) {
            ... on Tree {
              entries {
                name
                type
              }
            }
          }
        }
      }
    `;

    const listPosts = await this.graphqlWithAuth<{
      repository: Repository;
    }>(listPostsQuery, {
      owner: this.owner,
      repo: this.repo,
      expression: `main:${this.path}`,
    });

    if (listPosts.repository.object) {
      const object = listPosts.repository.object as Tree;
      if (object.entries) {
        return object.entries
          .filter((entry) => entry.type === "blob")
          .filter((entry) => entry.name.endsWith(".md"))
          .map((entry) => entry.name.slice(0, -3));
      }
    }

    throw new Error("Failed to fetch Posts");
  }
}
