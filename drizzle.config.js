/**@type { import ("drizzle-kit").Config }*/
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:TBDqFmRZ9cA7@ep-sweet-surf-a56pspgn.us-east-2.aws.neon.tech/mockInterview?sslmode=require",
  },
};
