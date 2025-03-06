import { IdGen } from "@/utils/IdGenerator";
test("Util.IdGenerator.IdGen.NotEmpty", async () => {
  var result = IdGen.create({
    hasNumber: true,
    length: 10,
  });
  expect(result).not.toBeNull();
  expect(result.length).toBeGreaterThan(0);
  expect(result.length).toEqual(10);
});
