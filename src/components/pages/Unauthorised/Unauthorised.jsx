// Valid user but not authorised for the specific route
// This is an unlikely edge case - use logs out and in as another user, then uses an old url

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { CompositeLinkUnderline } from "../../styledComponents/links";

export default function Unauthorised() {
  return (
    <Container maxWidth="md">
      <Stack mt={8}>
        <Box pb={4} align="center">
          <Typography variant="h5" color="primary.contrastText">
            You are not authorised to view the requested page <br />
          </Typography>
        </Box>

        <Box mb={5}>
          <CompositeLinkUnderline linkLoc="../dashboard">
            <Typography variant="h5">Return to Dashboard</Typography>
          </CompositeLinkUnderline>
        </Box>
      </Stack>
    </Container>
  );
}
