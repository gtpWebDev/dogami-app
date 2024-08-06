// import { useState } from "react";

// import {
//   BACKEND_URI,
//   HEADER_JSON_CONFIG,
// } from "../../../constants/backendRequests";

// import { axiosBackendDelete } from "../../../lib/axiosRequests/axiosBackendEndpoints";

// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import Stack from "@mui/material/Stack";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";

// import CustomPaper from "../../styledComponents/paper";

// const TrackStatsDisplay = (props) => {
//   return props.dogamiStrats.map((element) => (
//     <div key={element._id}>
//       <SingleStrategyDisplay strat={element} />
//       {/* Track: {element.track_id.name}&nbsp;&nbsp; Power 1: {element.power_1.name}
//       &nbsp;&nbsp; Power 2: {element.power_2.name}&nbsp;&nbsp; Consumable 1:{" "}
//       {element.consumable_1.name}&nbsp;&nbsp; &nbsp;&nbsp; Best Time:{" "}
//       {element.strat_best_time}&nbsp;&nbsp;
//       <DeleteStratButton
//         stratId={element._id}
//         dogamiId={props.dogamiId}
//         trackId={props.trackId}
//         updateTrigger_cbfn={props.updateTrigger_cbfn}
//       /> */}
//     </div>
//   ));
// };

// const SingleStrategyDisplay = (props) => {
//   return (
//     <Grid item>
//       <CustomPaper sx={{ padding: "10px" }}>
//         <Stack>
//           <Box padding={1}>
//             <Typography variant="h5" color="primary.contrastText">
//               Track: {props.strat.track_id.name}
//             </Typography>
//           </Box>
//           <Box>Image</Box>
//           <Grid container>
//             <Grid item>{props.strat.power_1.name}</Grid>
//             <Grid item>{props.strat.power_2.name}</Grid>
//             <Grid item>{props.strat.consumable_1.name}</Grid>
//           </Grid>
//           <Box padding={1}>
//             <Typography
//               variant="h6"
//               color="primary.contrastText"
//               sx={{ fontWeight: "900" }}
//             >
//               {props.strat.strat_best_time}
//             </Typography>
//           </Box>
//           <Box>
//             <Grid container>
//               <Grid item xs={6}>
//                 <DeleteStratButton
//                   stratId={props.strat._id}
//                   dogamiId={props.dogamiId}
//                   trackId={props.trackId}
//                   updateTrigger_cbfn={props.updateTrigger_cbfn}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <Button variant="contained" color="secondary">
//                   Edit
//                 </Button>
//               </Grid>
//             </Grid>
//           </Box>
//         </Stack>
//       </CustomPaper>
//     </Grid>
//   );
// };

// const DeleteStratButton = (props) => {
//   const [errorMsg, setErrorMsg] = useState(null);

//   // should add modulars - "are you sure"? and "deletion error"
//   const handleDelete = async () => {
//     const deleteUri = `${BACKEND_URI}/dogamis/${props.dogamiId}/strats/${props.stratId}`;
//     const response = await axiosBackendDelete(deleteUri, HEADER_JSON_CONFIG);
//     if (response.success) {
//       // need to refresh content of page to include the new dog
//       props.updateTrigger_cbfn(new Date());
//     } else {
//       setErrorMsg(response.error.message);
//     }
//   };

//   return (
//     <>
//       <Button onClick={handleDelete} variant="contained" color="secondary">
//         Delete
//       </Button>
//       {/* Message for delete dogami issues, poss use modular instead? */}
//       {/* {errorMsg ? <p>{errorMsg}</p> : <></>} */}
//     </>
//   );
// };

// export default TrackStatsDisplay;
