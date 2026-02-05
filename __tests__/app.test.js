const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const request = require("supertest");
const app = require("../app");

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("Invalid endpoint", () => {
  test("404: Responds with a message when path is not found", () => {
    return request(app)
      .get("/api/invalid-path")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Path not found");
      });
  });
});

describe("/api/topics", () => {
  test("GET 200 - Responds with array of topic objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        body.forEach((topic) => {
          expect(topic.slug).toBeString();
          expect(topic.description).toBeString();
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
          expect(article.author).toBeString();
          expect(article.title).toBeString();
          expect(article.article_id).toBeNumber();
          expect(article.topic).toBeString();
          expect(article.created_at).toBeString();
          expect(article.votes).toBeNumber();
          expect(article.article_img_url).toBeString();
          expect(article.comment_count).toBeNumber();
        });
        expect(
          Date.parse(body[0].created_at) > Date.parse(body[1].created_at),
        ).toBe(true);
      });
  });
});

describe("/api/articles/:article_id", () => {
  test("GET 200 - Responds with single article object", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.author).toBeString();
        expect(body.title).toBeString();
        expect(body.article_id).toBe(1);
        expect(body.article_id).toBeNumber();
        expect(body.topic).toBeString();
        expect(body.created_at).toBeString();
        expect(body.votes).toBeNumber();
        expect(body.article_img_url).toBeString();
      });
  });

  test("GET 404 - Responds with error message", () => {
    return request(app)
      .get("/api/articles/50")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "ID not found" });
      });
  });

  test("GET 200 - Responds with array of article objects", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        body.forEach((comment) => {
          expect(comment.comment_id).toBeNumber();
          expect(comment.votes).toBeNumber();
          expect(comment.created_at).toBeString();
          expect(comment.author).toBeString();
          expect(comment.body).toBeString();
          expect(comment.article_id).toBeNumber();
        });
        expect(
          Date.parse(body[0].created_at) > Date.parse(body[1].created_at),
        ).toBe(true);
      });
  });

  test("GET 404 - Responds with error message", () => {
    return request(app)
      .get("/api/articles/50/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "ID not found" });
      });
  });
  describe("Invalid Methods", () => {
    test("405: Responds with message", () => {
      const invalidMethods = ["delete", "post", "patch"];

      const requests = invalidMethods.map((method) => {
        return request(app)
          [method]("/api/articles/2")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).toBe("Method not allowed");
          });
      });

      return Promise.all(requests);
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
          expect(users.username).toBeString();
          expect(users.name).toBeString();
          expect(users.avatar_url).toBeString();
        });
      });
  });
});
