import React, { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button, Stack } from "@mui/material";
import { fetchData } from "../helpers/actions";
import { useNavigate } from "react-router-dom";

export default function Relevamiento() {
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
            referente: s.referente
          };
        });
        setRows(dataRows);
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
        <Button size="small" onClick={() => navigate("/relevamiento")} sx={{color: '#8dd853'}}>
          Añadir Relevamiento
        </Button>
      </Stack>
      <DataGrid
        editMode="row"
        rows={rows}
        columns={[
          { field: "nombre", headerName: "Nombre Completo", minWidth: 200 },
          {
            field: "fechaOrden",
            headerName: "Fecha Orden",
            minWidth: 200,
          },
          { field: "obraSocial", headerName: "Obra Social", minWidth: 200 },
          { field: "referente", headerName: "referente", minWidth: 200 },
          {
            field: "actions",
            type: "actions",
            width: 80,
            getActions: (params) => [
              <GridActionsCellItem
                icon={<VisibilityIcon />}
                label="Ver"
                key={`Button action ${params.id}`}
                onClick={() => navigate(`/relevamiento/${params.id}`)}
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
