import { pgTable, text, serial, integer, timestamp, boolean, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const globalStats = pgTable("global_stats", {
  id: serial("id").primaryKey(),
  totalEthBurned: real("total_eth_burned").default(0),
  totalQuizzesTaken: integer("total_quizzes_taken").default(0),
  perfectScores: integer("perfect_scores").default(0),
});

export const insertGlobalStatsSchema = createInsertSchema(globalStats);
export type GlobalStats = typeof globalStats.$inferSelect;
export type InsertGlobalStats = z.infer<typeof insertGlobalStatsSchema>;

// Request types
export type UpdateBurnRequest = { amount: number };
export type SubmitQuizRequest = { score: number };
export type StatsResponse = GlobalStats;
