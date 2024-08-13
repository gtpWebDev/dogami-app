import { Link } from "react-router-dom";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { CompositeLink } from "../../styledComponents/links";
import Typography from "@mui/material/Typography";

import { SectionHeader } from "../../styledComponents/typography";

function HomePage() {
  return (
    <Container>
      <Stack mt={2}>
        <SectionHeader>Home Page</SectionHeader>
        <Box m={5}>
          <CompositeLink linkLoc="register">
            <Typography variant="h6">Register here</Typography>
          </CompositeLink>
        </Box>
        <Box mb={15}>
          <CompositeLink linkLoc="login">
            <Typography variant="h6">Login here</Typography>
          </CompositeLink>
        </Box>
      </Stack>
    </Container>
  );
}

export default HomePage;
