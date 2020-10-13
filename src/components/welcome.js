

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

export async function getTiposIdentificaciones(tokk) {
    let config ={
        method: 'GET',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'apikey':tokk
        },
    }
    let res = await fetch('http://localhost:8000/api/identificaciones',config)
    let data = await res.json()

    return data
}

export async function postPersona(tokk,form) {
    let config ={
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'apikey':tokk
        },
        body:JSON.stringify(form)
    }
    let res = await fetch('http://localhost:8000/api/iperson',config)

    return res
}
