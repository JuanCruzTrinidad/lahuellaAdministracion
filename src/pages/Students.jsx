import React, { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button, Stack, Tab, Tabs } from "@mui/material";
import { fetchData } from "../helpers/actions";
import { useNavigate } from "react-router-dom";

const alumnos1 = [{id: "asdads123", nombre: "Juancito", user: 'user1'}, {id: "asdads12341", nombre: "Juancito 2", user: 'user2'}]


export default function Students() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [value, setValue] = useState('user1');

  const handleChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue);
    const data = alumnos1.filter(a=> a?.user === newValue);
    if (data) setRows(data)
  };
  useEffect(() => {
    // fetchData("alumnos")
    //   .then((data) => {
    //     const dataRows = data.map((s) => {
    //       return {
    //         id: s.id,
    //         nombre: s.nombre,
    //       };
    //     });
    //     console.log(dataRows);
    //     setRows(dataRows);
    //   })
    //   .catch((e) => console.log(e));
    setRows(alumnos1)
  }, []);

  return (
    <div style={{ height: "85%", width: "70%" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab value={'user1'} label="Item One" />
        <Tab value={'user2'} label="Item Two" />
        <Tab value={'user3'} label="Item Three" />
      </Tabs>
      <Stack
        sx={{ width: "100%", mb: 1 }}
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
      >
        <Button size="small" onClick={() => navigate("/student")}>
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
