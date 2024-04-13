import React, { useEffect, useState } from 'react'
import {Table,Button,Spinner} from 'react-bootstrap'

const Posts = () => {
    const [page, setPage] = useState(1);
    const [last, setLast] = useState(1); 
    const [posts, SetPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const callAPI = () => {
        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => {
            const size = 5;
            setLast(json.length/size);
            const start = (page -1)*size +1;
            const end = (page * size);
            const data = json.filter(j=> j.id >= start && j.id <=end)
            const data1 = data.map(d=>d && {...d, toggle:false});
            SetPosts(data1);
            setLoading(false);
        })
    }
    useEffect(()=>{
        callAPI();
    }, [page])

    const onClick = (id) => {
        const data = posts.map(post=>post.id===id?
            {...post, toggle:!post.toggle} : {...post});
        SetPosts(data);
    }

  if(loading) return <Spinner animation="border" variant='secondary' 
  className='my-5'/>
    //   <div >
    // <h3 className='mt-3'>Loading.....</h3>
    // </div>

  return (
    <div className='posts'>
        <h1 className='mt-5'>🌹 Post List 🌷</h1>
        <Table striped bordered hover className='mt-4' >
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Title</td>
                </tr>
            </thead>
            <tbody>
                {posts.map(post=>
                    <tr>
                        <td>{post.id}</td>
                        <td className='text-start'>
                            <b style={{cursor:'pointer'}}
                            onClick = {()=>onClick(post.id)}>{post.title}</b>
                            {post.toggle &&
                                <>
                                    <br/>
                                    {post.body}
                                </>
                            }
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
        <div className ='mt-4'>
            <Button variant='success' disabled={page ===1}
            onClick = {()=> setPage(page-1)}>Prev</Button>
            <span className="mx-3">{page} / {last} </span>
            <Button variant='success' disabled={page ===last}
            onClick ={()=> setPage(page+1)}>Next</Button>
        </div>
    </div>
  )
}

export default Posts
