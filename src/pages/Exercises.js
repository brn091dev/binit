import React from 'react'

import Card from '../components/Card'
import Welcome from '../components/welcome'
import AddButton from '../components/AddButton'

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

            <AddButton/>
            </div>
        )
    }
}

export default Exercises