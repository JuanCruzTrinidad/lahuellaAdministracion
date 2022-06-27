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
  {
    column: "Alta",
    type: String,
    value: (student) => student.alta,
  },
  {
    column: "Baja",
    type: String,
    value: (student) => student.baja,
  }
];

const schemaOneStudent = [
    // Column #2
    {
      column: "ALUMNO",
      type: String,
      width: 30,
      value: (student) => student.nombre,
    },
      // Column #1
  {
    column: "OBRA SOCIAL",
    type: String,
    width: 30,
    value: (student) => student.obraSocial,
  },
  {
    column: "ESCUELA",
    type: String,
    width: 30,
    value: (student) => student.escuela,
  },
  {
    column: "ACOMPAÑANTE EXTERNO",
    type: String,
    width: 30,
    value: (student) => student.acompañante,
  },
  {
    column: "INICIO",
    type: String,
    value: (student) => student.alta
  },
  // Column #3
  {
    column: "SITUACION",
    type: String,
    wrap: true,
    width: 50,
    height: 30,
    value: (student) =>  {
      const data = student?.observaciones?.map((o) => o?.texto).join(". ")
      return data;
     },
  },
];

const schemaPersonas = [
  // Column #1
  {
    column: "Nombre",
    type: String,
    value: (ae) => ae.nombre,
  },
  // Column #2
  {
    column: "Niñe",
    type: String,
    value: (ae) => ae.alumno,
  },
  // Column #3
  {
    column: "Referente",
    type: String,
    value: (ae) => ae.referente,
  },
  // Column #4
  {
    column: "Alta",
    type: Date,
    format: "mm/dd/yyyy",
    value: (ae) => ae.alta,
  },
  // Column #5
  {
    column: "Baja",
    type: Date,
    format: "mm/dd/yyyy",
    value: (ae) => ae.baja,
  },
];
const reportStudents = (data) => {
  const dataO = [...data];
  dataO.sort((a, b) => a !== undefined && b !== undefined && a?.nombre?.localeCompare(b?.nombre))
  writeXlsxFile(dataO, {
    schema: schemaStudents,
    fileName: "reporte.xlsx",
    headerStyle: {
      backgroundColor: "#8DFCA1",
      fontWeight: "bold",
      align: "center",
    },
  }).then((s) => console.log("Se guardo"));
}

const reportOneStudent = (data) => {
  const dataO = [...data];
  dataO.sort((a, b) => a !== undefined && b !== undefined && a?.nombre?.localeCompare(b?.nombre))
  writeXlsxFile(dataO, {
    schema: schemaOneStudent,
    fileName: "reporte.xlsx",
    headerStyle: {
      backgroundColor: "#8DFCA1",
      fontWeight: "bold",
      align: "center",
    },
  }).then((s) => console.log("Se guardo"));
}
 
const reportAcompañantes = (data) => {
  writeXlsxFile(data, {
    schema: schemaPersonas,
    fileName: "reporte.xlsx",
    headerStyle: {
      backgroundColor: "#8DFCA1",
      fontWeight: "bold",
      align: "center",
    },
  }).then((s) => console.log("Se guardo"));
};

export { reportStudents, reportAcompañantes, reportOneStudent };
