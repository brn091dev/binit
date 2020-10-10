import React from 'react'
import {getToken} from './welcome'

class LandingForm extends React.Component{

    state = {
        values: []
    }

    async componentDidMount(){
        await this.fetchTiposIdentificaciones()
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
            body:JSON.stringify(this.state.form)
        }
        let res = await fetch('http://localhost:8000/api/identificaciones',config)
        let data = await res.json()
        console.log('tokensito')
        console.log(res)

        this.setState({
            values:data            
        })
        
    }

    render(){
       
        const { onChange, onSubmit, form } = this.props
        
        var f = new Date();
        var actualDate = f.getFullYear() +"-" + (f.getMonth() +1) + "-" + f.getDate() + " " + f.getHours()+":" + f.getMinutes()+":" + f.getSeconds();

        form.fecha_ingreso = actualDate
        const {errors} = form
        return (
            <div className="container">
                <form
                    onSubmit={onSubmit}
                >                   
                    <div className="form-group">
                    <label className="control-label col-sm-offset-2 col-sm-2" htmlFor="ti"></label>                                   
                        <select id="ti" className="form-control" name="id_tipo_identificacion" onChange={onChange} value={form.id_tipo_identificacion}>                            
                            <option key="0" value="0">SELECCIONE TIPO DE IDENTIFICACIÓN</option>
                            {                            
                                this.state.values.map((obj) => {
                                    return <option key={obj.id} value={obj.id_tipo_identificacion}>{obj.descripcion}</option>
                                })
                            }
                        </select>
                        {errors.id_tipo_identificacion.length > 0 && 
                            <span >{errors.id_tipo_identificacion}</span>}
                    </div> 
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Número de identificacion" 
                            name="identificacion"
                            onChange={onChange}
                            value={form.title}
                        />
                        {errors.identificacion.length > 0 && 
                            <span >{errors.identificacion}</span>}
                    </div>
                     <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Nombres" 
                            name="nombres"
                            onChange={onChange}
                            value={form.nombres}
                            noValidate
                            />
                        {errors.nombres.length > 0 && 
                            <span >{errors.nombres}</span>}
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Apellidos" 
                            name="apellidos"
                            onChange={onChange}
                            value={form.apellidos}
                        />
                        {errors.apellidos.length > 0 && 
                                <span >{errors.apellidos}</span>}
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="Email" 
                            name="email"
                            onChange={onChange}
                            value={form.email}
                        />
                        {errors.email.length > 0 && 
                                <span >{errors.email}</span>}
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-outline-primary"
                    >
                        Registrar
                    </button>
                </form>
            </div>
        )
    }
}

export default LandingForm