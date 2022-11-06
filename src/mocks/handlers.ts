import { rest } from "msw";

const LOGIN_USER_ID = 1001;
const LOGIN_USER_EMAIL = "uprock@mail.com";
const LOGIN_USER_PASSWORD = "121212";
const RESPONSE_DELAY = 1_000;

export const handlers = [
  rest.post("/login", async (req, res) => {
    const { email, password } = await req.json();
    if (email !== LOGIN_USER_EMAIL || password !== LOGIN_USER_PASSWORD) {
      return res((res) => {
        res.status = 401;
        res.body = JSON.stringify({
          reason: "The email address or password is incorrect.",
        });
        res.headers.set("Content-Type", "application/json;charset=utf-8");
        res.delay = RESPONSE_DELAY;
        return res;
      });
    }

    return res((res) => {
      res.status = 200;
      res.body = JSON.stringify({
        id: LOGIN_USER_ID,
      });
      res.headers.set("Content-Type", "application/json;charset=utf-8");
      res.delay = RESPONSE_DELAY;
      return res;
    });
  }),
  rest.get("/profiles/:userId", async (req, res) => {
    const { userId } = req.params;
    return res((res) => {
      res.status = 200;
      res.body = JSON.stringify({
        id: userId,
        email: LOGIN_USER_EMAIL,
        name: "Vanda",
        secondName: "Kahovski",
        geo: "Canada, Vancouver",
        profession: "Designer",
        "Total Projects": 32,
      });
      res.headers.set("Content-Type", "application/json;charset=utf-8");
      res.delay = RESPONSE_DELAY * 3;
      return res;
    });
  }),
];
