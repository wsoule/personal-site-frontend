/// <reference lib="deno.unstable" />
export const kv = await Deno.openKv();

export const getCount = async (): Promise<number | null> => {
  const res = await kv.get<number>(['count']);
  return res.value;
};

export const setCount = async (add: boolean = true) => {
  const currCount = await kv.get<number>(['count']);
  console.log('currcount = ', currCount);
  const res = await kv.set(['count'], currCount.value + (add ? 1 : -1));
  return currCount.value ?? 0 + 1;
};
