import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { fetchById, putData } from '../../helpers/actions';
import { useParams } from "react-router-dom";

const Persona = () => {
    const params = useParams();
      const formik = useFormik({
        initialValues: {
            id: '',
            nombre: ''          },
        onSubmit: (values) => {
            putData('personas', {
                id: values.id,
                nombre: values.nombre
            }).then(data => alert("Se guardo correctamente"))
            .catch(e => console.log(e))
        },
      });   

    useEffect(() => {
        fetchById('personas', params.id)
        .then(data => {
            formik.setValues({
                id: data.id,
                nombre: data.nombre            })
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
                    <Typography variant={"h6"}> Datos { formik.values.nombre}</Typography>
                    <Divider sx={{marginBottom: 1}} />
                    <TextField
                    margin={"dense"}
                    size={"small"}
                    sx={{ m: 1, width: '100ch' }}
                    id="nombre"
                    name="nombre"
                    label="Nombre Completo"
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    />
                   
                    <Button color="primary" variant="contained" sx={{alignItems: 'center', width: '100%', marginTop: 3}} type="submit">
                    Guardar
                    </Button>
                    </div>
                </Box>
    )
}

export default Persona
