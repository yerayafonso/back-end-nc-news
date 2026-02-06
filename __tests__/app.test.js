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

  test("GET 200 - Responds with array of article objects based on sort_by query", () => {
    return request(app)
      .get("/api/articles?sort_by=author")
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
        expect(body[0].author >= body[1].author).toBe(true);
      });
  });

  test("GET 200 - Responds with array of article objects based on order query", () => {
    return request(app)
      .get("/api/articles?order=asc")
      .expect(200)
      .then(({ body }) => {
        expect(
          Date.parse(body[0].created_at) < Date.parse(body[1].created_at),
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

  test("GET 404 - Responds with error message if article doesn't exist", () => {
    return request(app)
      .get("/api/articles/50")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "ID not found" });
      });
  });

  test("GET 200 - Responds with array of comment objects", () => {
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
  test("GET 404 - Responds with error message", () => {
    return request(app)
      .get("/api/articles/4/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Article doesn't have comments" });
      });
  });
  describe("Invalid Methods", () => {
    test("405: Responds with message", () => {
      const invalidMethods = ["delete", "post"];

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

  describe("POST /api/articles/:article_id/comments", () => {
    test("201: Responds with the new comment object", () => {
      return request(app)
        .post("/api/articles/3/comments")
        .send({
          username: "butter_bridge",
          body: "Random text",
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.comment_id).toBeNumber();
          expect(body.votes).toBeNumber();
          expect(body.created_at).toBeString();
          expect(body.author).toBeString();
          expect(body.body).toBeString();
          expect(body.article_id).toBeNumber();
        });
    });

    test("404: Responds with error message", () => {
      return request(app)
        .post("/api/articles/25/comments")
        .send({
          username: "butter_bridge",
          body: "Random text",
        })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("ID not found");
        });
    });
  });

  describe("PATCH /api/articles/:article_id", () => {
    test("200: Responds with the updated article object", async () => {
      const currentVotes = await db.query(
        `SELECT votes FROM articles WHERE article_id=3`,
      );

      return request(app)
        .patch("/api/articles/3")
        .send({
          inc_votes: 35,
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.votes).toBeNumber();
          expect(body.votes).toBe(currentVotes.rows[0].votes + 35);
        });
    });

    test("404: Responds with error message", () => {
      return request(app)
        .patch("/api/articles/20")
        .send({
          inc_votes: 35,
        })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("ID not found");
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
          expect(users.username).toBeString();
          expect(users.name).toBeString();
          expect(users.avatar_url).toBeString();
        });
      });
  });
});

describe("/api/comments/:comment_id", () => {
  test("204: Deletes comment by ID", () => {
    return request(app)
      .delete("/api/comments/2")
      .expect(204)
      .then(({ noContent }) => {
        expect(noContent).toBe(true);
      });
  });
  test("404: Responds with error message if ID is not available to delete", () => {
    return request(app)
      .delete("/api/comments/50")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("ID not found");
      });
  });
});
