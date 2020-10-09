import React from 'react'

import LandingForm from '../components/LandingForm'

import imgLeft from '../images/lp1.png'

class Landing extends React.Component{

    state = {
        form:{}
    }

    handleChange = e => {
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]:e.target.value
            }
        })
    }

    // async componentDidMount(){
    //     await this.fetchTiposIdentificaciones()
    // }

    // fetchTiposIdentificaciones = async () =>{
    //     let res = await fetch('http://localhost:8000/api/identificaciones')
    //     let data = await res.json()

    //     console.log(data)
    // }

    render(){
        return(
            <div className="row" style={{margin: 2 + 'em'}} >
                <div className="col-sm">
                    <LandingForm
                        onChange = {this.handleChange}
                        form={this.state.form}
                    />
                </div>
                <div className="col-sm">
                    <img src={imgLeft} height="300 %"/>                    
                </div>
            </div>
        )
    }
}

export default Landing