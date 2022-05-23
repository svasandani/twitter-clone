import Tweets from "./tweets.json" assert {type: "json"};

export const buildDatabase = () => {
  let uuid = 0;
  const tweets = new Map();
  const children = new Map();

  Tweets.forEach(tweet => {
    if (tweet.id >= uuid) uuid = tweet.id + 1;

    tweets.set(""+tweet.id, tweet);

    if (!tweet.parent_id) return;
    const stringifiedParentId = ""+tweet.parent_id;
    const childrenArray = children.get(stringifiedParentId);
    if (childrenArray) {
      childrenArray.push(tweet);
    } else {
      children.set(stringifiedParentId, [ tweet ]);
    }
  });

  return {
    getAllTweets: () => Array.from(tweets.values()).map(tweet => ({
      ...tweet,
      comments: children.get(""+tweet.id)?.length ?? 0,
    })).sort((a, b) => b.id - a.id),
    getTweetById: (id) => {
      const tweet = tweets.get(id);
      if (tweet) {
        return {
          ...tweet,
          comments: (children.get(""+tweet.id) ?? []).map(tweet => ({
            ...tweet,
            comments: children.get(""+tweet.id)?.length ?? 0,
          })),
        }
      }

      return tweet;
    },
    likeTweet: (id) => {
      const tweet = tweets.get(id);
      if (tweet && tweet.likes && !tweet.likes.includes(999)) {
        tweet.likes.push(999);
      }
    },
    unlikeTweet: (id) => {
      const tweet = tweets.get(id);
      if (tweet && tweet.likes && tweet.likes.includes(999)) {
        tweet.likes = tweet.likes.filter(el => el !== 999);
      }
    },
    createTweet: ({ text, parent_id }) => {
      const tweet = {
        id: uuid,
        author_id: 999,
        text,
        likes: [],
        parent_id,
      };

      if (parent_id) {
        const stringifiedParentId = ""+parent_id;
        const childrenArray = children.get(stringifiedParentId);
        if (childrenArray) {
          childrenArray.push(tweet);
        } else {
          children.set(stringifiedParentId, [ tweet ]);
        }
      }

      tweets.set(uuid, tweet);
      uuid++;
    }
  }
}