const getPermutations = (str: string): string[] => {
  if (str.length <= 1) return [str];

  const perms: string[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const remaining = str.slice(0, i) + str.slice(i + 1);
    for (const subPerm of getPermutations(remaining)) {
      const perm = char + subPerm;
      if (!seen.has(perm)) {
        seen.add(perm);
        perms.push(perm);
      }
    }
  }

  return perms;
};

self.onmessage = (e: MessageEvent<string>) => {
  const input = e.data;
  const result = getPermutations(input);
  postMessage(result);
};

export {};
