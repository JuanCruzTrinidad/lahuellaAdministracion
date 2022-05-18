import writeXlsxFile from "write-excel-file";

const schemaStudents = [
  // Column #1
  {
    column: "Nombre",
    type: String,
    value: (student) => student.nombre,
  },
  // Column #2
  {
    column: "Escuela",
    type: String,
    value: (student) => student.escuela,
  },
  // Column #3
  {
    column: "Turno/Año",
    type: String,
    value: (student) => student.gradoTurno,
  },
  // Column #4
  {
    column: "Obra Social",
    type: String,
    value: (student) => student.obraSocial,
  },
  // Column #5
  {
    column: "AE",
    type: String,
    value: (student) => student.acompañante,
  },
];

  
const schemaPersonas = [
  // Column #1
  {
    column: "Nombre",
    type: String,
    value: (ae) => ae.nombre
  },
  // Column #2
  {
    column: "Niñe",
    type: String,
    value: (ae) => ae.alumno
  },
  // Column #3
  {
    column: "Referente",
    type: String,
    value: (ae) => ae.referente
  },
  // Column #4
  {
    column: "Alta",
    type: Date,
    format: 'mm/dd/yyyy',
    value: (ae) => ae.alta
  },
  // Column #5
  {
    column: "Baja",
    type: Date,
    format: 'mm/dd/yyyy',
    value: (ae) => ae.baja
  },
];
const reportStudents = (data) =>
  writeXlsxFile(data, {
    schema: schemaStudents,
    fileName: "reporte.xlsx",
    headerStyle: {
        backgroundColor: '#8DFCA1',
        fontWeight: 'bold',
        align: 'center'
      }
  }).then((s) => console.log("Se guardo"));

const reportAcompañantes = (data) => {
    writeXlsxFile(data, {
        schema: schemaPersonas,
        fileName: "reporte.xlsx",
        headerStyle: {
            backgroundColor: '#8DFCA1',
            fontWeight: 'bold',
            align: 'center'
          }
      }).then((s) => console.log("Se guardo"))
}


export { reportStudents, reportAcompañantes };
