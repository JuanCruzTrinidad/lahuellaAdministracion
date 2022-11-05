import React, { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button, Stack, Typography } from "@mui/material";
import { fetchData } from "../helpers/actions";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

export default function Renovaciones() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchData("relevamiento")
      .then((data) => {
        const dataRows = data.map((s) => {
          return {
            id: s.id,
            nombre: s.nombre,
            fechaOrden: s.fechaOrden,
            obraSocial: s.obraSocial,
            referente: s.referente,
            enviado: s.enviado,
          };
        });
        setRows(dataRows);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div style={{ height: "85%", width: "70%" }}>
      <Typography variant={"h6"}> Renovaciones 2023</Typography>
      <Stack
        sx={{ width: "100%", mb: 1 }}
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
      >
        <Button
          size="small"
          onClick={() => navigate("/renovacion")}
          sx={{ color: "#8dd853" }}
        >
          Añadir Renovación
        </Button>
      </Stack>
      <DataGrid
        editMode="row"
        rows={rows}
        sortModel={ [{field: 'nombre', sort: 'asc'}]}
        columns={[
          { field: "nombre", headerName: "Nombre Completo", minWidth: 200 },
          {
            field: "fechaOrden",
            headerName: "Fecha Orden",
            minWidth: 200,
          },
          { field: "obraSocial", headerName: "Obra Social", minWidth: 200 },
          { field: "referente", headerName: "Referente", minWidth: 200 },
          {
            field: "enviado",
            headerName: "Enviado",
            renderCell: (d) => (d.value ? <CheckIcon /> : <ClearIcon />),
          },
          {
            field: "actions",
            type: "actions",
            width: 80,
            getActions: (params) => [
              <GridActionsCellItem
                icon={<VisibilityIcon />}
                label="Ver"
                key={`Button action ${params.id}`}
                onClick={() => navigate(`/renovacion/${params.id}`)}
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
