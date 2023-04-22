declare global {
  interface Window {
    __ENV?: Record<string, any>;
  }
}

export function env(
  key: string,
  defaultValue?: string,
  prefixes: string[] = ["REACT_APP", "REACT", "VITE"]
): string | undefined {
  const safeKeys = prefixes.map((prefix) => `${prefix}_${key}`).concat(key);
  const envObject = {
    ...import.meta.env,
    ...(hasBrowserEnvironment() ? window.__ENV : {}),
  };

  for (const safeKey of safeKeys) {
    if (safeKey in envObject) {
      return envObject?.[safeKey];
    }
  }

  return defaultValue;
}

export function hasBrowserEnvironment(): boolean {
  return typeof window !== "undefined" && window.__ENV !== undefined;
}
