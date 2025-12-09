export const generateDummyRank = (count: number) => {
  const tierGroups = ["bronze", "silver", "gold", "platinum", "diamond", "ruby"];
  const teams = [
    "프론트엔드 대면반",
    "프론트엔드 비대면반",
    "백엔드 대면반",
    "백엔드 비대면반",
  ];

  return Array.from({ length: count }).map((_, i) => {
    const rank = i + 1;

    const group = tierGroups[Math.floor(Math.random() * tierGroups.length)];
    const level = Math.floor(Math.random() * 5) + 1;

    const team = teams[Math.floor(Math.random() * teams.length)];

    return {
      rank,
      tier: `${group}_${level}`,
      name: `사용자${rank}`,
      totalScore: Math.floor(Math.random() * 200) + 20,
      solvedCount: Math.floor(Math.random() * 15) + 3,
      bojId: `user${rank}`,
      team,
      diff: Math.floor(Math.random() * 7) - 3,
    };
  });
};