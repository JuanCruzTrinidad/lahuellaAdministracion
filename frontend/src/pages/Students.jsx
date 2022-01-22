import React from 'react'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';

const rows = [
  { id: 1, nombre: 'Francisco', diagnostico: 'Ejemplo diagnostico', escuela: 'asd-fdas', grado: 'cuarto', acompañante: 'Nombre 1', obraSocial: 'OSDE', observacion: 'Una observacion'},
  { id: 2, nombre: 'Francisco', diagnostico: 'Ejemplo diagnostico', escuela: 'bbb-bbb', grado: 'cuarto', acompañante: 'Nombre 1', obraSocial: 'OSDE', observacion: 'Una observacion'},

];

const escuelas = [ {
  id: 'asd-fdas',
  name: 'EPB6'
},
{
  id: 'bbb-bbb',
  name: 'Escuela 15'
}]

export default function Students() {    
    return (
      <div style={{ height: '100%', width: '100%' }}>
            <DataGrid  editMode="row" rows={rows} columns={[
          { field: 'nombre', headerName: 'Nombre Completo', editable: true, width: 200},
          { field: 'diagnostico', headerName: 'Diagnostico', editable: true, width: 200 },
          { field: 'escuela', headerName: 'Escuela', editable: true, type: 'singleSelect', 
            valueOptions: escuelas.map(s => s.id), width: 150,
            valueFormatter: ({value}) =>  escuelas.find(s => s.id === value)?.name
          },
          { field: 'grado', headerName: 'Grado', editable: true, width: 200 },
          { field: 'acompañante', headerName: 'Acompañante', editable: true, type: 'singleSelect', valueOptions: ["Nombre 2" , "Nombre 1"], width: 200 },
          { field: 'obraSocial', headerName: 'Obra Social', editable: true, type: 'singleSelect', valueOptions: ["OSPEP", "OSDE"], width: 150 },
          { field: 'observacion', headerName: 'Observacion', editable: true, width: 200 },
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
