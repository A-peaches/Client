import React, {useEffect, useState} from 'react'
import { Table, Button, Row, Col ,InputGroup ,Form} from 'react-bootstrap'

import axios from 'axios'
import Local from './Local';


const Locals = () => {
    const [page, setPage] = useState(1);
    const [locals,setLocals] = useState([]);
    const [end,setEnd] = useState(false);
    const [size,setSize] = useState(10);
    const [query, setQurey] = useState("인하대학교");
    const [loading, setLoading] = useState(false);
    const callAPI = async() => {
        setLoading(true);
        const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&size=${size}&page=${page}`;
        const config = {
            "headers" : {Authorization : "KakaoAK 0ce6a96a5ed5d1b040aba0dc387cc85c"}
        }
        const res= await axios.get(url,config);
        const data = res.data;
        setLocals(data.documents);
        setEnd(data.meta.is_end);
        console.log(res);

        setTimeout(()=>{ setLoading(false); }, 200)
       
    }


    useEffect(() => {
        callAPI();
    }, [page,size]);

    const onSubmit=(e)=>{
        e.preventDefault();
        if(query===""){
            alert('검색어를 입력하세요!');
        } else {
            callAPI();
        }
    }
    if(loading) return <h1>로딩중입니다..</h1>
    return (
        <div className='mx-5'>
            <Row clasName='mb-3'>
                <Col md = {4}>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                        <Form.Control onChange={(e)=>{
                            setQurey(e.target.value);
                        }}value={query}/>
                        <Button type="submit">검색</Button>
                        </InputGroup>
                    </form>
                </Col>
                <Col md={3}>
                        <Form.Select onChange={(e)=>setSize(e.target.value)}>
                            <option name ="row" value={5}>5행</option>
                            <option name ="row" value={10} selected>10행</option>
                            <option name ="row" value={15}>15행</option>
                        </Form.Select>
                </Col>
            </Row>
        <Table className='my-3' striped bordered hover>
            <thead>
                <tr>
                    <td>장소명</td>
                    <td>전화번호</td>
                    <td>주소</td>
                    <td>위치</td>
                </tr>
            </thead>
            <tbody>
                {locals.map(local=>
                    <tr key={local.id}>
                        <td>{local.place_name}</td>
                        <td>{local.phone}</td>
                        <td>{local.address_name}</td>
                        <td>
                            <Local local={local}></Local>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
        <div>
                <Button onClick={()=>setPage(page - 1)} disabled={page===1}>이전</Button>
                <span className='mx-3'>{page}</span>
                <Button disabled = {end}
                onClick={()=>setPage(page + 1)}>다음</Button>
        </div>
        </div>
    )
    }

    export default Locals
