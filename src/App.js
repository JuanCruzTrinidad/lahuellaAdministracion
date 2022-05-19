import MenuAppBar from "./components/NavBar";
import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const {
    user,
    logout
  } = useAuth0();

  return (
    <>
    { 
    }
      <MenuAppBar user={user} signOut={logout}  />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{width: '100%', height: '100%', p:4}}
        component={'main'}
      >
        <Outlet />
      </Grid>
    </>
  );
}

export default App;