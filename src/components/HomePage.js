// src/components/HomePage.js
import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { Building2, Shield, TrendingUp } from 'lucide-react';

function HomePage({ onNavigate }) {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ py: 4, textAlign: 'center', backgroundColor: '#f5f7fa' }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 600, color: '#1565C0' }}
        >
          Compliance Management System
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Multinational Finance Corporation
        </Typography>
      </Box>

      <Box sx={{ flex: 1, display: 'flex' }}>
        {/* Company Column */}
        <Box
          sx={{
            flex: 1,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            background: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            '&:hover': {
              transform: 'scale(1.02)',
              zIndex: 2,
              boxShadow: '0 8px 32px rgba(255, 152, 0, 0.4)'
            }
          }}
          onClick={() => onNavigate('company-dashboard')}
        >
          <Building2 size={100} style={{ marginBottom: '2rem' }} />
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 700, fontSize: '3rem' }}
          >
            Company
          </Typography>
          <Typography
            variant="h5"
            sx={{ textAlign: 'center', opacity: 0.9, maxWidth: '80%' }}
          >
            Access company-wide compliance dashboard and monitoring tools
          </Typography>
        </Box>

        {/* Regulators Column */}
        <Box
          sx={{
            flex: 1,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            background: 'linear-gradient(135deg, #42A5F5 0%, #1976D2 100%)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            '&:hover': {
              transform: 'scale(1.02)',
              zIndex: 2,
              boxShadow: '0 8px 32px rgba(66, 165, 245, 0.4)'
            }
          }}
          onClick={() => onNavigate('regulators')}
        >
          <Shield size={100} style={{ marginBottom: '2rem' }} />
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 700, fontSize: '3rem' }}
          >
            Regulators
          </Typography>
          <Typography
            variant="h5"
            sx={{ textAlign: 'center', opacity: 0.9, maxWidth: '80%' }}
          >
            Manage regulatory relationships and communication channels
          </Typography>
        </Box>

        {/* Industry Column */}
        <Box
          sx={{
            flex: 1,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            background: 'linear-gradient(135deg, #E53935 0%, #C62828 100%)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            '&:hover': {
              transform: 'scale(1.02)',
              zIndex: 2,
              boxShadow: '0 8px 32px rgba(229, 57, 53, 0.4)'
            }
          }}
          onClick={() => onNavigate('industry')}
        >
          <TrendingUp size={100} style={{ marginBottom: '2rem' }} />
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 700, fontSize: '3rem' }}
          >
            Industry
          </Typography>
          <Typography
            variant="h5"
            sx={{ textAlign: 'center', opacity: 0.9, maxWidth: '80%' }}
          >
            Track industry standards and benchmark compliance metrics
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
