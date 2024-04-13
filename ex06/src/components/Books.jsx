import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Col, Row, Card,Button,InputGroup, Form, Spinner} from 'react-bootstrap'
import Book from './Book';
const Books = () => {
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLodaing] = useState(false);
    const [end, setEnd] = useState(false);
    const [query, setQuery] = useState('리액트');

    const callAPI = async()=> {
        const url  = `https://dapi.kakao.com/v3/search/book?target=title&query=${query}&size=12&page=${page}`;
        const config = {
            headers:{
                "Authorization":"KakaoAK 0ce6a96a5ed5d1b040aba0dc387cc85c"
            }
        }
        setLodaing(true);
        const res =await axios.get(url,config);
        const data = res.data;
        setBooks(data.documents);
        setEnd(data.meta.is_end);
        console.log(data);
        setTimeout(()=>{
            setLodaing(false);
        },300)
        
    }

    useEffect(()=>{
        callAPI();
    },[page]);

    const onSubmit =(e) => {
        e.preventDefault();
        setPage(1);
        callAPI();
    }

    if(loading) return  <Spinner animation="border" variant='secondary' 
    className='my-5'/>
    return (
        <div>
            <h2 className='my-5'>📚 도서 검색</h2>
            <Row className='mx-5 mb-3'>
                <Col md={6} lg={4}>
                    <form onSubmit={onSubmit}>
                    <InputGroup>
                        <Form.Control value={query} onChange={(e)=>setQuery(e.target.value)}/>
                        <Button type="submit" variant="secondary">검색</Button>
                    </InputGroup>                    
                    </form>
                </Col>
            </Row>
            <Row className ='mx-5'>
            {books.map(book => 
                <Col className = 'mb-3' xs={6} md={4} lg={2}>
                    <Card>
                        <Card.Body>
                            <Book book={book}/>
                        </Card.Body>
                        <Card.Footer>
                            <div className ="ellipsis">{book.title}</div>
                        </Card.Footer>
                    </Card>
                </Col> 
            )}
            </Row>
            <div>
                <Button onClick ={()=>setPage(page-1)}disabled ={page === 1}
                variant="secondary">이전</Button>
                <span className='mx-3'>{page}</span>
                <Button onClick ={()=>setPage(page+1)} disabled = {end}
                variant="secondary">다음</Button>
            </div>
        </div>
    )
}

export default Books
