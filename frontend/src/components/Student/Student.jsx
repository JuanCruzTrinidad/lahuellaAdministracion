import { Box, Button, Divider, MenuItem, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { fetchById, putData } from '../../helpers/actions';
import { useParams } from "react-router-dom";

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
    const params = useParams();
      const formik = useFormik({
        initialValues: {
            id: '',
            nombre: '',
            grado: '',
            turno: '',
            obraSocial: '',
            acompañante: '',
            diagnostico: '',
            familiaDomicilio: "",
            familiaContacto: "",
            escuelaNombre: "",
            escuelaContacto: "",
            escuelaZona: "",
            profesionales: "",
            observaciones: ""
          },
        onSubmit: (values) => {
            putData('alumnos', {
                id: values.id,
                nombre: values.nombre,
                grado:  values.grado,
                turno: values.turno,
                obraSocial: values.obraSocial,
                acompañante: values.acompañante,
                familia: {
                    domicilio: values.familiaDomicilio,
                    contacto: values.familiaContacto
                },
                escuela: {
                    nombre: values.escuelaNombre,
                    contacto: values.escuelaContacto,
                    zona: values.escuelaZona
                },
                profesionales: values.profesionales,
                observaciones: values.observaciones,
                diagnostico: values.diagnostico
            }).then(data => alert("Se guardo correctamente"))
            .catch(e => console.log(e))
        },
      });   

    useEffect(() => {
        fetchById('alumnos', params.id)
        .then(data => {
            formik.setValues({
                id: data.id,
                nombre: data.nombre,
                grado: data.grado,
                turno: data.turno,
                obraSocial: data.obraSocial,
                acompañante: data.acompañante,
                diagnostico: data.diagnostico,
                familiaContacto: data.familia.contacto,
                familiaDomicilio: data.familia.domicilio,
                escuelaNombre: data.escuela.nombre,
                escuelaContacto: data.escuela.contacto,
                escuelaZona: data.escuela.zona,
                profesionales: data.profesionales,
                observaciones: data.observaciones
            })
        })
        .catch(e => console.log(e))
    }, [params?.id])
    
    return (
            <Box
            component="form"
            noValidate
            autoComplete="off"
            alignItems={'center'}
            sx={{margin: 3}}
            onSubmit={formik.handleSubmit}
            >
                <div> 
                    <Typography variant={"h6"}> Datos personales { formik.values.nombre}</Typography>
                    <Divider sx={{marginBottom: 1}} />
                    <TextField
                    margin={"dense"}
                    size={"small"}
                    sx={{ m: 1, width: '55ch' }}
                    id="nombre"
                    name="nombre"
                    label="Nombre completo"
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    />
                    <TextField
                    margin={"dense"}
                    id="turno"
                    size={"small"}
                    sx={{ m: 1, width: '55ch' }}
                    name="turno"
                    label="Turno"
                    value={formik.values.turno}
                    onChange={formik.handleChange}
                    />
                    <TextField
                    margin={"dense"}
                    id="grado"
                    size={"small"}
                    sx={{ m: 1, width: '55ch' }}
                    name="grado"
                    label="Grado"
                    value={formik.values.grado}
                    onChange={formik.handleChange}
                    />
                    <TextField
                    id="obraSocial"
                    name="obraSocial"
                    margin={"dense"}
                    select
                    size={"small"}
                    sx={{ m: 1, width: '55ch' }}
                    label="Obra Social"
                    value={formik.values.obraSocial}
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
                    name="acompañante"
                    margin={"dense"}
                    select
                    label="Acompañante"
                    size={"small"}
                    sx={{ m: 1, width: '55ch' }}
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
                    name="diagnostico"
                    margin={"dense"}
                    label="Diagnostico"
                    multiline
                    size={"small"}
                    sx={{ m: 1, width: '55ch' }}
                    rows={2}
                    value={formik.values.diagnostico}
                    onChange={formik.handleChange}
                    />
                    <Typography variant={"h6"}> Familia</Typography>
                    <Divider sx={{marginBottom: 1}} />
                    <TextField
                    id="familiaContacto"
                    name="familiaContacto"
                    label="Contacto"
                    size={"small"}
                    sx={{ m: 1, width: '55ch' }}
                    value={formik.values.familiaContacto}
                    onChange={formik.handleChange}
                    />
                    <TextField
                    id="familiaDomicilio"
                    name="familiaDomicilio"
                    label="Domicilio"
                    size={"small"}
                    sx={{ m: 1, width: '55ch' }}
                    value={formik.values.familiaDomicilio}
                    onChange={formik.handleChange}
                    />
                    <Typography variant={"h6"}> Escuela </Typography>
                    <Divider sx={{marginBottom: 1}} />
                    <TextField
                    id="escuelaNombre"
                    margin={"dense"}
                    name="escuelaNombre"
                    label="Nombre"
                    size={"small"}
                    sx={{ m: 1, width: '55ch' }}
                    value={formik.values.escuelaNombre}
                    onChange={formik.handleChange}
                    />
                    <TextField
                    id="escuelaContacto"
                    margin={"dense"}
                    name="escuelaContacto"
                    label="Contacto"
                    size={"small"}
                    sx={{ m: 1, width: '55ch' }}
                    value={formik.values.escuelaContacto}
                    onChange={formik.handleChange}
                    />
                    <TextField
                    id="escuelaZona"
                    margin={"dense"}
                    name="escuelaZona"
                    label="Zona"
                    size={"small"}
                    sx={{ m: 1, width: '55ch' }}
                    value={formik.values.escuelaZona}
                    onChange={formik.handleChange}
                    />
                    <Typography variant={"h6"}> Profesionales </Typography>
                    <Divider sx={{marginBottom: 1}} />
                    <TextField
                    id="profesionales"
                    margin={"dense"}
                    multiline
                    size={"small"}
                    sx={{ m: 1}}
                    fullWidth
                    rows={2}
                    name="profesionales"
                    label="Profesionales"
                    value={formik.values.profesionales}
                    onChange={formik.handleChange}
                    />
                    <Typography variant={"h6"}> Observaciones </Typography>
                    <Divider sx={{marginBottom: 1}} />
                    <TextField
                    id="observaciones"
                    margin={"dense"}
                    multiline
                    size={"small"}
                    sx={{ m: 1}}
                    fullWidth
                    name="observaciones"
                    label="Observaciones"
                    value={formik.values.observaciones}
                    onChange={formik.handleChange}
                    />
                    <Button color="primary" variant="contained" sx={{alignItems: 'center', width: '100%', marginTop: 3}} type="submit">
                    Guardar
                    </Button>
                    </div>
                </Box>
    )
}

export default Student
