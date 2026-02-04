const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const request = require("supertest");
const app = require("../app");

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("/api/topics", () => {
  test("GET 200 - Responds with array of topic objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        body.forEach((topic) => {
          expect(topic).toHaveProperty("slug");
          expect(typeof topic.slug).toBe("string");
          expect(topic).toHaveProperty("description");
          expect(typeof topic.description).toBe("string");
        });
      });
  });
});

describe("/api/articles", () => {
  test("GET 200 - Responds with array of article objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        body.forEach((article) => {
          expect(article).toHaveProperty("author");
          expect(typeof article.author).toBe("string");
          expect(article).toHaveProperty("title");
          expect(typeof article.title).toBe("string");
          expect(article).toHaveProperty("article_id");
          expect(typeof article.article_id).toBe("number");
          expect(article).toHaveProperty("topic");
          expect(typeof article.topic).toBe("string");
          expect(article).toHaveProperty("created_at");
          expect(typeof article.created_at).toBe("string");
          expect(article).toHaveProperty("votes");
          expect(typeof article.votes).toBe("number");
          expect(article).toHaveProperty("article_img_url");
          expect(typeof article.article_img_url).toBe("string");
          expect(article).toHaveProperty("comment_count");
          expect(typeof article.comment_count).toBe("string");
        });
      });
  });
});

describe("/api/users", () => {
  test("GET 200 - Responds with array of user objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        body.forEach((users) => {
          expect(users).toHaveProperty("username");
          expect(typeof users.username).toBe("string");
          expect(users).toHaveProperty("name");
          expect(typeof users.name).toBe("string");
          expect(users).toHaveProperty("avatar_url");
          expect(typeof users.avatar_url).toBe("string");
        });
      });
  });
});
