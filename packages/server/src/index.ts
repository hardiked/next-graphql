import "dotenv/config";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import { redis } from "./redis";
import cors from "cors";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { UserModel } from "./models/User";
import { createAccessToken, sendRefreshToken } from "./modules/utils/authUtils";
import { createSchema } from "./utils/createSchema";
import connectMongo from "./utils/connectMongoose";

const main = async () => {
  const schema = await createSchema();
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  await connectMongo();

  const app = Express();

  const RedisStore = connectRedis(session);
  app.use(cookieParser());

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: "qid",
      secret: "fsdasdasdsc",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    })
  );

  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.qid;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (error) {
      console.log(error);
      return res.send({ ok: false, accessToken: "" });
    }

    // token is valid and we can send back new access token
    const user = await UserModel.findById(payload.userId);
    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    if (user.version !== payload.version) {
      return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshToken(res, user);

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () =>
    console.log("🚀 Server started on http://localhost:4000/graphql")
  );
};

main();
