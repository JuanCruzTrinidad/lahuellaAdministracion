import {
  Box,
  Button,
  Chip,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buttonStyle } from "../components/styles";
import { fetchData } from "../helpers/actions";
import { reportStudents } from "../helpers/excel";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Search() {
  const [dataAlumnos, setDataAlumnos] = useState([]);
  const [dataBusqueda, setDataBusqueda] = useState([]);
  const [visible, setVisible] = useState(false);
  const campos = [{ value: "obraSocial", label: "Obra Social" }, { value: "escuela", label: "Escuela" }, { value: "acompañante", label: "Acompañante" }];
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      busqueda: "",
      campo: "",
    },
    onSubmit: (values) => {
      const newData = dataAlumnos.filter((a) => {
        return a[values?.campo]?.toUpperCase().includes(values?.busqueda?.toUpperCase());
      });
      setVisible(true);
      setDataBusqueda(newData || []);
    },
  });

  useEffect(() => {
    fetchData("alumnos")
      .then((data) => {
        setDataAlumnos(data);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {}, [dataBusqueda]);
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
          <Typography variant={"h6"}>Buscador</Typography>
          <Divider sx={{ marginBottom: 1 }} />
          <TextField
            margin={"dense"}
            size={"small"}
            sx={{ m: 1, width: "63ch" }}
            id="busqueda"
            name="busqueda"
            label="Busqueda"
            value={formik.values.busqueda}
            onChange={formik.handleChange}
          />

          <TextField
            id="campo"
            name="campo"
            margin={"dense"}
            select
            label="Campo clave"
            size={"small"}
            sx={{ m: 1, width: "63ch" }}
            value={formik.values.campo}
            onChange={formik.handleChange}
          >
            {campos.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <Divider sx={{ marginBottom: 1 }} />
          <Button
            color="primary"
            variant="contained"
            sx={buttonStyle}
            type="submit"
          >
            Buscar
          </Button>
        </div>
      </Box>
      {visible && (
        <>
          <Stack
            sx={{ width: "100%", mb: 1 }}
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            <Chip
              label={`${dataBusqueda.length} CASOS ENCONTRADOS`}
              sx={{ backgroundColor: "#8dd853", color: "white" }}
            />
            <Button
              size="small"
              onClick={() => reportStudents(dataBusqueda)}
              sx={{ color: "#8dd853" }}
            >
              Descargar reporte
            </Button>
          </Stack>
          {}
          <DataGrid
            rows={dataBusqueda}
            pageSize={50}
            dataAlumnosPerPageOptions={[50]}
            sortModel={[{ field: "nombre", sort: "asc" }]}
            columns={[
              { field: "nombre", headerName: "Nombre Completo", minWidth: 800 },
              {
                field: "actions",
                type: "actions",
                width: 80,
                getActions: (params) => [
                  <GridActionsCellItem
                    icon={<VisibilityIcon />}
                    label="Ver"
                    key={`Button action ${params.id}`}
                    onClick={() => navigate(`/student/${params.id}`)}
                  />,
                ],
              },
            ]}
          />
        </>
      )}
    </div>
  );
}
