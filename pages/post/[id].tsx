//post/[id].tsx
//API http://localhost:3000/api/posts
/*
    Collection Portfolio
    [{
        "_id": {
            "$oid": "631102f03a93ff232d36926c"
        },
        "post": [
            {
            "_id": 1,
            "date": "",
            "title": "Titulo 1",
            "text": "Texto 1",
            "media": 111
            },
            {
            "_id": 2,
            "date": "",
            "title": "Titulo 1",
            "text": "Texto 1",
            "media": 111
            },
            {
            "_id": 3,
            "date": "",
            "title": "Titulo 1",
            "text": "Texto 1",
            "media": 111
            },
            {
            "_id": 4,
            "date": "",
            "title": "Titulo 1",
            "text": "Texto 1",
            "media": 111
            },
            {
            "_id": 5,
            "date": "",
            "title": "Titulo 1",
            "text": "Texto 1",
            "media": 111
            },
            {
            "_id": 6,
            "date": "",
            "title": "Titulo 1",
            "text": "Texto 1",
            "media": 111
            },
            {
            "_id": 7,
            "date": "",
            "title": "Titulo 1",
            "text": "Texto 1",
            "media": 111
            }
        ],
        "info": {
            "title": "TITLE",
            "seo": "SEO"
        }
        }]
*/

import React from 'react'
import { GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout/Layout'
import clientPromise from '../../lib/mongodb'


export async function getServerSideProps(context) {
    let res = await fetch("/api/posts", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    let data = await res.json()
    return {
        props: {
            data,
        },
    }
}

export default function PostID({ data }) {
    const router = useRouter()
    const { id } = router.query
    const [post, setPost] = useState(null)
    
    useEffect(() => {
        console.log(data)
        if (data) {
            /*
            data return:
            {
                "status": 200,
                "data": [
                    {
                        "_id": "6317e0845d1e2c8c5418fc75",
                        "id": "1",
                        "title": "Título 1",
                        "content": "Conteúdo 1"
                    },
                    {
                        "_id": "6317f9485d1e2c8c5418fc77",
                        "id": "2",
                        "title": "Título 2",
                        "content": "Conteúdo 2"
                    },
                    {
                        "_id": "6317f94c5d1e2c8c5418fc78",
                        "id": "3",
                        "title": "Título 3",
                        "content": "Conteúdo 3"
                    }
                ]
            }
            */
            //Find in data, where post.id = id
            let post = data.data.find((post) => post.id === id)
            setPost(post)
        }
    }, [data, id])
    return (
        <Layout>
            {post && (
                <div>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                </div>
            )}
        </Layout>
    )
}








