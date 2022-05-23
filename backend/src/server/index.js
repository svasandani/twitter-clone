import express from "express";
import cors from "cors";

export const buildServer = (Database) => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  const port = 2006;

  app.get("/getAllTweets", (req, res) => {
    res.json(Database.getAllTweets());
  });

  app.get("/getTweetById", (req, res) => {
    const { tweetId } = req.query;

    res.json(Database.getTweetById(tweetId));
  });

  app.get("/likeTweet", (req, res) => {
    const { tweetId } = req.query;

    res.json(Database.likeTweet(tweetId));
  });

  app.get("/unlikeTweet", (req, res) => {
    const { tweetId } = req.query;

    res.json(Database.unlikeTweet(tweetId));
  });

  app.post("/createTweet", (req, res) => {
    const {
      text,
      parent_id
    } = req.body;

    res.json(Database.createTweet({ test, parent_id }));
  })

  return {
    start: () => {
      app.listen(port, () => console.log(`Listening on port ${port}`));
    }
  }
}