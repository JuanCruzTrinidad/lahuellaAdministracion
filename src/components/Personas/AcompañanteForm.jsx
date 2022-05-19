import {
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { deleteById, fetchById, putData } from "../../helpers/actions";
import { useNavigate, useParams } from "react-router-dom";
import { buttonStyle } from "../styles";
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';

const referentesDefault = [
  { value: "Barbara", label: "Barbara" },
  { value: "Bahiana", label: "Bahiana" },
  { value: "Jimena", label: "Jimena" },
];

const Persona = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      id: "",
      nombre: "",
      disponibilidad: "",
      zona: "",
      alta: "",
      baja: "",
      referente: "",
      alumno: "",
    },
    onSubmit: (values) => {
      putData("personas", {
        id: values.id,
        nombre: values.nombre,
        disponibilidad: values.disponibilidad,
        zona: values.zona,
        alta: values.alta,
        baja: values.baja,
        referente: values.referente,
        alumno: values.alumno,
      })
        .then((data) => console.log("Se guardo correctamente"))
        .catch((e) => {
          enqueueSnackbar("Ocurrio un error", { 
            variant: 'error',
        })
        });
        enqueueSnackbar("Se guardo el acompañante correctamente", { 
          variant: 'success',
      })
        navigate("/personas")
    },
  });

  useEffect(() => {
    fetchById("personas", params.id)
      .then((data) => {
        formik.setValues({
          id: data.id,
          nombre: data.nombre,
          disponibilidad: data.disponibilidad,
        zona: data.zona,
        alta: data.alta,
        baja: data.baja,
        referente: data.referente,
        alumno: data.alumno,
        });
      })
      .catch((e) => console.log(e));
  }, [params?.id]);

  return (
    <div style={{ height: "85%", width: "70%" }}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        alignItems={"center"}
        sx={{ margin: 3 }}
        onSubmit={formik.handleSubmit}
      >
        <div>
          <Typography variant={"h6"}> Datos {formik.values.nombre}</Typography>
          {
            params?.id && (
              <IconButton aria-label="delete" onClick={() => { 
                deleteById("personas", params.id).then(s => navigate("/personas"))
                enqueueSnackbar("Se elimino correctamente el acompañante.", { 
                  variant: 'info',
              })
                }}>
              <DeleteIcon />
            </IconButton>
            )
          }

          <Divider sx={{ marginBottom: 1 }} />
          <TextField
            margin={"dense"}
            size={"small"}
            sx={{ m: 1, width: "100ch" }}
            id="nombre"
            name="nombre"
            label="Nombre Completo"
            value={formik.values.nombre}
            onChange={formik.handleChange}
          />
          <TextField
            margin={"dense"}
            size={"small"}
            sx={{ m: 1, width: "100ch" }}
            id="disponibilidad"
            name="disponibilidad"
            label="Disponibilidad"
            value={formik.values.disponibilidad}
            onChange={formik.handleChange}
          />
          <TextField
            margin={"dense"}
            size={"small"}
            sx={{ m: 1, width: "100ch" }}
            id="zona"
            name="zona"
            label="Zona"
            value={formik.values.zona}
            onChange={formik.handleChange}
          />
          <TextField
            margin={"dense"}
            size={"small"}
            sx={{ m: 1, width: "100ch" }}
            id="alumno"
            name="alumno"
            label="Niño"
            value={formik.values.alumno}
            onChange={formik.handleChange}
          />
          <TextField
            id="referente"
            name="referente"
            margin={"dense"}
            select
            label="Referente"
            size={"small"}
            sx={{ m: 1, width: "100ch" }}
            value={formik.values.referente}
            onChange={formik.handleChange}
          >
            {referentesDefault.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin={"dense"}
            size={"small"}
            sx={{ m: 1, width: "100ch" }}
            id="alta"
            name="alta"
            label="Alta"
            value={formik.values.alta}
            onChange={formik.handleChange}
            type="date"
          />
          <TextField
            margin={"dense"}
            size={"small"}
            sx={{ m: 1, width: "100ch" }}
            id="baja"
            name="baja"
            label="Baja"
            value={formik.values.baja}
            onChange={formik.handleChange}
            type="date"
          />
          <Button
            color="primary"
            variant="contained"
            sx={{...buttonStyle, width: '80%'}}
            type="submit"
          >
            Guardar
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default Persona;
