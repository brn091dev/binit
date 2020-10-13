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
import imgBanner from '../images/admind3.jpg'
import {getToken} from '../components/welcome'

const ExcelFile = ExportExcel.ExcelFile
const ExcelSheet = ExportExcel.ExcelSheet
const ExcelColumn = ExportExcel.ExcelColumn

const Admin = () => {

  //consumo de datos por mapa
  const [data, setData] = useState([]);

  //It must be in other component but I haven't sleep
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
    <div>
               
      <div style={{height:"150px"}}>
          <img src={imgBanner} width="100%" height="100%" alt="logo"/>
      </div>
      
      <Container style={{ marginTop: 10,maxWidth:1245 }}>
        <div className="float-right">  
        <AppButton
          nav="/landing"
          name="¡Ir a landing!"
        /> 

        <CSVLink data = {data} filename="csvperonasregistradas" className="btn btn-outline-success" style={{margin:10}}>Exportar CSV</CSVLink>

        <ExcelFile element = {<button className="btn btn-outline-success" style={{margin:10}}>Exportar Excel</button>} filename="excelpersonasregistradas">
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

    </div>
  );
};

export default Admin
