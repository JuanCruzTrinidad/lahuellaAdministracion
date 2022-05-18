import React, { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button, Stack, Tab, Tabs } from "@mui/material";
import { fetchData } from "../helpers/actions";
import { useNavigate } from "react-router-dom";
import { reportStudents } from "../helpers/excel";

export default function Students() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [value, setValue] = useState("Barbara");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const data = rows.filter((a) => a?.referente === newValue);
    if (data) setRows(data);
  };

  const clickDescargar = () =>{
    let obrasSociales = [];
    let acompañantes = [];
    fetchData("personas").then((data) => {
      acompañantes = data.map((d) => {
        return {
          value: d.id,
          label: d.nombre,
        };
      });
      fetchData("obrasocial").then((data) => {
        obrasSociales = data.map((d) => {
          return {
            value: d.id,
            label: d.nombre,
          };
        });
        const newDataParsed = rows.map((s) => {
          return {
            nombre: s.nombre,
            escuela: s.escuela,
            gradoTurno: s.gradoTurno,
            obraSocial: obrasSociales && obrasSociales?.find((o) => o?.value === s?.obraSocial)
              ?.label,
            acompañante: acompañantes && acompañantes?.find((a) => a?.value === s?.acompañante)
              ?.label,
          };
        });
        reportStudents(newDataParsed)
        console.log(newDataParsed);
      });
    });
  }

  useEffect(() => {
    fetchData("alumnos")
      .then((data) => {
        const dataReferente = data.filter((a) => a?.referente === value);
        setRows(dataReferente);
      })
      .catch((e) => console.log(e));
  }, [value]);

  return (
    <div style={{ height: "85%", width: "70%" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab value={"Barbara"} label="Barbara" />
        <Tab value={"Bahiana"} label="Bahiana" />
        <Tab value={"Jimena"} label="Jimena" />
      </Tabs>
      <Stack
        sx={{ width: "100%", mb: 1 }}
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
      >
        <Button size="small" onClick={() => clickDescargar()}>
          Descargar reporte
        </Button>
        <Button size="small" onClick={() => navigate("/student")}>
          Añadir niñe
        </Button>
      </Stack>
      <DataGrid
        editMode="row"
        rows={rows}
        pageSize={20}
        rowsPerPageOptions={[25]}
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
    </div>
  );
}
