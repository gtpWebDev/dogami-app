import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

/**
 * This TitleBar component sits above the actual App Bar
 * It scrolls off the screen, whereas the app bar does not.
 *
 */

export const TitleBar = () => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        // backgroundImage: `url(${titleBackground})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundColor: "primary.main",
      }}
    >
      <Box
        minHeight="200px"
        alignItems="center"
        container="header"
        sx={{
          // // easy center of the item
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          fontSize={{ xs: "50px", sm: "60px", md: "70px" }}
          fontWeight="bold"
          color="#ffffff"
          sx={{ textShadow: "3px 3px black" }}
        >
          Dogami App
        </Typography>
      </Box>
    </Grid>
  );
};

export default TitleBar;
