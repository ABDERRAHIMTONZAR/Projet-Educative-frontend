import { ReactNode } from 'react';
import { Card, CardContent } from '../ui/Card2';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  icon, 
  description, 
  trend,
  className = "" 
}: StatsCardProps) {
  return (
    <Card className={`rounded-2xl shadow-md hover:shadow-xl transition-all bg-white dark:bg-gray-900 ${className}`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          
          {/* Left side */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {title}
            </p>

            <p className="text-4xl font-bold text-gray-900 dark:text-white">
              {value}
            </p>

            {trend && (
              <div className="flex items-center gap-1 text-sm font-medium">
                <span className={`flex items-center ${
                  trend.isPositive 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {trend.isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                  <span className="ml-1">{Math.abs(trend.value)}%</span>
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                  depuis le mois dernier
                </span>
              </div>
            )}

            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {description}
              </p>
            )}
          </div>

          {/* Icon */}
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 shadow-inner">
            {icon}
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
