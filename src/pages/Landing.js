import React from 'react'

import LandingForm from '../components/LandingForm'
import {getToken} from '../components/welcome'
import imgLeft from '../images/lp1.png'

const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const regex = new RegExp("^[a-zA-Z ]+$");

class Landing extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
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
            }          
        };
    }

    handleChange = e => {
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]:e.target.value
            },
        })
        console.log(this.state.form)

        const { name, value } = e.target;
        let errors = this.state.form.errors;
    
        switch (name) {
            case 'id_tipo_identificacion': 
            errors.id_tipo_identificacion = 
            value === 0
                ? 'Debe seleccionar un tipo identificacion'
                : '';                
            break;
        case 'identificacion': 
            errors.identificacion = 
                regex.test(value)
                ? 'Por favor ingrese numeros'
                : '';                
            break;
        case 'nombres': 
            errors.nombres = 
            !regex.test(value)
                ? 'Solo letras'
                : '';
            break;   
        case 'apellidos': 
            errors.nombres = 
            !regex.test(value)
                ? 'Solo letras'
                : '';
            break;   
        case 'email': 
            errors.email = 
            validEmailRegex.test(value)
                ? ''
                : 'No es un correo valido';
            break;            
        default:
            break;
        }
    
        this.setState({errors, [name]: value}, ()=> {
            // console.log('errors')
            // console.log(errors)
        })
    }

    handleSubmit = async e => {
        var tokk = await getToken()
        e.preventDefault()
        try {
            let config ={
                method: 'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'apikey':tokk
                },
                body:JSON.stringify(this.state.form)
            }
            let res = await fetch('http://localhost:8000/api/iperson',config)
            let json = await res.json()
        } catch (error) {
            
        }
    }

    render(){
        return(
            <div className="row" style={{margin: 2 + 'em'}} >
                <div className="col-sm">
                    <img src={imgLeft} height="300 %" alt="ok"/>                    
                </div>
                <div className="col-sm">
                    <LandingForm
                        onChange = {this.handleChange}
                        onSubmit = {this.handleSubmit}
                        form={this.state.form}
                    />
                </div>
            </div>
        )
    }
}

export default Landing