import React, { useState } from "react";
import { Box, Container, Typography, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TextList from "./TextList";
import { handleEmail } from "../services/api";

const LandingPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const isValidEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (isValidEmail(email)) {
      try {
        await handleEmail(email);
        console.log("Email submitted successfully");
        navigate("/extract");
      } catch (error) {
        console.error("Failed to submit email:", error);
      }
    } else {
      alert("Please enter a valid email");
    }
  };

  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url('https://images.unsplash.com/photo-1671226366556-c3efaa10edf0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          padding: "2em 0",
          height: "80vh",
          width: "95vw",
          display: "flex",
          alignItems: "center",
          borderRadius: "25px",
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Container>
          <Typography
            variant="h2"
            component="h1"
            color={"whitesmoke"}
            gutterBottom
          >
            Instantly extract text from documents!
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            color={"whitesmoke"}
            gutterBottom
          >
            Experience the power of AI-driven text extraction with Extractli's
            user-friendly interface.
          </Typography>
          <TextList />
          <Box
            sx={{
              marginBottom: "1em",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              color={"whitesmoke"}
              gutterBottom
            >
              Get started for FREE!
            </Typography>
            <TextField
              label="Provide Your Email To Get Started"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                width: "50%",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                color: "whitesmoke",
              }}
              InputLabelProps={{
                style: { color: "whitesmoke" },
              }}
              inputProps={{
                style: { color: "whitesmoke" },
              }}
            />
            <form onSubmit={handleSubmit}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ marginTop: "1em", color: "whitesmoke" }}
              >
                Try Extractli Now!
              </Button>
            </form>
          </Box>
        </Container>
      </Box>
      <Box
        maxWidth="md"
        style={{
          marginTop: "2em",
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "2em 2em",
        }}
      >
        <Typography variant="h4" component="h2" style={{ marginBottom: "1em" }}>
          Subscribe to Extractli updates
        </Typography>
        <TextField
          label="Your Email"
          variant="outlined"
          type="email"
          fullWidth
          style={{ marginBottom: "1em" }}
        />
        <Button variant="contained" color="primary">
          Subscribe
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;
