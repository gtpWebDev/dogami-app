import { Link } from "react-router-dom";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import {
  CompositeLink,
  CompositeLinkUnderline,
} from "../../styledComponents/links";
import Typography from "@mui/material/Typography";

import { SectionHeader } from "../../styledComponents/typography";

function HomePage() {
  return (
    <Container maxWidth="md">
      <Stack mt={2}>
        <SectionHeader>Companion Home Page</SectionHeader>
        <Box pb={4} align="center">
          <Typography variant="h5" color="primary.contrastText">
            Can you remember which combination of power stones and consumables
            gives you the best possible time in the daily Dogami trials? If not,
            then this is the app for you!
            <br />
          </Typography>
        </Box>

        <Box pb={6} align="center">
          <Typography variant="h6" color="primary.contrastText">
            Add as many dogs as you like
            <br />
            ...with as many strategies as you like
            <br />
            ...for as many tracks as you like!
            <br />
          </Typography>
        </Box>

        <Box mb={5}>
          <CompositeLinkUnderline linkLoc="register">
            <Typography variant="h5">Register</Typography>
          </CompositeLinkUnderline>
        </Box>
        <Box>
          <CompositeLinkUnderline linkLoc="login">
            <Typography variant="h5">Login</Typography>
          </CompositeLinkUnderline>
        </Box>
      </Stack>
    </Container>
  );
}

export default HomePage;
