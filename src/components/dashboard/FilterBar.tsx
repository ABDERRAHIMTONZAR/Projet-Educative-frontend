import React from 'react';
import { FilterOptions } from '../../types/homework';
import Select from '../ui/Select';
import Input from '../ui/Input';
import { subjects } from '../../data/mockData';
import { getCurrentDate, getDateIn30Days } from '../../utils/dateUtils';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      subject: e.target.value,
    });
  };

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        from: e.target.value,
      },
    });
  };

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        to: e.target.value,
      },
    });
  };

  // Create subject options including "All" option
  const subjectOptions = [
    { value: 'all', label: 'Toutes les matières' },
    ...subjects.map(subject => ({ value: subject, label: subject })),
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <Select
            label="Matière"
            options={subjectOptions}
            value={filters.subject}
            onChange={handleSubjectChange}
            fullWidth
          />
        </div>
        <div className="w-full md:w-1/3">
          <Input
            label="Date de début"
            type="date"
            value={filters.dateRange.from}
            onChange={handleDateFromChange}
            min={getCurrentDate()}
            max={filters.dateRange.to}
            fullWidth
          />
        </div>
        <div className="w-full md:w-1/3">
          <Input
            label="Date de fin"
            type="date"
            value={filters.dateRange.to}
            onChange={handleDateToChange}
            min={filters.dateRange.from}
            fullWidth
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;