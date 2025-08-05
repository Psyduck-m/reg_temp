// src/components/CalendarView.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Paper,
  Button
} from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { sampleComplianceData } from '../data/sampleData';

function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const getEventsForDate = (day) => {
    if (!day) return [];
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateStr = `${currentDate.getFullYear()}-${month}-${dayStr}`;
    return sampleComplianceData.filter(item =>
      item.startDate === dateStr || item.endDate === dateStr
    );
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(
      direction === 'prev'
        ? newDate.getMonth() - 1
        : newDate.getMonth() + 1
    );
    setCurrentDate(newDate);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const days = getDaysInMonth(currentDate);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'in-progress': return '#2196F3';
      case 'pending': return '#FF9800';
      case 'overdue': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 3 }}>
        {/* Calendar Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Button
            onClick={() => navigateMonth('prev')}
            startIcon={<ChevronLeft />}
            variant="outlined"
          >
            Previous
          </Button>
          <Typography variant="h4" sx={{ fontWeight: 600, color: '#1565C0' }}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </Typography>
          <Button
            onClick={() => navigateMonth('next')}
            endIcon={<ChevronRight />}
            variant="outlined"
          >
            Next
          </Button>
        </Box>

        {/* Day Names Header */}
        <Grid container spacing={1} sx={{ mb: 2 }}>
          {dayNames.map(day => (
            <Grid item xs key={day} sx={{ flexBasis: '14.28%', maxWidth: '14.28%' }}>
              <Typography
                variant="subtitle2"
                sx={{
                  textAlign: 'center',
                  fontWeight: 600,
                  color: '#666',
                  p: 1,
                  backgroundColor: '#f5f5f5',
                  borderRadius: 1
                }}
              >
                {day}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* Calendar Grid */}
        <Grid container spacing={1}>
          {days.map((day, index) => {
            const events = day ? getEventsForDate(day) : [];
            return (
              <Grid item xs key={index} sx={{ flexBasis: '14.28%', maxWidth: '14.28%' }}>
                <Card
                  sx={{
                    minHeight: 120,
                    backgroundColor: day ? '#fff' : '#f9f9f9',
                    border: day ? '1px solid #e0e0e0' : 'none',
                    cursor: day ? 'pointer' : 'default'
                  }}
                >
                  <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                    {day && (
                      <>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            mb: 1,
                            color: events.length > 0 ? '#1565C0' : '#333'
                          }}
                        >
                          {day}
                        </Typography>
                        {events.map(event => (
                          <Chip
                            key={event.id}
                            label={event.title}
                            size="small"
                            sx={{
                              fontSize: '0.7rem',
                              height: 20,
                              mb: 0.5,
                              backgroundColor: getStatusColor(event.progressStatus),
                              color: 'white',
                              '& .MuiChip-label': { px: 1 }
                            }}
                          />
                        ))}
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Legend */}
        <Box sx={{ mt: 3, p: 2, backgroundColor: '#f8f9fa', borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
            Status Legend:
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Chip label="Completed" size="small" sx={{ backgroundColor: '#4CAF50', color: 'white' }} />
            <Chip label="In Progress" size="small" sx={{ backgroundColor: '#2196F3', color: 'white' }} />
            <Chip label="Pending" size="small" sx={{ backgroundColor: '#FF9800', color: 'white' }} />
            <Chip label="Overdue" size="small" sx={{ backgroundColor: '#F44336', color: 'white' }} />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default CalendarView;
