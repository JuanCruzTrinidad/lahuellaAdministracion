import MenuAppBar from "./components/NavBar";
import { Grid, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";
import awsExports from './aws-exports';
// Amplify.configure(awsExports);

function App({ signOut, user }) {
  return (
    <>
      <MenuAppBar user={user} signOut={signOut} />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{width: '100%', height: '100%', p:4}}
        component={'main'}
      >
        <Paper elevation={3} sx={{ width: '90%', height: '90%', overflow: 'auto'}}>
        <Outlet />
        </Paper>
      </Grid>
    </>
  );
}

export default App;