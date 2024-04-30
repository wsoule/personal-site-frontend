import { type Signal, useSignal } from '@preact/signals';
import { Button } from '../components/Button.tsx';
import { setCount } from '../utils/db.ts';
import { useEffect, useState } from 'preact/hooks';

export type CounterProps = {
  counter: Signal<number>;
  latency: number;
};

export default function Counter(props: CounterProps) {
  const { counter, latency } = props;
  useEffect(() => {
    const eventSource = new EventSource('/');
    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      counter.value = newData;
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
  const incrementCount = () => {
    console.log('inc');
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ add: true }),
    }).catch(console.error);
  };

  const decrementCount = () => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ add: false }),
    });
  };

  return (
    <>
      <div class='flex gap-8 py-6'>
        <Button onClick={decrementCount}>-1</Button>
        <p class='text-3xl tabular-nums'>{counter}</p>
        <Button onClick={incrementCount}>+1</Button>
      </div>
      <div class='pt-6 opacity-50 text-sm'>
        <p>
          Initial data fetched in {latency}ms
        </p>
      </div>
    </>
  );
}
