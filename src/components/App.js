import React from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'

import Admin from '../pages/Admin'
import Landing   from '../pages/Landing'
import NotFound   from '../pages/NotFound'

const App = () =>(
        <BrowserRouter>
            <Switch>
                <Route exact path="/admin" component={Admin}/>
                <Route exact path="/landing"  component={Landing}/>
                <Route component={NotFound}/>
            </Switch>        
        </BrowserRouter>
)

export default App