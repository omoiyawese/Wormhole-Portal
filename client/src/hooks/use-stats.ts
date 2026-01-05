import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { globalStats } from "@shared/schema";
import { z } from "zod";

export function useStats() {
  return useQuery({
    queryKey: [api.stats.get.path],
    queryFn: async () => {
      const res = await fetch(api.stats.get.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch stats");
      // The API returns a single object, but we might need to handle empty init state if needed
      // Assuming backend always returns the row
      return api.stats.get.responses[200].parse(await res.json());
    },
    refetchInterval: 10000, // Refresh stats every 10s to see others' contributions
  });
}

export function useBurnSimulator() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (amount: number) => {
      const res = await fetch(api.stats.updateBurn.path, {
        method: api.stats.updateBurn.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to record burn");
      return api.stats.updateBurn.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.stats.get.path] });
    },
  });
}

export function useSubmitQuiz() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (score: number) => {
      const res = await fetch(api.stats.submitQuiz.path, {
        method: api.stats.submitQuiz.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to submit quiz");
      return api.stats.submitQuiz.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.stats.get.path] });
    },
  });
}
