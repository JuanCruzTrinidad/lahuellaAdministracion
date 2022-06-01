import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, CardHeader, IconButton } from '@mui/material';
import { red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteById } from '../../helpers/actions';
import { useSnackbar } from 'notistack';


export default function BasicCard({content, fecha, color = "#8dd853", autor = 'YO', id, refresh, setRefresh}) {
  const { enqueueSnackbar } = useSnackbar();

  const onClickDelete = (e, id) => {
    e.preventDefault()
    deleteById("notas", id).then(s => console.log("Se elimino."))
    setRefresh(!refresh) 
    enqueueSnackbar("Se elimino correctamente la nota.", { 
      variant: 'info',
  })
  }
  const newColors = {
    "#8dd853": "#DAF7A6",
    "#f12eaf": "#F1AEDA"
  }
  return (
    <Card sx={{ minWidth: 275, backgroundColor: `${newColors[color]}` }}>
        <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {autor.slice(0,1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={e => onClickDelete(e, id)}>
            <DeleteIcon/>
          </IconButton>
        }
        title={autor}
        subheader={fecha}
      />
      <CardContent sx={{backgroundColor: 'white'}}>
        <Typography variant="body2">
            {content}
        </Typography>
      </CardContent>
    </Card>
  );
}