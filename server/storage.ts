import { globalStats, type GlobalStats, type InsertGlobalStats } from "@shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";

export interface IStorage {
  getStats(): Promise<GlobalStats>;
  updateBurn(amount: number): Promise<GlobalStats>;
  submitQuizScore(score: number): Promise<GlobalStats>;
}

export class DatabaseStorage implements IStorage {
  async getStats(): Promise<GlobalStats> {
    const [stats] = await db.select().from(globalStats).limit(1);
    if (!stats) {
      const [newStats] = await db.insert(globalStats).values({}).returning();
      return newStats;
    }
    return stats;
  }

  async updateBurn(amount: number): Promise<GlobalStats> {
    let stats = await this.getStats();
    const [updated] = await db
      .update(globalStats)
      .set({
        totalEthBurned: sql`${globalStats.totalEthBurned} + ${amount}`,
      })
      .where(eq(globalStats.id, stats.id))
      .returning();
    return updated;
  }

  async submitQuizScore(score: number): Promise<GlobalStats> {
    let stats = await this.getStats();
    const isPerfect = score >= 10 ? 1 : 0;
    const [updated] = await db
      .update(globalStats)
      .set({
        totalQuizzesTaken: sql`${globalStats.totalQuizzesTaken} + 1`,
        perfectScores: sql`${globalStats.perfectScores} + ${isPerfect}`,
      })
      .where(eq(globalStats.id, stats.id))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
