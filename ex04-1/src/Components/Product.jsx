import React, { useState } from 'react'
import {Table,Button} from 'react-bootstrap';
import Register from './Register';

const Product = () => {
    const [products, setProducts] = useState([
        {code:101,
         name:'LG Obje Collection Washer',
         price:250,
         qnt:5},

         {code:102,
            name:'LG Obje Collection Dryer',
            price:230,
            qnt:4}
    ])

    const onRegister = (product)=>{
        const newData = products.concat(product);  //연결문
        setProducts(newData);
    }

    const onDelete =(code) => {
      if(window.confirm(`${code}번 상품을 삭제하실래요?`)){
        const newData1 =products.filter(p=>p.code !== code);
        setProducts(newData1);
      }

    }
    const onQntUpdate =(e, product)=> {
      const newData2  = products.map(p=> product.code === p.code ?
        {...p,qnt:e.target.value} : {...p});
        setProducts(newData2);
    }
    const onPirceUpdate =(e, product)=> {
      const newData3  = products.map(p=> p.code === product.code ?
        {...p,price:e.target.value} : {...p});
        setProducts(newData3);
    }
    const onNameUpdate =(e,product)=> {
      const newData4 = products.map(p=> p.code === product.code ?
        {...p,name:e.target.value} : {...p});
        setProducts(newData4);
    }


  return (
    <div>
        <h1 style={{padding: '20px'}}>📦 매출관리 💸</h1>
        <hr className='content'></hr>
        <Register onRegister={onRegister}/>
        <div className='content'>
        <Table striped bordered hover c>
            <thead >
                <tr>
                    <td>상품코드</td>
                    <td>상품이름</td>
                    <td>상품가격</td>
                    <td>판매수량</td>
                    <td>판매금액</td>
                    <td>삭제</td>
                </tr>
            </thead>
            <tbody>
                {products.map(p=>
                    <tr key={p.code}>
                        <td>🏷️ {p.code}</td>
                        <td><input value={p.name} size='27' className='text-center'
                        onChange={(e)=>onNameUpdate(e,p)}/></td>
                        <td><input value={p.price} size='5' 
                        className ='text-end'
                        onChange={(e)=>onPirceUpdate(e, p)}/></td>
                        <td>
                          <input value={p.qnt} size='3' className='text-end'
                          onChange={(e)=>onQntUpdate(e, p)}/>개
                        </td>
                        <td>{p.price * p.qnt}</td>
                        <td><Button variant='danger' size='sm'
                        onClick={()=>onDelete(p.code)}>삭제</Button></td>
                    </tr>
                )}
            </tbody>
        </Table>
        </div>
    </div>
  )
}

export default Product