import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function BasicCard({content, fecha}) {
  return (
    <Card sx={{ minWidth: 275, backgroundColor: "rgb(213, 181, 156)"  }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Nota
        </Typography>
        <Typography variant="body2">
            {content}
        </Typography>
        <Typography  color="text.secondary" alignContent={'flex-end'}>
          {fecha.toDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
}