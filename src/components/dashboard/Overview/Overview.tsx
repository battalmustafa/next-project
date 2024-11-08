import DateRangePicker from '@/components/common/DateRangePicker';
import { Box, Container } from '@mui/material';
import { endOfDay, isWithinInterval, startOfDay, subMonths } from 'date-fns';
import React, { useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import DropdownCheckBox from '@/components/common/DropdownCheckbox';
import { LineChartComponent } from '@/components/common/LineChartComponent';
import Card from '@/components/common/Card';

const chartData = [
  { date: "2024-01-01", desktop: 180, mobile: 75 },
  { date: "2024-01-15", desktop: 200, mobile: 85 },
  { date: "2024-01-30", desktop: 210, mobile: 90 },
  { date: "2024-02-01", desktop: 305, mobile: 200 },
  { date: "2024-02-15", desktop: 40, mobile: 210 },
  { date: "2024-02-28", desktop: 100, mobile: 215 },
  { date: "2024-03-01", desktop: 20, mobile: 115 },
  { date: "2024-03-15", desktop: 225, mobile: 125 },
  { date: "2024-03-30", desktop: 235, mobile: 120 },
  { date: "2024-04-01", desktop: 75, mobile: 195 },
  { date: "2024-04-15", desktop: 85, mobile: 205 },
  { date: "2024-04-30", desktop: 70, mobile: 190 },
  { date: "2024-05-01", desktop: 210, mobile: 135 },
  { date: "2024-05-15", desktop: 215, mobile: 140 },
  { date: "2024-05-30", desktop: 220, mobile: 145 },
  { date: "2024-06-01", desktop: 215, mobile: 140 },
  { date: "2024-06-15", desktop: 225, mobile: 150 },
  { date: "2024-06-30", desktop: 230, mobile: 155 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};

const OverviewPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subMonths(new Date(), 12),
    to: new Date(),
  });
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["all","desktop","mobile"]);

  const appearanceOptions = [
    { id: "all", label: "All" },
    { id: "desktop", label: "Desktop" },
    { id: "mobile", label: "Mobile" },
  ];

  const filteredData = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) return chartData;

    const start = startOfDay(dateRange.from);
    const end = endOfDay(dateRange.to);

    return chartData
      .filter(item => {
        const registrationDate = new Date(item.date);
        return isWithinInterval(registrationDate, { start, end });
      })
      .map(item => {
        const newItem: { date: string; desktop?: number; mobile?: number } = { date: item.date };

        if (selectedOptions.includes("all") || selectedOptions.includes("desktop")) {
          newItem.desktop = item.desktop;
        }
        if (selectedOptions.includes("all") || selectedOptions.includes("mobile")) {
          newItem.mobile = item.mobile;
        }

        return newItem;
      });
  }, [dateRange, selectedOptions]);


  return (
    <>
      <Box sx={{ marginTop: 5, flexGrow: 1, py: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2, marginBottom: 3 }}>
        <Container maxWidth={false}>
        
          <Box sx={{ marginTop: 5, flexGrow: 1, py: 8, display: 'flex', justifyContent: 'end', alignItems: 'space-between', padding: 0, marginBottom: 3 , gap: 5}}>
            <DropdownCheckBox
              label="Platform"
              options={appearanceOptions}
              selectedOptions={selectedOptions}
              onSelect={setSelectedOptions}
            />
            <DateRangePicker dateRange={dateRange} onDateRangeChange={setDateRange} />
          </Box>
          <Box
      sx={{
        marginTop: 5,
        py: 8,
        display: 'flex',
        alignItems: 'space-between',
        padding: 0,
        marginBottom: 3,
        gap: 5,
        width: '100%',
      }}
    >
      <div className="grid grid-cols-4 gap-4 w-full">
        <Card label="Logins" value={100000} />
        <Card label="Mobile" value={1234} />
        <Card label="Desktop" value={50000} />
        <Card label="All" value={50000} />
      </div>
    </Box>
   
          <LineChartComponent
            title=""
            description=""
            chartData={filteredData}
            chartConfig={chartConfig}
          />
        </Container>
      </Box>
    </>
  );
};

export default OverviewPage;
