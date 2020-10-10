import React from 'react'
import {getToken} from './welcome'
import {ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator'
import InputLabel from '@material-ui/core/InputLabel';


class LandingForm extends React.Component{

    state = {
        values: []
    }

    async componentDidMount(){
        await this.fetchTiposIdentificaciones()

        // ValidatorForm.addValidationRule("isValidName",(string)=>/[a-zA-Z \u00E0-\u00FC]{1,20}/g.test(string));
        // ValidatorForm.addValidationRule("idValidEmail",(string)=>/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(string));
        //ValidatorForm.addValidationRule("idNumeric",(string)=>/^[0-9]/g.test(string));
    }

    fetchTiposIdentificaciones = async () =>{
        var tokk = await getToken()
        
        let config ={
            method: 'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'apikey':tokk
            },
        }
        let res = await fetch('http://localhost:8000/api/identificaciones',config)
        let data = await res.json()

        this.setState({
            values:data            
        })
        
    }

    render(){
       
        const { onChange, onSubmit, form } = this.props

        var f = new Date();
        var actualDate = f.getFullYear() +"-" + (f.getMonth() +1) + "-" + f.getDate() + " " + f.getHours()+":" + f.getMinutes()+":" + f.getSeconds();

        form.fecha_ingreso = actualDate
        //const {errors} = form
        return (
            <div className="container">
                <ValidatorForm
                    onSubmit={onSubmit}
                >                   
                    <div className="form-group">
                    <InputLabel className="control-label col-sm-offset-2 col-sm-2" htmlFor="ti"></InputLabel>                                   
                        <SelectValidator 
                            labelId="ti"
                            id="tia" 
                            className="form-control" 
                            name="id_tipo_identificacion" 
                            onChange={onChange} 
                            value={form.id_tipo_identificacion}
                            validators={["required"]}
                            errorMessages={["Seleccione tipo de documento"]}
                            >                            
                            {/* <option key="0" value="0">SELECCIONE TIPO DE IDENTIFICACIÓN</option> */}
                            {                            
                                this.state.values.map((obj) => {
                                    return <option key={obj.id} value={obj.id_tipo_identificacion}>{obj.descripcion}</option>
                                })
                            }
                        </SelectValidator>
                        {/* {errors.id_tipo_identificacion.length > 0 && 
                            <span >{errors.id_tipo_identificacion}</span>} */}
                    </div> 
                    <div className="form-group">
                        <TextValidator 
                            type="text" 
                            className="form-control" 
                            placeholder="Número de identificacion" 
                            name="identificacion"
                            onChange={onChange}
                            value={form.title}
                            // validators = {["required"]}
                            // errorMessages= {["Campo requerido"]}
                        />
                        {/* {errors.identificacion.length > 0 && 
                            <span >{errors.identificacion}</span>} */}
                    </div>
                     <div className="form-group">
                        <TextValidator 
                            type="text" 
                            className="form-control" 
                            placeholder="Nombres" 
                            name="nombres"
                            onChange={onChange}
                            value={form.nombres}
                            validators = {["required"]}
                            errorMessages= {["Campo requerido"]}
                            />
                        {/* {errors.nombres.length > 0 && 
                            <span >{errors.nombres}</span>} */}
                    </div>
                    <div className="form-group">
                        <TextValidator 
                            type="text" 
                            className="form-control" 
                            placeholder="Apellidos" 
                            name="apellidos"
                            onChange={onChange}
                            value={form.apellidos}
                            validators = {["required"]}
                            errorMessages= {["Campo requerido"]}
                        />
                        {/* {errors.apellidos.length > 0 && 
                                <span >{errors.apellidos}</span>} */}
                    </div>
                    <div className="form-group">
                        <TextValidator 
                            type="email" 
                            className="form-control" 
                            placeholder="Email" 
                            name="email"
                            onChange={onChange}
                            value={form.email}
                            validators = {["required"]}
                            errorMessages= {["Campo requerido"]}
                        />
                        {/* {errors.email.length > 0 && 
                                <span >{errors.email}</span>} */}
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-outline-primary"
                        onClick={form.handleSumbit}
                    >
                        Registrar
                    </button>
                </ValidatorForm>
            </div>
        )
    }
}

export default LandingForm