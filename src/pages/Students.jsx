import React, { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Button, Stack, Tab, Tabs } from "@mui/material";
import { fetchData } from "../helpers/actions";
import { useNavigate } from "react-router-dom";
import { reportStudents } from "../helpers/excel";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Students() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [value, setValue] = useState("Barbara");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const data = rows.filter((a) => a?.referente === newValue);
    if (data) setRows(data);
  };

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
      <Tabs value={value} onChange={handleChange} centered indicatorColor="secondary"  textColor="secondary">
        <Tab value={"Barbara"} label={`Barbara-${rows.length}`} />
        <Tab value={"Bahiana"} label={`Bahiana-${rows.length}`} />
        <Tab value={"Jimena"} label={`Jimena-${rows.length}`}/>
      </Tabs>
      <Stack
        sx={{ width: "100%", mb: 1 }}
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
      >
        <Button size="small" onClick={() => reportStudents(rows)} sx={{color: '#8dd853'}}>
          Descargar reporte
        </Button>
        <Button size="small" onClick={() => navigate("/student")} sx={{color: '#8dd853'}}>
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
