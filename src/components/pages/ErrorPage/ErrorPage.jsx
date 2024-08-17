import { useRouteError } from "react-router-dom";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { CompositeLinkUnderline } from "../../styledComponents/links";

/**
 * Haven't yet worked out a structure which allows the ErrorPage
 * to easily use the layout used by the router child pages
 */

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Container maxWidth="md">
      <Stack mt={8}>
        <Box pb={4} align="center">
          <Typography variant="h5" color="primary.contrastText">
            Sorry, there has been an application error.
            <br />
            <br />"{error.statusText || error.message}"
          </Typography>
        </Box>

        <Box mb={5}>
          <CompositeLinkUnderline linkLoc="/">
            <Typography variant="h5">Return to Home Page</Typography>
          </CompositeLinkUnderline>
        </Box>
      </Stack>
    </Container>
  );
}
