import { type Signal, useSignal } from '@preact/signals';
import { Button } from '../components/Button.tsx';
import { setCount } from '../utils/db.ts';
import { useEffect, useState } from 'preact/hooks';

export type CounterProps = {
  count: Signal<number>;
  counter: Signal<number>;
  latency: number;
};

export default function Counter(props: CounterProps) {
  const { count, counter, latency } = props;
  useEffect(() => {
    const eventSource = new EventSource('/');
    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      count.value = newData.count;
      counter.value = newData.totCount;
    };
    return () => {
      eventSource.close();
    };
  }, []);

  const updateCount = async (increment: boolean) => {
    await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ add: increment }),
    });
  };

  return (
    <>
      <div
        class={'border-8 bg-green-400 py-5 px-20 border-green-500 rounded-lg'}
      >
        <h1 class={'text-3xl'}>Live Counter</h1>
        <div class='flex gap-8 py-6'>
          <Button onClick={() => updateCount(false)}>-1</Button>
          <p class='text-3xl tabular-nums'>{count}</p>
          <Button onClick={() => updateCount(true)}>+1</Button>
        </div>
        <div class='pt-6 opacity-50 text-sm'>
          <p class={'flex'}>
            Initial data fetched in&nbsp;<p class={'font-bold'}>{latency}</p>ms
          </p>
          <p class={'flex'}>
            Total Count&nbsp;<p class={'font-bold'}>{counter}</p>
          </p>
        </div>
      </div>
    </>
  );
}
