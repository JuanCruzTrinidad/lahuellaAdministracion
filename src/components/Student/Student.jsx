import { Box, Button, Divider, MenuItem, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { fetchById, fetchData, putData } from '../../helpers/actions';
import { useParams } from "react-router-dom";


const Student = () => {
    const [obrasSociales, setObrasSociales] = useState([])
    const [acompañantes, setAcompañantes] = useState([])

    useEffect(() => {
        fetchData('personas')
        .then(data => {
          const dataPersonas = data.map(d => {
            return {
              value: d.id,
              label: d.nombre
            }
          })
          setAcompañantes(dataPersonas);
        });
        fetchData('obrasocial')
        .then(data => {
          const dataObraSociales = data.map(d => {
            return {
              value: d.id,
              label: d.nombre
            }
          })
          console.log(dataObraSociales)
          setObrasSociales(dataObraSociales);
        });
      }, [])
    const params = useParams();
      const formik = useFormik({
        initialValues: {
            id: '',
            nombre: '',
            escuela: '',
            gradoTurno: '',
            obraSocial: '',
            acompañante: '',
            diagnostico: '',
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
                escuela: values.escuela,
                gradoTurno: values.gradoTurno,
                // familia: {
                //     domicilio: values.familiaDomicilio,
                //     contacto: values.familiaContacto
                // },
                // escuela: {
                //     nombre: values.escuelaNombre,
                //     contacto: values.escuelaContacto,
                //     zona: values.escuelaZona
                // },
                // profesionales: values.profesionales,
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
                escuela: data.escuela,
                gradoTurno: data.gradoTurno,
                observaciones: data.observaciones
            })
        })
        .catch(e => console.log(e))
    }, [formik, params?.id])
    
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
                    id="escuela"
                    size={"small"}
                    sx={{ m: 1, width: '55ch' }}
                    name="escuela"
                    label="Escuela"
                    value={formik.values.escuela}
                    onChange={formik.handleChange}
                    />
                    <TextField
                    margin={"dense"}
                    id="gradoTurno"
                    size={"small"}
                    sx={{ m: 1, width: '55ch' }}
                    name="gradoTurno"
                    label="Grado/Turno"
                    value={formik.values.gradoTurno}
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
                    {obrasSociales.map((option) => (
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
                    
                    <Typography variant={"h6"}> Observaciones </Typography>
                    <Divider sx={{marginBottom: 1}} />

                    <Button color="primary" variant="contained" sx={{alignItems: 'center', width: '100%', marginTop: 3}} type="submit">
                    Guardar
                    </Button>
                    </div>
                </Box>
    )
}

export default Student
