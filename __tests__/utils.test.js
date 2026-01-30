const {
  createRef,
} = require("/home/yerayafonso/Northcoders/backend/nc-news-BE/db/seeds/utils.js");

describe("createRef()", () => {
  test("Returns an object", () => {
    expect(typeof createRef([], "", "")).toBe("object");
    expect(Array.isArray(createRef([], "", ""))).toBe(false);
  });
  test("Returns an empty object for an empty array", () => {
    expect(createRef([], "author", "id")).toEqual({});
  });
  test("Returns a new object with new key/value pair", () => {
    const employees = [{ author: "Rose", id: "dS8rJns" }];

    expect(createRef(employees, "author", "id")).not.toEqual({
      author: "Rose",
      id: "dS8rJns",
    });
    expect(createRef(employees, "author", "id")).toEqual({
      Rose: "dS8rJns",
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
