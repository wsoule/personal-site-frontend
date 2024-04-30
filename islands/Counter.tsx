import type { Signal } from '@preact/signals';
import { Button } from '../components/Button.tsx';

interface CounterProps {
  count: Signal<number>;
}

export default function Counter(props: CounterProps) {
  const { count } = props;
  return (
    <div class='flex gap-8 py-6'>
      <Button onClick={() => count.value -= 1}>-1</Button>
      <p class='text-3xl tabular-nums'>{count}</p>
      <Button onClick={() => count.value += 1}>+1</Button>
    </div>
  );
}
