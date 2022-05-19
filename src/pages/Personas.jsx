import React, { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button, Stack } from "@mui/material";
import { fetchData } from "../helpers/actions";
import { useNavigate } from "react-router-dom";
import { reportAcompañantes } from '../helpers/excel';

export default function Personas() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [dataToReport, setDataToReport] =  useState([]);

  useEffect(() => {
    fetchData("personas")
      .then((data) => {
        const dataRows = data.map((s) => {
          return {
            id: s.id,
            nombre: s.nombre,
            disponibilidad: s.disponibilidad,
            zona: s.zona,
          };
        });
        console.log(dataRows);
        setRows(dataRows);
        setDataToReport(data.map(s => {
          return {
            nombre: s.nombre,
            alumno: s.alumno,
            referente: s.referente,
            alta: s.alta? new Date(s.alta): '',
            baja: s.baja ? new Date(s.baja) : '',
          } 
        }))
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div style={{ height: "85%", width: "70%" }}>
      <Stack
        sx={{ width: "100%", mb: 1 }}
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
      >
        <Button size="small" onClick={() => reportAcompañantes(dataToReport)} sx={{color: '#8dd853'}}>
          Descargar reporte
        </Button>
        <Button size="small" onClick={() => navigate("/persona")} sx={{color: '#8dd853'}}>
          Añadir Acompañante
        </Button>
      </Stack>
      <DataGrid
        editMode="row"
        rows={rows}
        columns={[
          { field: "nombre", headerName: "Nombre Completo", minWidth: 250 },
          {
            field: "disponibilidad",
            headerName: "Disponibilidad",
            minWidth: 250,
          },
          { field: "zona", headerName: "Zona", minWidth: 250 },
          {
            field: "actions",
            type: "actions",
            width: 80,
            getActions: (params) => [
              <GridActionsCellItem
                icon={<VisibilityIcon />}
                label="Ver"
                key={`Button action ${params.id}`}
                onClick={() => navigate(`/persona/${params.id}`)}
              />,
            ],
          },
        ]}
        pageSize={25}
        rowsPerPageOptions={[25]}
      />
    </div>
  );
}
