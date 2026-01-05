import { z } from 'zod';
import { globalStats } from './schema';

export const api = {
  stats: {
    get: {
      method: 'GET' as const,
      path: '/api/stats',
      responses: {
        200: z.custom<typeof globalStats.$inferSelect>(),
      },
    },
    updateBurn: {
      method: 'POST' as const,
      path: '/api/stats/burn',
      input: z.object({ amount: z.number() }),
      responses: {
        200: z.custom<typeof globalStats.$inferSelect>(),
      },
    },
    submitQuiz: {
      method: 'POST' as const,
      path: '/api/stats/quiz',
      input: z.object({ score: z.number() }),
      responses: {
        200: z.custom<typeof globalStats.$inferSelect>(),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
