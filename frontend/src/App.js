import MenuAppBar from "./components/NavBar";
import { Grid, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function App() {
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
        <Paper elevation={3} sx={{width: '80%', height: '80%', p: 2}}>
        <Outlet />
        </Paper>
      </Grid>
    </>
  );
}
