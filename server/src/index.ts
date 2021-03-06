import { AnswerResolver } from "./resolvers/AnswerResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { QuestionResolver } from "./resolvers/QuestionResolver";
import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import cors from "cors";
import { verify } from "jsonwebtoken";
import { User } from "./entities/User";
import { sendRefreshToken } from "./sendRefreshToken";
import { createAccessToken, createRefreshToken } from "./auth";
(async () => {
  const app = express();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true
    })
  );
  await createConnection();
  app.use(cookieParser());
  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any = null;
    try {
      payload = verify(token, "secret-key");
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }

    // token is valid and
    // we can send back an access token
    const user = await User.findOne({ id: payload.userId });

    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [QuestionResolver, UserResolver, AnswerResolver]
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("express server started at localhost:4000");
  });
})();
