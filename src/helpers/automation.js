// import { putData } from './actions'
// import readXlsxFile from 'read-excel-file'

import { fetchData } from "./actions";

// // const map = {
// //     'NOMBRE Y APELLIDO': 'nombre',
// //     'DIAGNOSTICO': 'diagnostico',
// //     'DNI': 'dni',
// //     'O.S': 'obraSocial',
// //     'ESCUELA': 'escuela',
// //     'AÑO/TURNO/NIVEL': 'gradoTurno',
// //     'AE': 'acompañante'
// //   }

//   // const map = {
//   //   'ACOMPAÑADX': 'nombre',
//   //   'DX': 'diagnostico',
//   //   'DNI': 'dni',
//   //   'O.S.': 'obraSocial',
//   //   'ESCUELA': 'escuela',
//   //   'NIVEL/AÑO': 'gradoTurno',
//   //   'ACOMPAÑANTE 2022': 'acompañante'
//   // }
//   const map = {
//     'NOMBRE Y APELLIDO': 'nombre',
//     'DNI': 'dni',
//     'O.S': 'obraSocial',
//     'ESCUELA': 'escuela',
//     'AÑO/TURNO/NIVEL': 'gradoTurno',
//     'AE': 'acompañante'
//   }
//   export const uploadData  = (data) => readXlsxFile(data, { map }).then(({ rows, errors }) => {
//     console.log(errors)
//     rows.forEach(a => {
//          a['referente'] = "Bahiana";
//          console.log(a)
//          putData('alumnos', a).then(a => "Se subio")
//         } )
//   })

const getByDNI = (dni) => fetchData("alumnos").then(data => data.find(a => a.dni === dni));

