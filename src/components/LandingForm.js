import React from 'react'
import {getToken, getTiposIdentificaciones, postPersona} from './welcome'
import {ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator'
import InputLabel from '@material-ui/core/InputLabel';
import "../styles/modal.css";

import Modal from 'react-awesome-modal';
import { Button } from '@material-ui/core'
import AddButton from '../components/AddButton'

const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validIdentification = 
  RegExp('^[0-9]+$');

class LandingForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            form:{
                id_tipo_identificacion:'',
                identificacion:'',
                nombres:'', 
                apellidos:'',
                email:'',
                fecha_ingreso:'',
                errors: {
                    id_tipo_identificacion:'',
                    identificacion:'',
                    nombres: '',
                    apellidos:'',
                    email: '',
                    fecha_ingreso:'',
                }
            } ,
            values: []         
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    async componentDidMount(){
        await this.fetchTiposIdentificaciones()
        //ValidatorForm.addValidationRule("isValidName",(string)=>/[a-zA-Z \u00E0-\u00FC]{1,20}/g.test(string));
        //ValidatorForm.addValidationRule("idValidEmail",(string)=>/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(string));
        //ValidatorForm.addValidationRule("idNumeric",(string)=>/^[0-9]/g.test(string));
    }

    fetchTiposIdentificaciones = async () =>{
        var tokk = await getToken()    
        var data = await getTiposIdentificaciones(tokk)

        this.setState({
            ...this.visible,
            ...this.state.form,
            values:data            
        })        
    }
    
    handleChange = e => {
        this.setState({
            form:{
                ...this.visible,
                ...this.state.values,
                ...this.state.form,
                [e.target.name]:e.target.value
            },
        })

        const { name, value } = e.target;
        let errors = this.state.form.errors;
    
        switch (name) {      
        case 'identificacion': 
        this.state.form.errors.identificacion = 
                !validIdentification.test(value)
                ? 'Debe ser numerico'
                : '';                
            break;
        case 'nombres': 
        this.state.form.errors.nombres = 
            validIdentification.test(value)
            ? 'Solo letras'
            : '';  
        case 'apellidos': 
        this.state.form.errors.apellidos = 
            validIdentification.test(value)
            ? 'Solo letras'
            : ''; 
        case 'email': 
        this.state.form.errors.email = 
            validEmailRegex.test(value)
            ? ''
            : 'Correo no valido';
            break;           
        default:
            break;
        }
    }

    handleSubmit = async e => {
        var f = new Date();
        var actualDate = f.getFullYear() +"-" + (f.getMonth() +1) + "-" + f.getDate() + " " + f.getHours()+":" + f.getMinutes()+":" + f.getSeconds();

        this.state.form.fecha_ingreso = actualDate

        this.setState({
            form:{
                ...this.state.visible,
                ...this.state.values,
                ...this.state.form,
                [e.target.name]:e.target.value
            },
        })

        var tokk = await getToken()
        e.preventDefault()
        try {
            var res = await postPersona(tokk,this.state.form)
            if(res.status===200){
                this.openModal()
            }
        } catch (error) {
            
        }
    }
    
    openModal() {
        this.setState({
            visible : true
        });
    }
 
    closeModal() {
        this.setState({
            visible : false
        });
    }

    render(){
               
        const {errors} = this.state.form.errors

        return (
            <div className="container">
                <ValidatorForm
                    onSubmit={this.handleSubmit}
                >                   
                    <div className="form-group">
                    <InputLabel className="control-label col-sm-offset-2 col-sm-2" htmlFor="ti"></InputLabel>                                   
                        <SelectValidator 
                            id="ti" 
                            defaultValue="0"
                            className="form-control" 
                            name="id_tipo_identificacion" 
                            onChange={this.handleChange} 
                            value={this.state.id_tipo_identificacion}
                            // validators={["required"]}
                            // errorMessages={["Seleccione tipo de documento"]}
                            >                            
                            <option selected key="0" value="0">SELECCIONE TIPO DE IDENTIFICACIÓN</option>
                            {                            
                                this.state.values.map((obj) => {
                                    return <option key={obj.id_tipo_identificacion} value={obj.id_tipo_identificacion}>{obj.descripcion}</option>
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
                            onChange={this.handleChange}
                            value={this.state.form.identificacion}
                            validators = {["required"]}
                            errorMessages= {["Campo requerido"]}
                        />
                        {this.state.form.errors.identificacion.length > 0 && 
                            <span style={{color:'red',fontSize:12}}>{this.state.form.errors.identificacion}</span>}
                    </div>
                     <div className="form-group">
                        <TextValidator 
                            type="text" 
                            className="form-control" 
                            placeholder="Nombres" 
                            name="nombres"
                            onChange={this.handleChange}
                            value={this.state.form.nombres}
                            validators = {["required"]}
                            errorMessages= {["Campo requerido"]}
                            />
                        {this.state.form.errors.nombres.length > 0 && 
                            <span style={{color:'red',fontSize:12}}>{this.state.form.errors.nombres}</span>}
                    </div>
                    <div className="form-group">
                        <TextValidator 
                            type="text" 
                            className="form-control" 
                            placeholder="Apellidos" 
                            name="apellidos"
                            onChange={this.handleChange}
                            value={this.state.form.apellidos}
                            validators = {["required"]}
                            errorMessages= {["Campo requerido"]}
                        />
                        {this.state.form.errors.apellidos.length > 0 && 
                                <span style={{color:'red',fontSize:12}}>{this.state.form.errors.apellidos}</span>}
                    </div>
                    <div className="form-group">
                        <TextValidator 
                            type="email" 
                            className="form-control" 
                            placeholder="Email" 
                            name="email"
                            onChange={this.handleChange}
                            value={this.state.form.email}
                            validators = {["required"]}
                            errorMessages= {["Campo requerido"]}
                        />
                        {this.state.form.errors.email.length > 0 && 
                                <span style={{color:'red',fontSize:12}}>{this.state.form.errors.email}</span>}
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-outline-primary"
                        // onClick={this.handleSumbit}
                    >
                        Registrar
                    </button>
                </ValidatorForm>

                <div>
                {/* <button onClick={() => this.openModal()}>hola</button> */}
                <Modal className="mymodal" visible={this.state.visible} width="400" height="200" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div style={{margin:20,textAlign:'center'}}>
                        <h1 style={{color:'green',fontSize:40,textAlign:'center'}}>!Usuario registrado!</h1>
                        <br/>
                        <p>Gracias por registrarse con nosotros</p>
                        <Button onClick={() => this.closeModal()}>Cerrar</Button>
                        {/* <AddButton 
                            nav="/"
                            name="Lista de usuarios registrados"
                        /> */}
                    </div>
                </Modal>
                </div>

            </div>
        )
    }
}

export default LandingForm