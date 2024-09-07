import { faker } from '@faker-js/faker';

// https://schema.org/BlogPosting
export interface Post {
  id: string;
  headline: string;
  datePublished: Date;
  dateModified: Date;
}

export const createFakePost = (): Post => ({
  id: faker.string.uuid(),
  headline: faker.lorem.sentence(),
  datePublished: faker.date.past(),
  dateModified: faker.date.recent(),
});

export const createFakePosts = (count?: number): Post[] =>
  faker.helpers.multiple(createFakePost, { count });
