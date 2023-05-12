import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const TextList = () => {
  const [textIndex, setTextIndex] = useState(0);
  const textList = ['Sleek interface for easy use.',
                    'Supports multiple formats: PDFs, DOCs, images, and more.',
                    'Instant access to extracted text.',
                    'AI-powered for precision and accuracy.',
                    'Effortlessly share extracted text via email, WhatsApp, etc.',
                    'Transforms documents into digital format.',
                    'Extracts text in multiple languages.',
                    'State-of-the-art security.',
                    'Regular updates for enhanced performance.',
                  ];
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % textList.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [textList.length]);

  return (
    <Box style={{ minHeight: '300px' }}>
        <Grid container direction="row" alignItems="center" justifyContent="space-between" spacing={2} padding={5} style={{ minHeight: '250px' }}>
          <Grid item xs={3}>
              <Typography variant="h2" align="left" sx={{color: 'white', fontWeight: 'bold'}} gutterBottom>
                  Extractli
              </Typography>
          </Grid>
          <Grid item xs={9}>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {textList.map((text, index) => (
                      <li key={index} style={{ display: index === textIndex ? 'block' : 'none' }}>
                          <Typography variant="h4" align="left" sx={{color: '#f5f5f5', fontWeight: 'bold'}} gutterBottom>
                              {text}
                          </Typography>
                      </li>
                  ))}
              </ul>
          </Grid>
        </Grid>
    </Box>
  );
};

export default TextList;
