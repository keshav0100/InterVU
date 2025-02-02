-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "mockInterview" (
	"id" serial PRIMARY KEY NOT NULL,
	"jsonMockResp" text NOT NULL,
	"jobPosition" varchar NOT NULL,
	"jobDesc" varchar NOT NULL,
	"jobExperience" varchar NOT NULL,
	"createdBy" varchar NOT NULL,
	"createdAt" varchar NOT NULL,
	"mockId" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userAnswer" (
	"id" serial PRIMARY KEY NOT NULL,
	"mockId" varchar NOT NULL,
	"question" text NOT NULL,
	"userAnswer" text,
	"feedback" text,
	"rating" varchar,
	"userEmail" varchar,
	"createdAt" varchar
);

*/