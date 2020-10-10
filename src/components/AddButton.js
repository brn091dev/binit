import React from 'react'

import { Link } from 'react-router-dom'

const AddButton = ({nav,name}) => (
        // <Link to="/landing">
        //     <button>Landing</button>
        // </Link>
        <Link to={nav}>
            <button className="btn btn-info">{name}</button>
        </Link>
)

export default AddButton