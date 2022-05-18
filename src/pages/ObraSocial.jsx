import React, { useEffect, useState} from 'react'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Stack } from '@mui/material';
import { fetchData } from '../helpers/actions';
import { useNavigate } from "react-router-dom";


export default function ObrasSociales() {    
  const navigate = useNavigate();
  const [rows, setRows] = useState([])

  useEffect(() => {
    fetchData('obrasocial')
    .then(data => {
      const dataRows = data.map(s => { 
        return { 
          id: s.id, 
          nombre: s.nombre         
        } })
      console.log(dataRows)
      setRows(dataRows)
    })
    .catch(e => console.log(e))
  }, [])

    return (
      <div style={{ height: "85%", width: "70%" }}>
      <Stack
        sx={{ width: '100%', mb: 1 }}
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
      >
        <Button size="small" onClick={() => navigate('/obrasocial')} sx={{color: '#8dd853'}}>
          Añadir obra social
        </Button>
      </Stack>
            <DataGrid  editMode="row" rows={rows} columns={[
          { field: 'nombre', headerName: 'Nombre Obra Social', width: 500},
          {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => [
              <GridActionsCellItem
                icon={<VisibilityIcon />}
                label="Ver"
                key= {`Button action ${params.id}`}
                onClick={() => navigate(`/obrasocial/${params.id}`)}
              />,
            ],
          },
        ]}
        pageSize={20}
        rowsPerPageOptions={[25]} />
    </div>
    )
}
