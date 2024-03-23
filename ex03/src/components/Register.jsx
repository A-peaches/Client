import React, { useRef, useState } from 'react'

const Register = ({onRegister}) => {
    const last = useRef(3);

    const [form,setForm] = useState({
        id:last.current, name:'', address:'',phone:'010-'
    });
    const refName = useRef(null);
    const onKeyDown =(e)=> {
        if(e.key == 'Enter') {
            onClickRegister();
        }
    }
    const {id,name,address,phone} =form;
    const onChange =(e)=> {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    const onClickRegister =()=> {
        if(name ===""){
            alert("Please enter your name!");
            refName.current.focus();
            return;
        } 
        if(window.confirm(`Do you want to register ${name}?`)) {
            onRegister(form);
            last.current++;
            setForm({
                id:last.current,
                name :'',
                address :'',
                phone :'010-'
            })
            refName.current.focus();
        }
    }
    return (
        <div className='register'>
            <h1>Address Register</h1>
            <input placeholder='ID' value={id} name="id" onChange={onChange}/>
            <input ref={refName} placeholder='Name' value={name} name="name" onChange={onChange}/>
            <input placeholder='Address' value={address} name="address" onChange={onChange}/>
            <input onKeyDown={onKeyDown} placeholder='Phone' value={phone} name="phone" onChange={onChange}/>
            <button onClick={onClickRegister}>Register</button>
        </div>
    )
};

export default Register
