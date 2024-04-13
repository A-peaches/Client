import React, { useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Register = ({onRegister}) => {
    const newCode = useRef(103);
    const refName = useRef(null);
    const [product, setProduct] = useState({
        code:newCode.current,
        name:'',
        price:'',
        qnt:'',
    })

    const {code, name, price, qnt} = product;

    const onChange = (e) =>{
        setProduct({
            ...product,
            [e.target.name]:e.target.value
        })
    }
    const onKeyDown =(e)=>{
        if(e.key === 'Enter'){
            onClick();
        }
    }
    const onClick = () =>{
        if(name === '' || price === '' || qnt === ''){
            alert("상품정보를 입력하세요!");
        } else {
            if(window.confirm("새로운 상품 등록?")){
                onRegister(product)
                setProduct({
                    code:++newCode.current,
                    name:'',
                    price:'',
                    qnt:'',
                });

                }
                refName.current.focus();
        }
    }
  return (
    <div className='content'>
      <Form.Control value={code} name='code' readOnly
       placeholder='상품코드' className='mb-2' />
      <Form.Control value={name} ref={refName}
      name='name' placeholder='상품이름' className='mb-2' onChange={onChange}/>
      <Form.Control value={price} name='price' placeholder='상품가격' className='mb-2'onChange={onChange}/>
      <Form.Control value={qnt} name='qnt' onKeyDown ={onKeyDown}
      placeholder='판매수량' className='mb-2'onChange={onChange}/>
      <Button onClick={onClick} >상품등록</Button>
    </div>
  )
}

export default Register