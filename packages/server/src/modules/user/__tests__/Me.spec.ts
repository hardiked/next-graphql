import { callMeResolver } from "../test-utils/callMeResolver";

describe("#MeResolver", () => {
  it("returns error when token is not valid", async () => {
    const response = await callMeResolver("snajsnxas");
    expect(response).toEqual({
      data: {
        me: {
          error: [
            {
              path: "user",
              message: "You are not authenticated to perform this action",
            },
          ],
        },
      },
    });
  });

  it("returns null when no token is passed", async () => {
    const response = await callMeResolver();
    expect(response).toEqual({
      data: {
        me: {
          error: [
            {
              path: "user",
              message: "You are not authenticated to perform this action",
            },
          ],
        },
      },
    });
  });
});
