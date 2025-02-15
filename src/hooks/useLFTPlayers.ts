import { useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { LFTPlayer } from "../types/lft";

export const useLFTPlayers = () => {
  const [players, setPlayers] = useState<LFTPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlayers = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("lft_players")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPlayers(data || []);
    } catch (err) {
      console.error("Error fetching LFT players:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  return { 
    players, 
    loading, 
    error,
    mutate: fetchPlayers
  };
};
