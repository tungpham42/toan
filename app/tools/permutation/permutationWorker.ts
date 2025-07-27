const getPermutations = (str: string, length: number): string[] => {
  if (length === 1) return str.split("");

  const perms: string[] = [];

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const remaining = str.slice(0, i) + str.slice(i + 1);
    const subPerms = getPermutations(remaining, length - 1);
    for (const sub of subPerms) {
      perms.push(char + sub);
    }
  }

  return perms;
};

self.onmessage = (e: MessageEvent<{ input: string; length: number }>) => {
  const { input, length } = e.data;
  const result = getPermutations(input, length);
  postMessage(result);
};

export {};
