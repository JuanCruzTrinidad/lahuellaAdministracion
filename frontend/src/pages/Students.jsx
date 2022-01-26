import React, { useEffect, useState} from 'react'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Stack } from '@mui/material';
import { fetchData } from '../helpers/actions';
import { useNavigate } from "react-router-dom";

const obraSociales = [
  {
      value: 'asdad-asdad',
      label: 'OSDE'
  },
  {
      value: 'asdad-asdad-dasa',
      label: 'OSPEP'
  }
]

const acompañantes = [
  {
      value: 'asdad-asdad-123',
      label: 'Nombre 1'
  },
  {
      value: 'asdad-asdad-dasa-123',
      label: 'Nombre 2'
  }
]


export default function Students() {    
  const navigate = useNavigate();
  const [rows, setRows] = useState([])

  useEffect(() => {
    fetchData('alumnos')
    .then(data => {
      const dataRows = data.map(s => { 
        return { 
          id: s.id, 
          nombre: s.nombre,
          escuela: s.escuela.nombre,
          grado: s.grado,
          acompañante: s.acompañante,
          obraSocial: s.obraSocial
         } })
      console.log(dataRows)
      setRows(dataRows)
    })
    .catch(e => console.log(e))
  }, [])

    return (
      <div style={{ height: '90%', width: '99%' }}>
        <Stack
        sx={{ width: '100%', mb: 1 }}
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
      >
        <Button size="small" onClick={() => navigate('/student')}>
          Añadir niñe
        </Button>
      </Stack>
            <DataGrid  editMode="row" rows={rows} columns={[
          { field: 'nombre', headerName: 'Nombre Completo', width: 200},
          { field: 'escuela', headerName: 'Escuela', width: 200},
          { field: 'grado', headerName: 'Grado', width: 200 },
          { field: 'acompañante', headerName: 'Acompañante', 
            valueOptions: acompañantes.map(s => s.value), width: 150,
            valueFormatter: ({value}) =>  acompañantes.find(s => s.value === value)?.label
          },
          { field: 'obraSocial', headerName: 'Obra Social',
          valueOptions: obraSociales.map(s => s.value), width: 150,
          valueFormatter: ({value}) =>  obraSociales.find(s => s.value === value)?.label
          },
          {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => [
              <GridActionsCellItem
                icon={<VisibilityIcon />}
                label="Ver"
                key= {`Button action ${params.id}`}
                onClick={() => navigate(`/student/${params.id}`)}
              />,
            ],
          },
        ]} />
    </div>
    )
}
