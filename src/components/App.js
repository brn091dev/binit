import React from 'react'
import { BrowserRouter, Route} from 'react-router-dom'

import Exercises from '../pages/Exercises'
import Landing   from '../pages/Landing'

function App(){
    return (
        <BrowserRouter>
            <Route path="/exercise" component={<Exercises/>}/>
            <Route path="/landing" component={<Landing/>}/>
        </BrowserRouter>
    )
}

export default App