import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export const ratelimit = {
  post: new Ratelimit({
    redis,
    analytics: true,
    prefix: "ratelimit:post",
    limiter: Ratelimit.slidingWindow(1, "30s"),
  }),
  comment: new Ratelimit({
    redis,
    analytics: true,
    prefix: "ratelimit:comment",
    limiter: Ratelimit.slidingWindow(1, "10s"),
  }),
  notification: new Ratelimit({
    redis,
    analytics: true,
    prefix: "ratelimit:like",
    limiter: Ratelimit.slidingWindow(2, "10s"),
  }),
};
