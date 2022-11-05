import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
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
import { useSnackbar } from "notistack";
import DeleteIcon from "@mui/icons-material/Delete";

const referentesDefault = [
  { value: "Barbara", label: "Barbara" },
  { value: "Bahiana", label: "Bahiana" },
  { value: "Jimena", label: "Jimena" },
];

const ReneovacionForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      id: "",
      nombre: "",
      fechaOrden: new Date().toLocaleString(),
      documentacion: "",
      obraSocial: "",
      referente: "",
      enviado: false
    },
    onSubmit: (values) => {
      putData("relevamiento", {
        id: values.id,
        nombre: values.nombre,
        fechaOrden: values.fechaOrden,
        obraSocial: values.obraSocial,
        documentacion: values.documentacion,
        referente: values.referente,
        enviado: values.enviado
      })
        .then((data) => {
          enqueueSnackbar("Se creo la renovación correctamente.", {
            variant: "success",
          });
          navigate("/renovaciones");
        })
        .catch((e) => {
          enqueueSnackbar("Ocurrio un error", {
            variant: "error",
          });
          console.log(e);
        });
    },
  });

  useEffect(() => {
    fetchById("relevamiento", params?.id)
      .then((data) => {
        formik.setValues({
          id: data.id,
          nombre: data.nombre,
          fechaOrden: data.fechaOrden,
          obraSocial: data.obraSocial,
          documentacion: data.documentacion,
          referente: data.referente,
          enviado: data.enviado
        });
        console.log(data)
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
          <Typography variant={"h6"}>
            {" "}
            Relevamiento {formik.values.nombre}
            {params?.id && (
              <IconButton
                aria-label="delete"
                onClick={() => {
                  deleteById("relevamiento", params.id).then((s) =>
                    navigate("/renovaciones")
                  );
                  enqueueSnackbar("Se elimino correctamente la renovacion.", {
                    variant: "info",
                  });
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Typography>
          <Divider sx={{ marginBottom: 1 }} />
          <TextField
            margin={"dense"}
            size={"small"}
            sx={{ m: 1 }}
            fullWidth
            id="nombre"
            name="nombre"
            label="Nombre"
            value={formik.values.nombre}
            onChange={formik.handleChange}
          />

          <TextField
            id="obraSocial"
            margin={"dense"}
            size={"small"}
            sx={{ m: 1 }}
            fullWidth
            name="obraSocial"
            label="Obra social"
            value={formik.values.obraSocial}
            onChange={formik.handleChange}
          />

          <TextField
            id="documentacion"
            margin={"dense"}
            multiline
            minRows={2}
            size={"small"}
            sx={{ m: 1 }}
            fullWidth
            name="documentacion"
            label="Documentación"
            value={formik.values.documentacion}
            onChange={formik.handleChange}
          />

          <TextField
            id="referente"
            name="referente"
            margin={"dense"}
            fullWidth
            select
            label="Referente"
            size={"small"}
            sx={{ m: 1 }}
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
            fullWidth
            sx={{ m: 1 }}
            id="fechaOrden"
            name="fechaOrden"
            defaultValue
            helperText="Fecha de orden"
            value={formik.values.fechaOrden}
            onChange={formik.handleChange}
            type="date"
          />
          <FormControlLabel
            sx={{ m: 1 }}
            control={
              <Checkbox
                checked={formik.values?.enviado}
                name="enviado"
                id="enviado"
                onChange={formik.handleChange}
              />
            }
            label="Enviado"
          />

          <Divider sx={{ marginBottom: 1 }} />
          <Button variant="contained" sx={buttonStyle} type="submit">
            Guardar
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default ReneovacionForm;
