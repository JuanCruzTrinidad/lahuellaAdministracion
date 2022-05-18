import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { fetchById, fetchData, putData } from "../../helpers/actions";
import { useParams } from "react-router-dom";
import CommentIcon from "@mui/icons-material/Comment";
import { buttonStyle } from "../styles";

const dataPruebaObservaciones = [
  {
    texto:
      "El niño se comparta bien, llame a los padres y esta todo en orden. Puede ser que tenga que escribir cosas más larga.",
    autor: "JuanC",
    fecha: new Date().toLocaleString(),
  },
  {
    texto:
      "El niño se comparta bien, llame a los padres y esta todo en orden. Puede ser que tenga que escribir cosas más larga. No se que más escribir, pero quiero probar que aguante una longitud decente.",
    autor: "JuanC",
    fecha: new Date().toLocaleString(),
  },
];

const referentesDefault = [{value: 'Barbara', label: 'Barbara'}, {value: 'Bahiana', label: 'Bahiana'}, {value: 'Jimena', label: 'Jimena'}]
const Student = () => {
  const params = useParams();
  const [obrasSociales, setObrasSociales] = useState([]);
  const [acompañantes, setAcompañantes] = useState([]);
  const [dataObservaciones, setDataObservaciones] = useState([]);
  const [observacion, setObservacion] = useState([]);
  const handleChange = (event) => {
    setObservacion(event.target.value);
  };
  const cargarObservacion = (e) => {
    setDataObservaciones(dataObservaciones => [...dataObservaciones, {texto: observacion, autor: 'YO', fecha: new Date().toLocaleString()} ])
    setObservacion('')
  }

  useEffect(()=> {
    console.log("Cambio data observaciones.")
  }, [dataObservaciones])

  useEffect(() => {
    fetchData("personas").then((data) => {
      const dataPersonas = data.map((d) => {
        return {
          value: d.id,
          label: d.nombre,
        };
      });
      setAcompañantes(dataPersonas);
    });
    fetchData("obrasocial").then((data) => {
      const dataObraSociales = data.map((d) => {
        return {
          value: d.id,
          label: d.nombre,
        };
      });
      setObrasSociales(dataObraSociales);
    });
    console.log("Se busca en BD")
  }, []);

  useEffect(() => {
    fetchById("alumnos", params.id)
      .then((data) => {
        formik.setValues({
          id: data.id,
          nombre: data.nombre,
          obraSocial: data.obraSocial,
          acompañante: data.acompañante,
          diagnostico: data.diagnostico,
          escuela: data.escuela,
          gradoTurno: data.gradoTurno,
          referente: data.referente
        });
        setDataObservaciones(data.observaciones)
      })
      .catch((e) => console.log(e));
      console.log("Se busca en BD")
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
      referente: ""
    },
    onSubmit: (values) => {
      putData("alumnos", {
        id: values.id,
        nombre: values.nombre,
        obraSocial: values.obraSocial,
        acompañante: values.acompañante,
        escuela: values.escuela,
        gradoTurno: values.gradoTurno,
        observaciones: dataObservaciones,
        diagnostico: values.diagnostico,
          referente: values.referente
      })
        .then((data) => alert("Se guardo correctamente"))
        .catch((e) => console.log(e));
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
            {" "}
            Datos personales {formik.values.nombre}
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
            id="obraSocial"
            name="obraSocial"
            margin={"dense"}
            select
            size={"small"}
            sx={{ m: 1, width: "63ch" }}
            label="Obra Social"
            value={formik.values.obraSocial}
            onChange={formik.handleChange}
          >
            {obrasSociales.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="acompañante"
            name="acompañante"
            margin={"dense"}
            select
            label="Acompañante"
            size={"small"}
            sx={{ m: 1, width: "63ch" }}
            value={formik.values.acompañante}
            onChange={formik.handleChange}
          >
            {acompañantes.map((option) => (
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
            {dataObservaciones.map(({ texto, autor, fecha }) => (
              <ListItem>
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
        </div>
      </Box>
    </div>
  );
};

export default Student;
