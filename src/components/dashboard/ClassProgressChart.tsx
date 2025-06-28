import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card2';

// Sample data for class progress
const classProgressData = {
  labels: ['Mathématiques', 'Français', 'Histoire', 'Sciences', 'Anglais'],
  datasets: [
    {
      name: '6ème A',
      data: [68, 72, 80, 75, 85],
      color: '#3B82F6', // blue-500
    },
    {
      name: '5ème B',
      data: [75, 65, 70, 82, 78],
      color: '#10B981', // emerald-500
    },
    {
      name: '4ème C',
      data: [62, 78, 73, 68, 80],
      color: '#F59E0B', // amber-500
    },
  ],
};

export function ClassProgressChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // This is a simple implementation to draw the chart
    // In a real application, you would likely use a library like Chart.js
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    const { labels, datasets } = classProgressData;
    const canvasWidth = canvasRef.current.width;
    const canvasHeight = canvasRef.current.height;
    
    // Chart dimensions
    const chartPadding = { top: 20, right: 20, bottom: 40, left: 40 };
    const chartWidth = canvasWidth - chartPadding.left - chartPadding.right;
    const chartHeight = canvasHeight - chartPadding.top - chartPadding.bottom;
    
    // Calculate x positions for each label
    const xStep = chartWidth / (labels.length - 1);
    
    // Draw axes
    ctx.beginPath();
    ctx.moveTo(chartPadding.left, chartPadding.top);
    ctx.lineTo(chartPadding.left, chartPadding.top + chartHeight);
    ctx.lineTo(chartPadding.left + chartWidth, chartPadding.top + chartHeight);
    ctx.strokeStyle = '#E5E7EB'; // gray-200
    ctx.stroke();
    
    // Draw labels
    ctx.font = '10px Inter, sans-serif';
    ctx.fillStyle = '#6B7280'; // gray-500
    ctx.textAlign = 'center';
    
    labels.forEach((label, i) => {
      const x = chartPadding.left + i * xStep;
      ctx.fillText(
        label, 
        x, 
        chartPadding.top + chartHeight + 20
      );
    });
    
    // Draw y-axis labels (0-100%)
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const value = i * 20;
      const y = chartPadding.top + chartHeight - (chartHeight * value / 100);
      
      ctx.fillText(
        `${value}%`, 
        chartPadding.left - 10, 
        y + 4
      );
      
      // Draw horizontal grid line
      ctx.beginPath();
      ctx.moveTo(chartPadding.left, y);
      ctx.lineTo(chartPadding.left + chartWidth, y);
      ctx.strokeStyle = '#E5E7EB'; // gray-200
      ctx.stroke();
    }
    
    // Draw datasets
    datasets.forEach((dataset) => {
      ctx.beginPath();
      
      dataset.data.forEach((value, i) => {
        const x = chartPadding.left + i * xStep;
        const y = chartPadding.top + chartHeight - (chartHeight * value / 100);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.strokeStyle = dataset.color;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Add points
      dataset.data.forEach((value, i) => {
        const x = chartPadding.left + i * xStep;
        const y = chartPadding.top + chartHeight - (chartHeight * value / 100);
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = dataset.color;
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    });
    
    // Draw legend
    const legendX = chartPadding.left;
    const legendY = chartPadding.top - 10;
    
    datasets.forEach((dataset, i) => {
      const x = legendX + i * 100;
      
      // Line
      ctx.beginPath();
      ctx.moveTo(x, legendY);
      ctx.lineTo(x + 20, legendY);
      ctx.strokeStyle = dataset.color;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Point
      ctx.beginPath();
      ctx.arc(x + 10, legendY, 4, 0, Math.PI * 2);
      ctx.fillStyle = dataset.color;
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Text
      ctx.fillStyle = '#6B7280'; // gray-500
      ctx.textAlign = 'left';
      ctx.fillText(dataset.name, x + 25, legendY + 4);
    });
    
  }, []);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Progression des classes par matière</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <canvas 
            ref={canvasRef}
            width={500}
            height={300}
            className="w-full h-full"
          ></canvas>
        </div>
      </CardContent>
    </Card>
  );
}