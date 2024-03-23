import React, { useState } from 'react'
import Register from './Register'

const Address = () => {
    const [address, setAddress] = useState([
        {id:1, name:'Pipi', address:'Incheon namdong-gu',
        phone : '010-pipi'},
        {id:2, name:'Cici', address:'Incheon namdong-gu',
        phone : '010-cici'}
    ])
    const onRegister =(form)=> {
        const newAddress=address.concat(form);
        setAddress (newAddress);
    }
    const onDelete =(id)=> {
        if(window.confirm(`Are you sure you want to delete number ${id}?`)){
            const newAddress = address.filter(add =>add.id !== id);
            setAddress(newAddress);
        }
    }
    return (
        <div>
            <Register onRegister={onRegister}/>
        <h1>Address List</h1>
        <table>
            <thead>
                <tr><td>Num</td><td>Name</td><td>Address</td>
                <td>Phone</td><td>Delete</td></tr>
            </thead>
            <tbody>
                {address.map(add=>
                    <tr key={add.id}>
                        <td>{add.id}</td>
                        <td>{add.name}</td>
                        <td>{add.address}</td>
                        <td>{add.phone}</td>
                        <td><button onClick={()=>onDelete(add.id)}>Delete</button></td>
                    </tr>
                    )}
            </tbody>
        </table>
        </div>
    )
}

export default Address
