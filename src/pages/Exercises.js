import React from 'react'

import Card from '../components/Card'
import Welcome from '../components/welcome'

class Exercises extends React.Component{
    render(){
        return (
            <div>
            <Welcome
                username="Raul"
            />
            <Card 
                title="Titulo"
                description="pagina admin"
                img=""
                leftColor=""
                rightColor=""
            />
            </div>
        )
    }
}

export default Exercises