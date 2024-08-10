import { Link } from "react-router-dom";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { SectionHeader } from "../../styledComponents/typography";

function HomePage() {
  return (
    <Container>
      <Stack>
        <SectionHeader>Home Page</SectionHeader>
        <p>
          <Link to="register">Register here</Link>
        </p>
        <p>
          <Link to="login">Login here</Link>
        </p>
      </Stack>
    </Container>
  );
}

export default HomePage;
