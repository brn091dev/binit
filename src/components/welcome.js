import React from 'react'

export async function getToken() {
    let configt ={
    method: 'POST',
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
    },
    }
    let rest = await fetch('http://localhost:8000/api/autenticar',configt)
    let datat = await rest.json()
    //console.log(datat.token)

    return datat.token
}

