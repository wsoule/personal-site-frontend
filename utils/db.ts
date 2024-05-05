/// <reference lib="deno.unstable" />
export const kv = await Deno.openKv();

export type DbStruct = {
  count: number;
  totCount: number;
};

export const getCount = async (): Promise<
  { count: number | undefined; totCount: number | undefined }
> => {
  const res = await kv.get<DbStruct>(['count']);
  return { count: res.value?.count, totCount: res.value?.totCount };
};

export const setCount = async (add: boolean = true) => {
  const currCount = await kv.get<DbStruct>(['count']);
  const tempCounter: DbStruct = {
    count: (currCount.value?.count ?? 0) + (add ? 1 : -1),
    totCount: (currCount.value?.totCount ?? 0) + 1,
  };
  await kv.set(['count'], tempCounter);
  return currCount.value ?? 0 + 1;
};

export const subscribeCount = (): void => {
  const stream = kv.watch([['count']]);
  const reader = stream.getReader();
};
