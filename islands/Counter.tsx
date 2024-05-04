import { effect, type Signal } from '@preact/signals';
import { Button } from '../components/Button.tsx';
import IconInfoCircle from 'https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/info-circle.tsx';

export type CounterProps = {
  count: Signal<number>;
  counter: Signal<number>;
  latency: number;
};

export default function Counter(props: CounterProps) {
  const { count, counter, latency } = props;
  let eventSource: EventSource;
  self.addEventListener('load', () => {
    eventSource = new EventSource('http://localhost:8000/');
    eventSource.addEventListener('message', (event) => {
      const newData = JSON.parse(event.data);
      count.value = newData.count;
      counter.value = newData.totCount;
    });
  });

  effect(() => {
    return () => {
      if (eventSource && eventSource.readyState !== EventSource.CLOSED) {
        eventSource.close();
      }
    };
  });

  const updateCount = async (increment: boolean) => {
    console.log('doing here');
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
        <div class={'flex items-center justify-between'}>
          <h1 class={'text-3xl'}>Counter</h1>
          <IconInfoCircle class='w-6 h-6' />
        </div>
        <div class='flex justify-between py-6'>
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
