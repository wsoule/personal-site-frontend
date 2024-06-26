import { Chart } from 'https://deno.land/x/fresh_charts/mod.ts';
import {
  ChartColors,
  transparentize,
} from 'https://deno.land/x/fresh_charts/utils.ts';

export default function Charts() {
  return (
    <>
      <h1>Chart Example</h1>
      <Chart
        type='line'
        options={{
          scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
        }}
        data={{
          labels: ['1', '2', '3'],
          datasets: [{
            label: 'Sessions',
            data: [123, 234, 234],
            borderColor: ChartColors.Red,
            backgroundColor: transparentize(ChartColors.Red, 0.5),
            borderWidth: 1,
          }, {
            label: 'Users',
            data: [346, 233, 123],
            borderColor: ChartColors.Blue,
            backgroundColor: transparentize(ChartColors.Blue, 0.5),
            borderWidth: 1,
          }],
        }}
      >
      </Chart>
    </>
  );
}

