import React, { useEffect, useRef, useState } from 'react';
import { useFetchSalesDataQuery } from '../../store/actions/sellerStats';
import { Chart, ChartType } from 'chart.js/auto';
import { DatePicker, Spin } from 'antd';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import dayjs from 'dayjs';

const userString = localStorage.getItem('user');
let userId = '';
let userName = '';
if (userString) {
  const user = JSON.parse(userString);
  if (user) {
    userId = user.id;
    userName = user.firstName;
  } else {
    console.error('User ID not found in localStorage');
  }
} else {
  console.error('User not found in localStorage');
}

const SalesChart: React.FC = () => {
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [startDate, setStartDate] = useState(dayjs().startOf('year').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'));
  const { data, error, isLoading } = useFetchSalesDataQuery({ startDate, endDate });
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const handleStartDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      setStartDate(date.format('YYYY-MM-DD'));
    }
  };
  
  const handleEndDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      setEndDate(date.format('YYYY-MM-DD'));
    }
  };

  useEffect(() => {
    if (data && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Destroy the previous chart instance if it exists
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        // Create a new chart instance
        chartInstanceRef.current = new Chart(ctx, {
          type: chartType,
          data: {
            labels: ['All Products', 'Expired Products', 'Available Products', 'Stock Level'],
            datasets: [{
              label: `Sales Data`,
              data: [
                data.productStats,
                data.expiredProducts,
                data.availableProducts,
                data.stocklevel
              ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }
  }, [data, chartType]);

  const handleChartTypeChange = (event: SelectChangeEvent<ChartType>) => {
    setChartType(event.target.value as ChartType);
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <Spin size="large" />
    </div>
  );
  if (error) return <div>Error: An error occurred</div>;

  return (
    <div className="p-4">
      
    <div className="mb-4 flex space-x-4">
      <DatePicker
        onChange={handleStartDateChange}
        defaultValue={dayjs(startDate)}
        placeholder="Start Date"
      />
      <DatePicker
        onChange={handleEndDateChange}
        defaultValue={dayjs(endDate)}
        placeholder="End Date"
      />
    </div>
        
      <FormControl className="mb-4">
        <InputLabel id="chart-type-label">Select Chart Type</InputLabel>
        <Select
          labelId="chart-type-label"
          id="chart-type"
          value={chartType}
          label="Select Chart Type"
          onChange={handleChartTypeChange}
        >
          <MenuItem value="bar">Bar</MenuItem>
          <MenuItem value="line">Line</MenuItem>
          <MenuItem value="pie">Pie</MenuItem>
          <MenuItem value="doughnut">Doughnut</MenuItem>
          <MenuItem value="radar">Radar</MenuItem>
          <MenuItem value="polarArea">Polar Area</MenuItem>
        </Select>
      </FormControl>
      <div className="relative w-full h-96">
        <canvas id="salesChart" ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default SalesChart;