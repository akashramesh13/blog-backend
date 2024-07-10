import { Redis } from "ioredis";
import RedisStore from "connect-redis";

const redisClient = new Redis({
  host: "localhost",
  port: 6379,
});

export const redisStore = new RedisStore({ client: redisClient });
