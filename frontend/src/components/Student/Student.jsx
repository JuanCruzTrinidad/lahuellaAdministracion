import { Box, Button, Divider, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik';
import React from 'react'
import BasicCard from '../Common/Card';

const Student = () => {

    const formik = useFormik({
        initialValues: {
          email: 'foobar@example.com',
          password: 'foobar',
        },
        onSubmit: (values) => {
          alert(JSON.stringify(values, null, 2));
        },
      });   
    
    const notas = [ 
        {content: 'bla bla bla bla asdasdasd asdasd asdasd asdasdasdasdasdasdasdasdasdasdasda asdasd', fecha: new Date()}, 
        {content: 'bla bla ba bla', fecha: new Date()},
        {content: 'bla blr bla bla', fecha: new Date()}
    ]
    return (
        <Grid   
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={4}
        >
            <Grid item xs={7}>
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '75%' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}
            >
                    <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    />
                    <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    />
                    <Button color="primary" variant="contained" sx={{width: '75%', alignItems: 'center'}} type="submit">
                    Submit
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={5}>
                {
                    notas.map(({content, fecha}) => (
                        <>
                        <BasicCard key={content} content={content} fecha={fecha} />
                        <Divider sx={{marginTop: 3}} />
                        </>
                    ))
                }
                <TextField
                fullWidth
                id="notas"
                multiline
                rows={3}
                label="Nueva nota"
                />
            </Grid>
        </Grid>
    )
}

export default Student
