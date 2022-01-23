import { Box, Button, Divider, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import React from 'react'
import BasicCard from '../Common/Card';

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
const Student = () => {

    const formik = useFormik({
        initialValues: {
          nombre: 'foobar@example.com',
          grado: 'foobar',
          turno: 'algo',
          obrasocial: 'asdad-asdad',
          acompañante: 'asdad-asdad-dasa-123',
          diagnostico: 'Autismo',
          familiaDomicilio: "Independencia 185",
          familiaContacto: "1169678614",
          escuelaNombre: "EPB N6",
          escuelaContacto: "42908090",
          escuelaZona: "Monte Grande"
        },
        onSubmit: (values) => {
          alert(JSON.stringify(values, null, 2));
        },
      });   
    
    return (
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '55ch' },
            }}
            noValidate
            autoComplete="off"
            alignItems={'center'}
            onSubmit={formik.handleSubmit}
            >
                <div>
                    <Typography variant={"h6"}> Datos personales</Typography>
                    <Divider sx={{marginBottom: 3}} />
                    <TextField
                    id="nombre"
                    name="nombre"
                    label="Nombre completo"
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    />
                    <TextField
                    id="turno"
                    name="turno"
                    label="Turno"
                    value={formik.values.turno}
                    onChange={formik.handleChange}
                    />
                    <TextField
                    id="grado"
                    name="grado"
                    label="Grado"
                    value={formik.values.grado}
                    onChange={formik.handleChange}
                    />
                    <TextField
                    id="obrasocial"
                    select
                    label="Obra Social"
                    value={formik.values.obrasocial}
                    onChange={formik.handleChange}
                    >
                    {obraSociales.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                    </TextField>
                    <TextField
                    id="acompañante"
                    select
                    label="Acompañante"
                    value={formik.values.acompañante}
                    onChange={formik.handleChange}
                    >
                    {acompañantes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                    </TextField>
                    <TextField
                    id="diagnostico"
                    label="Diagnostico"
                    multiline
                    rows={2}
                    value={formik.values.diagnostico}
                    onChange={formik.handleChange}
                    />
                    <Typography variant={"h6"}> Familia</Typography>
                    <Divider sx={{marginBottom: 3}} />
                    <TextField
                    id="familia.contacto"
                    name="familia.contacto"
                    label="Contacto"
                    value={formik.values.familiaContacto}
                    onChange={formik.handleChange}
                    />
                    <TextField
                    id="familia.domicilio"
                    name="familia.domicilio"
                    label="Domicilio"
                    value={formik.values.familiaDomicilio}
                    onChange={formik.handleChange}
                    />
                    <Typography variant={"h6"}> Escuela </Typography>
                    <Divider sx={{marginBottom: 3}} />
                    <TextField
                    id="escuelaNombre"
                    name="escuelaNombre"
                    label="Nombre"
                    value={formik.values.escuelaNombre}
                    onChange={formik.handleChange}
                    />
                    <TextField
                    id="escuelaContacto"
                    name="escuelaContacto"
                    label="Contacto"
                    value={formik.values.escuelaContacto}
                    onChange={formik.handleChange}
                    />
                    <TextField
                    id="escuelaZona"
                    name="escuelaZona"
                    label="Zona"
                    value={formik.values.escuelaZona}
                    onChange={formik.handleChange}
                    />
                    <Button color="primary" variant="contained" sx={{alignItems: 'center'}} type="submit">
                    Submit
                    </Button>
                    </div>
                </Box>
    )
}

export default Student
