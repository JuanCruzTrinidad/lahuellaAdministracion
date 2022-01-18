import MenuAppBar from "./components/NavBar";
import { Grid, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";


export default function App() {
  return (
    <>
    <MenuAppBar />
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Typography variant="h2" component="div" gutterBottom>
        Lic. Arriola Barbara
      </Typography>
    </Grid>
    <Outlet />
    </>
  );
}

