import React, { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  DoughnutController,
  ChartData,
} from 'chart.js';

ChartJS.register(DoughnutController, ArcElement, Tooltip, Legend);

interface GradeChartProps {
  distribution: Record<string, number>;
  totalCourses: number;
}

// Distinct, high-contrast palette for academic grades so every grade is easily distinguishable
const GRADE_COLORS: Record<string, string> = {
  'A+': '#10b981', // Emerald Green 500
  'A': '#22c55e',  // Vibrant Green 500
  'A-': '#14b8a6', // Teal 500
  'B+': '#2563eb', // Royal Blue 600
  'B': '#06b6d4',  // Bright Cyan 500
  'B-': '#6366f1', // Indigo / Periwinkle 500
  'C+': '#f59e0b', // Amber 500
  'C': '#f97316',  // Orange 500
  'C-': '#ea580c', // Tangerine 600
  'D+': '#e11d48', // Coral / Rose 600
  'D': '#c2410c',  // Deep Orange 700
  'F': '#dc2626',  // Crimson Red 600
  '1st (First Class)': '#10b981', // Emerald
  '2:1 (Upper Second)': '#2563eb', // Royal Blue
  '2:2 (Lower Second)': '#f59e0b', // Amber
  '3rd (Third Class)': '#ea580c',  // Orange
  'Pass': '#0ea5e9', // Sky Blue
  'Fail': '#dc2626', // Crimson Red
  'E/F': '#dc2626',  // Crimson Red
};

const DEFAULT_COLOR = '#94A3B8';

export const GradeChart: React.FC<GradeChartProps> = ({ distribution, totalCourses }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);
  const [hasRenderError, setHasRenderError] = useState(false);

  const labels: string[] = Object.keys(distribution);
  const counts: number[] = Object.values(distribution) as number[];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || totalCourses === 0 || labels.length === 0) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
      return;
    }

    const backgroundColors = labels.map((grade) => GRADE_COLORS[grade] || DEFAULT_COLOR);

    // If an existing chart instance is tracked, update it smoothly
    if (chartInstanceRef.current) {
      try {
        chartInstanceRef.current.data.labels = labels;
        chartInstanceRef.current.data.datasets[0].data = counts;
        chartInstanceRef.current.data.datasets[0].backgroundColor = backgroundColors;
        chartInstanceRef.current.update();
        return;
      } catch (err) {
        console.warn('Failed to update ChartJS instance, recreating:', err);
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    }

    // Always check and destroy any active Chart attached to this canvas DOM node
    try {
      const existingChart = ChartJS.getChart(canvas);
      if (existingChart) {
        existingChart.destroy();
      }
    } catch {
      // Ignore cleanup error
    }

    try {
      const chartData: ChartData<'doughnut', number[], string> = {
        labels,
        datasets: [
          {
            data: counts,
            backgroundColor: backgroundColors,
            borderColor: '#ffffff',
            borderWidth: 2,
            hoverOffset: 6,
          },
        ],
      };

      chartInstanceRef.current = new ChartJS(canvas, {
        type: 'doughnut',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '72%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 10,
                boxHeight: 10,
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 10,
                font: {
                  family: "'Inter', sans-serif",
                  size: 11,
                  weight: 600,
                },
                color: '#475569',
              },
            },
            tooltip: {
              backgroundColor: '#0f172a',
              titleFont: { family: "'Inter', sans-serif", size: 12, weight: 'bold' },
              bodyFont: { family: "'Inter', sans-serif", size: 11 },
              padding: 10,
              cornerRadius: 8,
              callbacks: {
                label: function (context) {
                  const label = context.label || '';
                  const value = Number(context.raw) || 0;
                  const percentage = ((value / totalCourses) * 100).toFixed(1);
                  return ` ${label}: ${value} course${value > 1 ? 's' : ''} (${percentage}%)`;
                },
              },
            },
          },
          animation: {
            animateScale: true,
            animateRotate: true,
            duration: 400,
          },
        },
      });
      setHasRenderError(false);
    } catch (err) {
      console.error('Error initializing ChartJS doughnut chart:', err);
      setHasRenderError(true);
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
      if (canvas) {
        try {
          const chart = ChartJS.getChart(canvas);
          if (chart) {
            chart.destroy();
          }
        } catch {
          // Ignore
        }
      }
    };
  }, [distribution, totalCourses]);

  if (totalCourses === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-center p-6 border border-dashed border-slate-200 rounded-2xl bg-slate-50/70">
        <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 mb-2 text-xl">
          📊
        </div>
        <p className="text-sm font-bold text-slate-700">No Grades Added Yet</p>
        <p className="text-xs text-slate-400 mt-1 max-w-xs font-normal">
          Enter courses and assign grades in the calculator to see your live grade distribution analytics.
        </p>
      </div>
    );
  }

  // Graceful fallback if Canvas cannot be initialized
  if (hasRenderError) {
    return (
      <div className="py-4 flex flex-col items-center">
        <div className="w-full space-y-2">
          {labels.map((label, index) => {
            const count = counts[index] || 0;
            const pct = Math.round((count / totalCourses) * 100);
            const color = GRADE_COLORS[label] || DEFAULT_COLOR;
            return (
              <div key={label} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }}></span>
                  <span className="font-bold text-slate-700">{label}</span>
                </div>
                <span className="font-bold text-slate-500">{count} ({pct}%)</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-64 w-full flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* Centered Statistic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[62%] text-center pointer-events-none">
        <span className="text-3xl font-black text-slate-800 font-display leading-none">
          {totalCourses}
        </span>
        <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mt-0.5">
          Courses
        </span>
      </div>
    </div>
  );
};
