import React from "react";
import { Box, Container, Grid, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "footer.background",
        color: "primary.contrastText",
        py: 1,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Box my={2} textAlign="center">
          <Typography variant="body2">
            <Link href="#top" color="inherit">
              Back to top
            </Link>
          </Typography>
        </Box>

        <Grid container spacing={5} px={3} pb={5}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6">My Details</Typography>
            <Typography variant="body2">
              <Link
                href="https://x.com/gtpWebDev"
                color="footer.accent"
                target="_blank"
                rel="noopener noreferrer"
              >
                X / Twitter - gtpWebDev
              </Link>
              <br />
              <Link
                href="https://github.com/gtpWebDev"
                color="footer.accent"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github - gtpWebDev
              </Link>
              <br />
              gtpwebdev@gmail.com
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">About This Site</Typography>
            <Typography variant="body2">
              This site was built to test and showcase my skills in full-stack
              web development. At time of completion, it is hoped that it may be
              a helpful app for players of Dogami Academy.
              <br /> <br />
              While I'm a player of the game and a fan of the project, I'm not
              employed or in any other way associated with the Dogami
              organisation.
              <br /> <br />
              All the Dogami project details can be found on the &nbsp;
              <Link
                href="https://marketplace.dogami.com/"
                color="footer.accent"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dogami website
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6">Site Technology</Typography>

            <Typography variant="body2">
              React Javascript library
              <br />
              Material UI styling
              <br />
              Node.js server
              <br />
              MongoDB database
              <br />
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
