import MenuAppBar from "./components/NavBar";
import { Grid, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { gridColumnsTotalWidthSelector } from "@mui/x-data-grid";


function App() {
  // const {
  //   isLoading,
  //   isAuthenticated,
  //   error,
  //   user,
  //   loginWithRedirect,
  //   logout
  // } = useAuth0();

  // console.log(user)
  // console.log(isAuthenticated)
  return (
    <>
    { 
    }
      <MenuAppBar  />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{width: '100%', height: '100%', p:4}}
        component={'main'}
      >
        <Outlet />
        {/* <button onClick={loginWithRedirect}> Alog</button> */}
      </Grid>
    </>
  );
}

export default App;