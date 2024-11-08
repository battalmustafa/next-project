import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  label: string;
  value: string | number;
}

const Card: React.FC<CardProps> = ({ label, value }) => {
  const formattedValue =
    typeof value === 'number' ? value.toLocaleString('de-DE') : value;

  return (
    <div
      className={cn(
        'bg-white grid justify-center rounded-lg shadow-md transition-all duration-300 border border-gray-200 hover:border-mainBlue group', 
        'p-4'
      )}
    >
      <h3 className="flex justify-center text-md font-medium mb-2 text-textsecondary group-hover:text-mainBlue">
        {label}
      </h3>
      <p className="text-xl font-semibold flex justify-center text-textMain group-hover:text-mainBlue"> 
        {formattedValue}
      </p>
    </div>
  );
};

export default Card;
