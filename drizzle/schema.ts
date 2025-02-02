import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const mockInterview = pgTable("mockInterview", {
	id: serial().primaryKey().notNull(),
	jsonMockResp: text().notNull(),
	jobPosition: varchar().notNull(),
	jobDesc: varchar().notNull(),
	jobExperience: varchar().notNull(),
	createdBy: varchar().notNull(),
	createdAt: varchar().notNull(),
	mockId: varchar().notNull(),
});

export const userAnswer = pgTable("userAnswer", {
	id: serial().primaryKey().notNull(),
	mockId: varchar().notNull(),
	question: text().notNull(),
	userAnswer: text(),
	feedback: text(),
	rating: varchar(),
	userEmail: varchar(),
	createdAt: varchar(),
});
