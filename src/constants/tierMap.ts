export const tierMap = (() => {
  const groups = ["bronze", "silver", "gold", "platinum", "diamond", "ruby"];
  const map: Record<string, string> = {};

  groups.forEach((group) => {
    for (let i = 1; i <= 5; i++) {
      const prefix = group[0]; // b, s, g, p, d, r
      map[`${group}_${i}`] = `/src/assets/icons/baekjoon/${group}/${prefix}${i}.png`;
    }
  });

  return map;
})();