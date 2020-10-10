import React from 'react'

import LandingForm from '../components/LandingForm'
import {getToken} from '../components/welcome'
import imgBanner from '../images/admind3.jpg'
import imgLogo from '../images/mheat.png'

import Modal from 'react-awesome-modal';
import { Button } from '@material-ui/core'
import AddButton from '../components/AddButton'

class Landing extends React.Component{
    
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
            }          
        };
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

    handleChange = e => {
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]:e.target.value
            },
        })
        
        console.log(this.state.form)

        // const { name, value } = e.target;
        // let errors = this.state.form.errors;
    
        // switch (name) {           
        // case 'identificacion': 
        //     errors.identificacion = 
        //         regex.test(value)
        //         ? 'Por favor ingrese numeros'
        //         : '';                
        //     break;
        // case 'nombres': 
        //     errors.nombres = 
        //     !regex.test(value)
        //         ? 'Solo letras'
        //         : '';
        //     break;   
        // case 'apellidos': 
        //     errors.nombres = 
        //     !regex.test(value)
        //         ? 'Solo letras'
        //         : '';
        //     break;   
        // case 'email': 
        //     errors.email = 
        //     validEmailRegex.test(value)
        //         ? ''
        //         : 'No es un correo valido';
        //     break;            
        // default:
        //     break;
        // }
    
        // this.setState({errors, [name]: value}, ()=> {
        //     // console.log('errors')
        //     // console.log(errors)
        // })
    }

    handleSubmit = async e => {
        console.log('aqui')
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
            if(res.status===200){
                this.openModal()
            }
        } catch (error) {
            
        }
    }

    render(){
        return(
            <div>
                <div style={{height:"150px"}}>
                    <img src={imgBanner} width="100%" height="100%"/>
                </div>
                <div className="row" style={{margin: 2 + 'em'}} >
                    <div className="col-sm d-flex justify-content-center">
                        <img src={imgLogo} height="50%" alt="ok"/>                    
                    </div>
                    <div className="col-sm">
                        <LandingForm
                            onChange = {this.handleChange}
                            onSubmit = {this.handleSubmit}
                            form={this.state.form}
                            />
                    </div>
                </div>
                <div>
                <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <h1>!Usuario registrado!</h1>
                        <p>Gracias por todo</p>
                        <Button onClick={() => this.closeModal()}>Cerrar</Button>
                        <AddButton 
                            nav="/"
                            name="Lista de usuarios registrados"
                        />
                    </div>
                </Modal>
                </div>
            </div>
        )
    }
}

export default Landing