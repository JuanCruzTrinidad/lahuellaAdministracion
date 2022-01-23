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
      <MenuAppBar />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{width: '100%', height: '100%', p:4}}
        component={'main'}
      >
        <Paper elevation={3} sx={{width: '90%', height: '90%', p: 2}}>
        <h1>Hello {user.attributes.name}</h1>
      <button onClick={signOut}>Sign out</button>
        <Outlet />
        </Paper>
      </Grid>
    </>
  );
}

export default withAuthenticator(App);