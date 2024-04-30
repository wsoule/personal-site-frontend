import { type Signal, useSignal } from '@preact/signals';
import { Button } from '../components/Button.tsx';
import { setCount } from '../utils/db.ts';
import {
  useEffect,
  useState,
} from 'https://esm.sh/v128/preact@10.19.6/hooks/src/index.js';

export type CounterProps = {
  initialData: number;
  latency: number;
};

export default function Counter(props: CounterProps) {
  const { initialData, latency } = props;
  const counter = useSignal(initialData);

  const updateCount = async (increment: boolean) => {
    const res = await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ add: increment }),
    });
    const data = await res.json();
    if (data.ok) {
      counter.value += increment ? 1 : -1;
    }
  };

  return (
    <>
      <div class='flex gap-8 py-6'>
        <Button onClick={() => updateCount(false)}>-1</Button>
        <p class='text-3xl tabular-nums'>{counter}</p>
        <Button onClick={() => updateCount(true)}>+1</Button>
      </div>
      <div class='pt-6 opacity-50 text-sm'>
        <p>
          Initial data fetched in {latency}ms
        </p>
      </div>
    </>
  );
}
