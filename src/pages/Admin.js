import React, { useEffect, useState, useMemo } from 'react';

import {
  Container
} from 'reactstrap';

import TableContainer from '../components/TableContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SelectColumnFilter } from '../components/filters';
import { CSVLink } from "react-csv";
import ExportExcel from 'react-export-excel';
import AppButton from '../components/AddButton'

import {getToken} from '../components/welcome'

const ExcelFile = ExportExcel.ExcelFile
const ExcelSheet = ExportExcel.ExcelSheet
const ExcelColumn = ExportExcel.ExcelColumn

const Admin = () => {

  //consumo de datos por mapa
  const [data, setData] = useState([]);

  useEffect(() => {
    const doFetch = async () => {
      var tokk = await getToken()
      let config ={
        method: 'GET',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'apikey':tokk
        },
      }
      const response = await fetch('http://localhost:8000/api/exercises',config);
      const body = await response.json();
      //const contacts = body.results;
      console.log(body);
      setData(body);
    };
    doFetch();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Tipo identificacion',
        accessor: 'tipo_identificacion',
        //disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: 'equals',
      },
      {
        Header: 'Número identificacion',
        accessor: 'identificacion',
      },
      {
        Header: 'Nombres',
        accessor: 'nombres',
      },
      {
        Header: 'Apellidos',
        accessor: 'apellidos',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Fecha ingreso',
        accessor: 'fecha_ingreso',
      },
    ],
    []
  );

  return (
    
    <Container style={{ marginTop: 100,maxWidth:1245 }}>
      <div className="float-right">  
      <AppButton
        nav="/landing"
        name="¡Registrate con nosotros!"
      /> 

      <CSVLink data = {data} className="btn btn-outline-success" style={{margin:10}}>Exportar CSV</CSVLink>

      <ExcelFile element = {<button className="btn btn-outline-success" style={{margin:10}}>Exportar Excel</button>} filename="nombreArchivo">
        <ExcelSheet data={data} name="Personas">
          <ExcelColumn label="Tipo identificacion" value="tipo_identificacion"/>
          <ExcelColumn label="Número identificacion" value="identificacion"/>
          <ExcelColumn label="Nombres" value="nombres"/>
          <ExcelColumn label="Apellidos" value="apellidos"/>
          <ExcelColumn label="Email" value="email"/>
          <ExcelColumn label="Fecha registro" value="fecha_ingreso"/>
        </ExcelSheet>
      </ExcelFile>
      </div>

      <TableContainer
        columns={columns}
        data={data}
      />
    </Container>
  );
};

export default Admin
