import { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BasicCard from "../components/Common/Card";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FormTask from "../components/Home/DialogFormTask";
import { fetchData } from "../helpers/actions";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
  },
});

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
  bgcolor: "#8dd853",
  color: "white",
  "&:hover": {
    bgcolor: "#8dd853",
    color: "black",
  },
};

//const dataInicial = [{content: "Contenido", date: new Date(), autor: "Juan"}]

export default function Home() {
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [notas, setNotas] = useState([]); // []
  const classes = useStyles();

  const handleClickOpen = (e) => {
    e.preventDefault()
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRefresh(!refresh)
  };

  useEffect(() => {
    fetchData("notas")
      .then((data) => {
        console.log(data)
        setNotas(data);
      })
      .catch((e) => console.log(e));
  }, [refresh]);

  return (
    <div style={{ height: "85%", width: "70%" }}>
      <Fab sx={fabStyle} aria-label="add" onClick={e => handleClickOpen(e)}>
        <AddIcon />
      </Fab>
      <Grid container spacing={4} className={classes.gridContainer} >
        {notas?.map((nota) => (
          <Grid item xs={12} sm={6} md={4} key={nota?.id}>
            <BasicCard
              content={nota?.content}
              fecha={nota?.date}
              color={nota?.color}
              autor={nota?.autor}
              id={nota?.id}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          </Grid>
        ))}
      </Grid>

      <FormTask handleClose={handleClose} open={open} />
    </div>
  );
}
