import { Button, Stack } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import VisibilityIcon from '@mui/icons-material/Visibility';
import React from 'react'

export default function Families() {

    const rows = [{id: 'asdads', alumno: "asd-asd"}]
    return (
        <div style={{ height: '90% ', width: '100%' }}>
        <Stack
        sx={{ width: '100%', mb: 1, alignContent: 'flex-end' }}
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
      >
        <Button size="small" onClick={() => console.log("Añadir familia")}>
          Añadir familia
        </Button>
      </Stack>
            <DataGrid  editMode="row" rows={rows} columns={[
          { field: 'alumno', headerName: 'Alumno', editable: true, width: 200},
          { field: 'domicilio', headerName: 'Domicilio', editable: true, width: 200 },
          { field: 'contacto', headerName: 'Contacto', editable: true, width: 200 },
          {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => [
              <GridActionsCellItem
                icon={<VisibilityIcon />}
                label="Ver"
                key= {`Button action ${params.id}`}
                onClick={() => console.log(params.id)}
              />,
            ],
          },
        ]} />
    </div>
    )
}
