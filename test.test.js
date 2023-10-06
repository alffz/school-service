import { reducer } from "./reduce.js";

function sum(a, b) {
  return a + b;
}

test("add 1+2 =3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("reduce 2-2 = 0", () => {
  expect(reducer(2, 2)).toBe(0);
});
