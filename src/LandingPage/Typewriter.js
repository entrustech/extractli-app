import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';

const useTypingAnimation = (text, typingDelay, typingSpeed) => {
  const [content, setContent] = useState("");
  
  useEffect(() => {
    let timerId;

    if (text.length > content.length) {
      timerId = setTimeout(() => {
        setContent((c) => c + text.charAt(c.length));
      }, content.length === 0 ? typingDelay : typingSpeed);
    }

    return () => clearTimeout(timerId);
  }, [content, text, typingDelay, typingSpeed]);

  return content;
};

const TypingText = ({ text, index }) => {
  const animatedText = useTypingAnimation(text, index * 2000, 100);

  return (
    <li>
      <Typography variant="h3" sx={{color: '#f5f5f5', fontWeight: 'bold'}} gutterBottom>
        {animatedText}
      </Typography>
    </li>
  );
};

const Typewriter = () => {
  const textList = ["Instantly extract text", "Share the extracted text", "Supports various formats"];
  
  return (
    <Grid container direction="row" alignItems="center" justifyContent="space-between" padding={5}>
      <Grid item xs={6}>
        <Typography variant="h2" sx={{color: 'white', fontWeight: 'bold'}} gutterBottom>
          Extractli
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {textList.map((text, index) => (
            <TypingText key={index} text={text} index={index} />
          ))}
        </ul>
      </Grid>
    </Grid>
  );
};

export default Typewriter;
