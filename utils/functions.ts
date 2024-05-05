export const getEnvVar = (variable: string): string => {
  const value = Deno.env.get(variable);
  if (!value) {
    throw new Error(`Environment variable ${variable} not set!`);
  }
  return value;
};
