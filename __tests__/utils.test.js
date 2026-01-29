const {
  createRef,
  updateComments,
} = require("/home/yerayafonso/Northcoders/backend/nc-news-BE/db/seeds/utils.js");

describe("createRef()", () => {
  test("Returns an object", () => {
    expect(typeof createRef([], "", "")).toBe("object");
    expect(Array.isArray(createRef([], "", ""))).toBe(false);
  });
  test("Returns a new object with new key/value pair", () => {
    const employees = [{ author: "Rose", id: "dS8rJns" }];

    expect(createRef(employees, "author", "id")).not.toEqual({
      author: "Rose",
      id: "dS8rJns",
    });
  });
  test("Returns a new object with new key that matches the second argument of function", () => {
    const employees = [
      { author: "Rose", id: "dS8rJns" },
      { author: "David", id: "og8r0nV" },
    ];

    expect(createRef(employees, "author", "id")).toHaveProperty("Rose");
    expect(createRef(employees, "author", "id")).toHaveProperty("David");
  });
  test("Returns a new object mapping the value of one property to another", () => {
    const employees = [
      { author: "Rose", id: "dS8rJns", secretFear: "spiders" },
      { author: "Simon", id: "Pk34ABs", secretFear: "mice" },
      { author: "Jim", id: "lk1ff8s", secretFear: "bears" },
      { author: "David", id: "og8r0nV", secretFear: "Rose" },
    ];

    expect(createRef(employees, "author", "id")).toEqual({
      Rose: "dS8rJns",
      Simon: "Pk34ABs",
      Jim: "lk1ff8s",
      David: "og8r0nV",
    });
    expect(createRef(employees, "author", "secretFear")).toEqual({
      Rose: "spiders",
      Simon: "mice",
      Jim: "bears",
      David: "Rose",
    });
  });
});

describe("updateComments()", () => {
  test("returns an array", () => {
    expect(Array.isArray(updateComments([], {}))).toBe(true);
  });
  test("returns an array of the same length as the input", () => {
    const albums = [
      { author: "person1", article_title: "title1", releaseYear: 2019 },
      { author: "person2", article_title: "title2", releaseYear: 1975 },
    ];
    expect(updateComments([], {}).length).toBe(0);
    expect(updateComments(albums, {}).length).toBe(2);
  });

  test("returns an array of objects without the article_title property", () => {
    const albums = [
      { author: "person1", article_title: "title1", releaseYear: 2019 },
      { author: "person2", article_title: "title2", releaseYear: 1975 },
    ];
    const output = updateComments(albums, {});
    expect(output[0]).not.toHaveProperty("article_title");
    expect(output[1]).not.toHaveProperty("article_title");
  });
  test("returns an array of objects with the article_id property", () => {
    const albums = [
      { author: "person1", article_title: "title1", releaseYear: 2019 },
      { author: "person2", article_title: "title2", releaseYear: 1975 },
    ];
    const output = updateComments(albums, {});
    expect(output[0]).toHaveProperty("article_id");
    expect(output[1]).toHaveProperty("article_id");
  });
  test("returns an array of objects with the article_title swapped for article_id and maintaining the order", () => {
    const albums = [
      { author: "person1", article_title: "title1", releaseYear: 2019 },
      { author: "person2", article_title: "title2", releaseYear: 1975 },
    ];
    const artistIdReference = {
      title1: 9923,
      title2: 324,
    };
    const output = updateComments(albums, artistIdReference);

    expect(output).toEqual([
      { author: "person1", article_id: 9923, releaseYear: 2019 },
      { author: "person2", article_id: 324, releaseYear: 1975 },
    ]);
  });
  test("doesn't mutate the original array", () => {
    const albums = [
      { author: "person1", article_title: "title1", releaseYear: 2019 },
      { author: "person2", article_title: "title2", releaseYear: 1975 },
    ];
    const output = updateComments(albums, {});
    expect(output).not.toEqual(albums);
  });
});
