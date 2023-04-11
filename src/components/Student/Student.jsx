import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { deleteById, fetchById, putData } from "../../helpers/actions";
import { useNavigate, useParams } from "react-router-dom";
import CommentIcon from "@mui/icons-material/Comment";
import { buttonStyle } from "../styles";
import { useAuth0 } from "@auth0/auth0-react";
import { useSnackbar } from "notistack";
import DeleteIcon from "@mui/icons-material/Delete";
import {referentesDefault} from '../../variables';


const estadosSituacionObraSocial = [
  { value: "Aprobado", label: "Aprobado" },
  { value: "A la espera", label: "A la espera" },
];
const Student = () => {
  const params = useParams();
  const [dataObservaciones, setDataObservaciones] = useState([]);
  const [observacion, setObservacion] = useState([]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth0();
  const handleChange = (event) => {
    setObservacion(event.target.value);
  };

  const deleteObservacion = (e, texto, fecha) => {
    e.preventDefault();
    const array = dataObservaciones.filter(
      (d) => d?.texto !== texto && d?.fecha !== fecha
    );
    setDataObservaciones(array);
  };

  const cargarObservacion = (e) => {
    console.log("Estoy cargando una observacion");
    setDataObservaciones((dataObservaciones) => [
      ...dataObservaciones,
      {
        texto: observacion,
        autor: user ? user.name : "YO",
        fecha: new Date().toLocaleString(),
      },
    ]);
    console.log("Cargue una observacion");

    setObservacion("");
  };

  const darDeBaja = (e) => {
    e.preventDefault();
    const alumno = formik.values;
    alumno.bajaAlumno = true;
    alumno.observaciones = dataObservaciones;
    if(!alumno?.baja) delete alumno.baja;
    if(!alumno?.alta) delete alumno.alta;
    console.log(alumno)
    putData("alumnos", alumno)
    .then((data) => {
      enqueueSnackbar("Se dio de baja al alumno correctamente", {
        variant: "success",
      });
      navigate("/students");
    })
    .catch((e) => {
      enqueueSnackbar("Ocurrio un error", {
        variant: "error",
      });
      console.log(e);
    });
  }
  useEffect(() => {
  }, [dataObservaciones]);

  useEffect(() => {
    params?.id &&
      fetchById("alumnos", params?.id)
        .then((data) => {
          formik.setValues({
            id: data.id,
            nombre: data.nombre,
            obraSocial: data.obraSocial,
            acompañante: data.acompañante,
            diagnostico: data.diagnostico,
            escuela: data.escuela,
            gradoTurno: data.gradoTurno,
            referente: data.referente,
            dni: data.dni,
            alta: data?.alta,
            baja: data?.baja,
            obraSocialSituacion: data?.obraSocialSituacion || "Aprobado",
          });
          setDataObservaciones(data?.observaciones || []);
        })
        .catch((e) => console.log(e));

    console.log("Se busca en BD");
  }, [params?.id]);

  const formik = useFormik({
    initialValues: {
      id: "",
      nombre: "",
      escuela: "",
      gradoTurno: "",
      obraSocial: "",
      acompañante: "",
      diagnostico: "",
      observaciones: [],
      referente: "",
      dni: 0,
      alta: "",
      baja: "",
      obraSocialSituacion: "Aprobado",
    },
    onSubmit: (values) => {
      const item = {
        id: values?.id,
        nombre: values?.nombre || "",
        obraSocial: values?.obraSocial || "",
        acompañante: values?.acompañante || "",
        escuela: values?.escuela || "",
        gradoTurno: values?.gradoTurno || "",
        observaciones: dataObservaciones,
        diagnostico: values?.diagnostico || "",
        referente: values?.referente || "",
        dni: values?.dni,
        obraSocialSituacion: values?.obraSocialSituacion || "",
      };
      if (values?.alta) item.alta = values.alta;
      if (values?.baja) item.baja = values.baja;
      putData("alumnos", item)
        .then((data) => {
          enqueueSnackbar("Se guardo el alumno correctamente", {
            variant: "success",
          });
          navigate("/students");
        })
        .catch((e) => {
          enqueueSnackbar("Ocurrio un error", {
            variant: "error",
          });
          console.log(e);
        });
    },
  });

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
          <Typography variant={"h6"}>
            Datos personales {formik.values.nombre}
            {params?.id && (
              <Tooltip title="Eliminadar">
                <IconButton
                  aria-label="delete"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteById("alumnos", params.id).then((s) =>
                      navigate("/students")
                    );
                    enqueueSnackbar("Se elimino correctamente el alumno.", {
                      variant: "info",
                    });
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
          </Typography>
          <Divider sx={{ marginBottom: 1 }} />
          <TextField
            margin={"dense"}
            size={"small"}
            sx={{ m: 1, width: "63ch" }}
            id="nombre"
            name="nombre"
            label="Nombre completo"
            value={formik.values.nombre}
            onChange={formik.handleChange}
          />
          <TextField
            margin={"dense"}
            id="escuela"
            size={"small"}
            sx={{ m: 1, width: "63ch" }}
            name="escuela"
            label="Escuela"
            value={formik.values.escuela}
            onChange={formik.handleChange}
          />
          <TextField
            margin={"dense"}
            id="gradoTurno"
            size={"small"}
            sx={{ m: 1, width: "63ch" }}
            name="gradoTurno"
            label="Grado/Turno"
            value={formik.values.gradoTurno}
            onChange={formik.handleChange}
          />

          <TextField
            margin={"dense"}
            id="dni"
            size={"small"}
            sx={{ m: 1, width: "63ch" }}
            name="dni"
            label="DNI"
            value={formik.values.dni}
            onChange={formik.handleChange}
          />
          <TextField
            margin={"dense"}
            id="obraSocial"
            size={"small"}
            sx={{ m: 1, width: "63ch" }}
            name="obraSocial"
            label="Obra Social"
            value={formik.values.obraSocial}
            onChange={formik.handleChange}
          />
          <TextField
            id="obraSocialSituacion"
            name="obraSocialSituacion"
            margin={"dense"}
            select
            label="Obra Social Situación"
            defaultValue={"Aprobado"}
            size={"small"}
            sx={{ m: 1, width: "63ch" }}
            value={formik.values.obraSocialSituacion}
            onChange={formik.handleChange}
          >
            {estadosSituacionObraSocial.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="referente"
            name="referente"
            margin={"dense"}
            select
            label="Referente"
            size={"small"}
            sx={{ m: 1, width: "63ch" }}
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
            id="acompañante"
            size={"small"}
            sx={{ m: 1, width: "63ch" }}
            name="acompañante"
            label="Acompañante"
            value={formik.values.acompañante}
            onChange={formik.handleChange}
          />
          <TextField
            margin={"dense"}
            size={"small"}
            sx={{ m: 1, width: "63ch" }}
            id="alta"
            name="alta"
            label="Alta"
            placeholder="Alta"
            helperText="Fecha de alta acompañante"
            value={formik.values.alta}
            onChange={formik.handleChange}
            type="date"
          />
          <TextField
            margin={"dense"}
            size={"small"}
            sx={{ m: 1, width: "63ch" }}
            id="baja"
            name="baja"
            label="Baja"
            value={formik.values.baja}
            onChange={formik.handleChange}
            helperText="Fecha de baja acompañante"
            type="date"
          />

          <TextField
            id="diagnostico"
            name="diagnostico"
            margin={"dense"}
            label="Diagnostico"
            multiline
            size={"small"}
            fullWidth
            rows={2}
            value={formik.values.diagnostico}
            onChange={formik.handleChange}
          />

          <Typography variant={"h6"}> Observaciones </Typography>
          <Divider sx={{ marginBottom: 1 }} />
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {dataObservaciones?.map(({ texto, autor, fecha }, i) => (
              <ListItem
                key={i}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={(e) => deleteObservacion(e, texto, fecha)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <CommentIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={texto}
                  secondary={`${autor} - ${fecha}`}
                />
              </ListItem>
            ))}
          </List>
          <TextField
            name="observaciones"
            margin={"dense"}
            id="observaciones"
            label="Observaciones"
            multiline
            minRows={3}
            value={observacion}
            onChange={handleChange}
            fullWidth
          />
          <Button
            color="primary"
            variant="contained"
            sx={buttonStyle}
            onClick={cargarObservacion}
          >
            Cargar Observacion
          </Button>
          <Divider sx={{ marginBottom: 1 }} />
          <Button
            color="primary"
            variant="contained"
            sx={buttonStyle}
            type="submit"
          >
            Guardar
          </Button>
          <Divider sx={{ marginBottom: 1 }} />
          <Button
            variant="contained"
            sx={{ ...buttonStyle, backgroundColor: "red" }}
            onClick={e => darDeBaja(e)}
          >
            Dar de baja
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default Student;
