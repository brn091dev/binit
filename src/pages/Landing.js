import React from 'react'

import LandingForm from '../components/LandingForm'
import imgBanner from '../images/admind3.jpg'
import imgLogo from '../images/mheat.png'



class Landing extends React.Component{
    
    render(){
        return(
            <div>
                <div style={{height:"150px"}}>
                    <img src={imgBanner} width="100%" height="100%" alt="logo"/>
                </div>
                <br/>
                <div>
                    <h1 style={{color:'grey',fontSize:40,textAlign:'center'}}>BIenvenido a landing gracias por tu visita</h1>
                </div>
                <div className="row" style={{margin: 2 + 'em'}} >
                    <div className="col-sm d-flex justify-content-center">
                        <img src={imgLogo} height="50%" alt="ok"/>                    
                    </div>
                    <div className="col-sm">
                        <LandingForm />
                    </div>
                </div>
               
            </div>
        )
    }
}

export default Landing