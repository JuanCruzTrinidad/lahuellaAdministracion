import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { fetchById, putData } from "../../helpers/actions";
import { useParams } from "react-router-dom";
import { buttonStyle } from "../styles";

const ObraSocial = () => {
  const params = useParams();
  const formik = useFormik({
    initialValues: {
      id: "",
      nombre: "",
      detalles: "",
    },
    onSubmit: (values) => {
      putData("obrasocial", {
        id: values.id,
        nombre: values.nombre,
        detalles: values.detalles,
      })
        .then((data) => alert("Se guardo correctamente"))
        .catch((e) => console.log(e));
    },
  });

  useEffect(() => {
    fetchById("obrasocial", params.id)
      .then((data) => {
        formik.setValues({
          id: data.id,
          nombre: data.nombre,
          detalles: data.detalles,
        });
      })
      .catch((e) => console.log(e));
  }, [params?.id]);

  return (
    <div style={{ height: "85%", width: "50%" }}>
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
          <Divider sx={{ marginBottom: 1 }} />
          <TextField
            margin={"dense"}
            size={"small"}
            sx={{ m: 1 }}
            fullWidth
            id="nombre"
            name="nombre"
            label="Nombre Obra Social"
            value={formik.values.nombre}
            onChange={formik.handleChange}
          />

          <Typography variant={"h6"}> Detalles </Typography>
          <Divider sx={{ marginBottom: 1 }} />
          <TextField
            id="detalles"
            margin={"dense"}
            multiline
            size={"small"}
            sx={{ m: 1 }}
            fullWidth
            name="detalles"
            label="Detalles"
            value={formik.values.detalles}
            onChange={formik.handleChange}
          />
          <Button
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

export default ObraSocial;
