import MenuAppBar from "./components/NavBar";
import { Grid, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App({ signOut, user }) {
  console.log(user)
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
        <Paper elevation={3} sx={{width: '90%', minHeight: '80%', p: 2, marginTop: 8}}>
        <Outlet />
        </Paper>
      </Grid>
    </>
  );
}

export default withAuthenticator(App);