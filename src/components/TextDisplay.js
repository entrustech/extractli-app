import React from 'react';
import { Box, Grid, IconButton, Typography, Tooltip } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import './TextDisplay.css';

const TextDisplay = ({ text, docInfo }) => {
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Text copied to clipboard');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Grid container spacing={2} padding={'1rem'}>
      <Grid item xs={12} sm={6} md={6}>
      <Box
          sx={{
            maxHeight: "57vh",
            overflowY: "hidden",
            padding: "2rem",
            border: "1px solid lightgray",
            position: "sticky",
            top: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
              sx={{
                display: 'flex',
                justifyContent: 'normal',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Typography variant="h5" component="div">Uploaded Document: </Typography>
              {docInfo.name && <Typography variant="h5" component="div">{docInfo.name}</Typography>}
            </Box>
          <Box sx={{ height: '100vh', overflow: 'hidden', p: 2 }}>
              
              {docInfo.previewUrl && (
                <>
                  {docInfo.fileType === 'image' && (
                    <img src={docInfo.previewUrl} alt="Uploaded document" style={{maxWidth: '100%', height: 'auto'}} />
                  )}
                  {docInfo.fileType === 'pdf' && (
                    <object data={docInfo.previewUrl} type="application/pdf" width="100%" height="100%" style={{overflow: 'auto'}}>
                      <embed src={docInfo.previewUrl} type="application/pdf" />
                    </object>
                  )}
                  {docInfo.fileType === 'doc' && <Typography color="textSecondary">Preview not available</Typography>}
                </>
              )}
            
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Box
          sx={{
            maxHeight: "60vh",
            overflowY: "hidden",
            padding: "1rem",
            border: "1px solid lightgray",
            position: "sticky",
            top: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
              sx={{
                display: 'flex',
                justifyContent: 'normal',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Typography variant="h5" component="div">What do you want to do with the found text:   </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="Copy to clipboard">
                  <IconButton onClick={handleCopy}>
                    <FileCopyIcon />
                  </IconButton>
                </Tooltip>
                <IconButton
                  onClick={() => {
                    const emailSubject = `Text parsed using Extractli!`;
                    const emailBody = `${text}`;
                    const mailtoURL = `mailto:?subject=${encodeURIComponent(
                      emailSubject
                    )}&body=${encodeURIComponent(emailBody)}`;
                    window.location.href = mailtoURL;
                  }}
                >
                  <EmailIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    const whatsappText = `Text parsed using Extractli! ${text}`;
                    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(
                      whatsappText
                    )}`;
                    window.open(whatsappURL, "_blank");
                  }}
                >
                  <WhatsAppIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    const tweetText = `{text}`;
                    const twitterURL = ``;
                    window.open(twitterURL, "_blank");
                  }}
                >
                  <TwitterIcon />
                </IconButton>
              </Box>
            </Box>
          <Box
              sx={{
                width: '100%',
                height: '100%',  // Subtracting the estimated height occupied by the headers and buttons
                overflow: 'auto',
              }}
            >
              <pre className="parsed-text-content">{text}</pre>
            </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default TextDisplay;
