// src/components/CompanyDashboard.js
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  Button,
  AppBar,
  Toolbar
} from '@mui/material';
import { ArrowLeft, FileText } from 'lucide-react';
import TimelineView from './TimelineView';
import CalendarView from './CalendarView';

function CompanyDashboard({ onNavigate }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputFormClick = () => {
    alert('Input form would open here - component integration ready');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#1565C0' }}>
        <Toolbar>
          <Button
            color="inherit"
            startIcon={<ArrowLeft />}
            onClick={() => onNavigate('home')}
            sx={{ mr: 2 }}
          >
            Back to Home
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Company Compliance Dashboard
          </Typography>
          <Button
            color="inherit"
            startIcon={<FileText />}
            onClick={handleInputFormClick}
            sx={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
            }}
          >
            Input Form
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                minWidth: 120,
                fontWeight: 600
              }
            }}
          >
            <Tab label="Timeline" />
            <Tab label="Calendar" />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {activeTab === 0 && <TimelineView />}
            {activeTab === 1 && <CalendarView />}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default CompanyDashboard;
