import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { buttonStyle } from "../styles";
import { useSnackbar } from "notistack";
import { putData } from "../../helpers/actions";

export default function FormTask({ open, handleClose }) {
    const { enqueueSnackbar } = useSnackbar();
  const colors = ["#8dd853", "#f12eaf"];
  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];

  const formik = useFormik({
    initialValues: {
      autor: "Gabriela",
      content: "",
    },
    onSubmit: (values) => {
      values["date"] = new Date().toLocaleDateString();
      values["color"] = getRandomColor();
      putData("notas", values)
        .then((data) =>  {
          console.log("Se guardo correctamente") 
          handleClose()
        })
        .catch((e) => {
            console.log(e)
            enqueueSnackbar("Ocurrio un error", { 
                variant: 'error',
            })
        } );
        enqueueSnackbar("Se guardo la nota correctamente", { 
          variant: 'success',
      })
    },
  });
  return (
    <div style={{ height: "85%", width: "70%" }}>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <div>
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>Nueva tarea</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin={"dense"}
                size={"small"}
                fullWidth
                id="autor"
                name="autor"
                label="Autor"
                value={formik.values.autor}
                onChange={formik.handleChange}
              />
              <TextField
                autoFocus
                margin={"dense"}
                size={"small"}
                fullWidth
                id="content"
                name="content"
                label="Contenido"
                value={formik.values.content}
                onChange={formik.handleChange}
                multiline
                rows={3}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} sx={{ marginTop: 3 }}>
                Cancelar
              </Button>
              <Button
                sx={{ ...buttonStyle, width: "auto", color: "white" }}
                type="submit"
              >
                Guardar
              </Button>
            </DialogActions>
          </form>
        </div>
      </Dialog>
    </div>
  );
}
