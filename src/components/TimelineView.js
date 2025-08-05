// src/components/TimelineView.js
import React, { useState, useMemo } from 'react';
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from '@mui/material';
import { sampleComplianceData } from '../data/sampleData';

function TimelineView() {
  const [regionFilter, setRegionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'in-progress': return '#2196F3';
      case 'pending': return '#FF9800';
      case 'overdue': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const filteredData = useMemo(() => {
    return sampleComplianceData.filter(item => {
      const regionMatch = regionFilter === 'all' || item.region === regionFilter;
      const statusMatch = statusFilter === 'all' || item.progressStatus === statusFilter;
      const startDateMatch = !startDateFilter || item.startDate >= startDateFilter;
      const endDateMatch = !endDateFilter || item.endDate <= endDateFilter;
      return regionMatch && statusMatch && startDateMatch && endDateMatch;
    });
  }, [regionFilter, statusFilter, startDateFilter, endDateFilter]);

  const regions = [...new Set(sampleComplianceData.map(item => item.region))];
  const statuses = [...new Set(sampleComplianceData.map(item => item.progressStatus))];

  // Calculate timeline bounds
  const allDates = sampleComplianceData.flatMap(item => [item.startDate, item.endDate]);
  const minDate = new Date(Math.min(...allDates.map(date => new Date(date).getTime())));
  const maxDate = new Date(Math.max(...allDates.map(date => new Date(date).getTime())));

  // Generate month headers
  const generateMonthHeaders = () => {
    const months = [];
    const current = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    const end = new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 0);
    while (current <= end) {
      months.push({
        label: current.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        date: new Date(current)
      });
      current.setMonth(current.getMonth() + 1);
    }
    return months;
  };

  const monthHeaders = generateMonthHeaders();
  const totalDays = Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));

  // Calculate position and width for timeline bars
  const getBarStyle = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startOffset = Math.ceil((start.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
    const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const leftPercent = (startOffset / totalDays) * 100;
    const widthPercent = (duration / totalDays) * 100;
    return {
      left: `${leftPercent}%`,
      width: `${widthPercent}%`
    };
  };

  return (
    <Box>
      {/* Filters */}
      <Paper sx={{ p: 3, mb: 3, backgroundColor: '#f8f9fa' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1565C0' }}>
          COMPLIANCE TIMELINE
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Region</InputLabel>
              <Select
                value={regionFilter}
                label="Region"
                onChange={(e) => setRegionFilter(e.target.value)}
              >
                <MenuItem value="all">All Regions</MenuItem>
                {regions.map(region => (
                  <MenuItem key={region} value={region}>{region}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All Statuses</MenuItem>
                {statuses.map(status => (
                  <MenuItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              label="Start Date (From)"
              type="date"
              value={startDateFilter}
              onChange={(e) => setStartDateFilter(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              label="End Date (To)"
              type="date"
              value={endDateFilter}
              onChange={(e) => setEndDateFilter(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Gantt Chart */}
      <Paper sx={{ overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: '70vh' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 200, backgroundColor: '#1565C0', color: 'white', fontWeight: 600 }}>
                  TASK
                </TableCell>
                <TableCell sx={{ minWidth: 120, backgroundColor: '#1565C0', color: 'white', fontWeight: 600 }}>
                  REGULATOR
                </TableCell>
                <TableCell sx={{
                  minWidth: 800,
                  backgroundColor: '#1565C0',
                  color: 'white',
                  fontWeight: 600,
                  position: 'relative'
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {monthHeaders.map((month, index) => (
                      <Typography
                        key={index}
                        variant="caption"
                        sx={{
                          fontWeight: 600,
                          flex: 1,
                          textAlign: 'center',
                          borderRight: index < monthHeaders.length - 1 ? '1px solid rgba(255,255,255,0.3)' : 'none'
                        }}
                      >
                        {month.label}
                      </Typography>
                    ))}
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id} sx={{
                  '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                  '&:hover': { backgroundColor: '#f0f7ff' }
                }}>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    {item.title}
                    <Typography variant="caption" display="block" color="text.secondary">
                      {item.region}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.85rem' }}>
                    {item.regulator}
                  </TableCell>
                  <TableCell sx={{ position: 'relative', height: 60, minWidth: 800 }}>
                    <Box sx={{
                      position: 'relative',
                      height: '100%',
                      backgroundColor: '#f5f5f5',
                      borderRadius: 1
                    }}>
                      {monthHeaders.map((_, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            position: 'absolute',
                            left: `${(idx / monthHeaders.length) * 100}%`,
                            top: 0,
                            bottom: 0,
                            width: '1px',
                            backgroundColor: '#e0e0e0'
                          }}
                        />
                      ))}
                      <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        height: 24,
                        backgroundColor: getStatusColor(item.progressStatus),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        ...getBarStyle(item.startDate, item.endDate)
                      }}>
                        <Tooltip
                          title={
                            <Box>
                              <Typography variant="caption" display="block" sx={{ fontWeight: 600 }}>
                                Start Date: {new Date(item.startDate).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </Typography>
                              <Typography variant="caption" display="block">
                                Status: {item.progressStatus.replace('-', ' ').toUpperCase()}
                              </Typography>
                            </Box>
                          }
                          placement="top"
                          arrow
                        >
                          <Box sx={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: '20%',
                            cursor: 'pointer',
                            '&:hover': {
                              backgroundColor: 'rgba(255,255,255,0.2)'
                            }
                          }} />
                        </Tooltip>
                        <Tooltip
                          title={
                            <Box>
                              <Typography variant="caption" display="block" sx={{ fontWeight: 600 }}>
                                End Date: {new Date(item.endDate).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </Typography>
                              <Typography variant="caption" display="block">
                                Status: {item.progressStatus.replace('-', ' ').toUpperCase()}
                              </Typography>
                            </Box>
                          }
                          placement="top"
                          arrow
                        >
                          <Box sx={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            bottom: 0,
                            width: '20%',
                            cursor: 'pointer',
                            '&:hover': {
                              backgroundColor: 'rgba(255,255,255,0.2)'
                            }
                          }} />
                        </Tooltip>
                        {item.priority === 'high' && '●'}
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Legend */}
        <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderTop: '1px solid #e0e0e0' }}>
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
            Status Legend:
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 16, height: 16, backgroundColor: '#4CAF50', borderRadius: 1 }} />
              <Typography variant="caption">Completed</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 16, height: 16, backgroundColor: '#2196F3', borderRadius: 1 }} />
              <Typography variant="caption">In Progress</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 16, height: 16, backgroundColor: '#FF9800', borderRadius: 1 }} />
              <Typography variant="caption">Pending</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 16, height: 16, backgroundColor: '#F44336', borderRadius: 1 }} />
              <Typography variant="caption">Overdue</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>● High Priority</Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default TimelineView;
