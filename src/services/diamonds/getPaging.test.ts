import { GetDiamondPaging } from "./getPaging";
test("Customer.GetPaging.Return.Result", async () => {
  var result = await GetDiamondPaging(false, {});
  expect(result.isSuccess).toBeTruthy();
  expect(result.data).not.toBeNull();
}, 199999);
