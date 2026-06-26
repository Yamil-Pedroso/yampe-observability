import { measure } from "./index";

const result = await measure("fake-delay", async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return "done";
});

console.log(result);
