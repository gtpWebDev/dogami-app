import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export const Loading = () => {
  return (
    <Grid container spacing={2} align="center">
      <Grid item xs={12} mt={5}>
        <Typography variant="h5" color="primary.contrastText">
          Loading...
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Loading;
