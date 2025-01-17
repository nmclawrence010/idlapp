interface Player {
  account_id: number;
  account_name: string;
  primary_team: {
    team_id: number;
    team_name: string;
    team_logo_src: string;
  };
  primary_position: number;
  wins: number;
  losses: number;
  win_rate: string;
  match_count: number;
  average_imprint_rating: number;
}

interface LeaderboardResponse {
  league_id: number;
  league_name: string;
  player_count: number;
  players: Player[];
}

const API_TOKEN = import.meta.env.VITE_IMPRINT_API_TOKEN;
const API_URL_LEADERBOARD = import.meta.env.DEV ? "/api/league/players" : "https://api.imprint.gg/league/players";

export const fetchLeaderboard = async (): Promise<LeaderboardResponse> => {
  try {
    const response = await fetch(API_URL_LEADERBOARD, {
      method: "POST",
      headers: {
        token: API_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        league_id: 17600,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch leaderboard data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    throw error;
  }
};
