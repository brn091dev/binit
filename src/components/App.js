import React from 'react'
import { BrowserRouter, Route, Router, Switch} from 'react-router-dom'

import Exercises from '../pages/Exercises'
import Landing   from '../pages/Landing'
import NotFound   from '../pages/NotFound'

const App = () =>(
        <BrowserRouter>
            <Switch>
                <Route exact path="/exercises" component={Exercises}/>
                <Route exact path="/landing"  component={Landing}/>
                <Route component={NotFound}/>
            </Switch>        
        </BrowserRouter>
)

export default App