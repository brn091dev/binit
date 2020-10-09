import React from 'react'

class LandingForm extends React.Component{

    state = {
        values: []
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log(this.state)
    }

    async componentDidMount(){
        await this.fetchTiposIdentificaciones()
    }

    fetchTiposIdentificaciones = async () =>{
        let res = await fetch('http://localhost:8000/api/identificaciones')
        let data = await res.json()

        this.setState({
            values:data
            
        })
        console.log('hola')
        console.log(this.state.values)
    }

    render(){
        
        const { onChange, form } = this.props
        
        return (
            <div className="container">
                <form
                    onSubmit={this.handleSubmit}
                >
                    <div className="dropdown">           
                        <select>{
                            this.state.values.map((obj) => {
                                return <option value={obj.id}>{obj.descripcion}</option>
                            })
                        }</select>
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Identificacion" 
                            name="identificacion"
                            onChange={onChange}
                            value={form.title}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Nombres" 
                            name="nombres"
                            onChange={onChange}
                            value={form.nombres}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Apellidos" 
                            name="apellidos"
                            onChange={onChange}
                            value={form.apellidos}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Email" 
                            name="email"
                            onChange={onChange}
                            value={form.email}
                        />
                    </div>
                    {/* <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="description" 
                            name="description"
                            onChange={onChange}
                            value={form.description}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="img" 
                            name="img"
                            onChange={onChange}
                            value={form.img}
                        />
                    </div>
                    <div className="form-row">
                        <div className="col">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="leftColor" 
                                name="leftColor"
                                onChange={onChange}
                                value={form.leftColor}
                            />
                        </div>
                        <div className="col">
                            <input 
                                type="text" 
                                className="form-control"
                                placeholder="rightColor" 
                                name="rightColor"
                                onChange={onChange}
                                value={form.rightColor}
                            />    
                        </div>
                    </div> */}
                    
                    <button 
                        type="submit" 
                        className="btn btn-primary float-right"
                    >
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default LandingForm