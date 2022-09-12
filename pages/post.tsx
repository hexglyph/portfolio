//Post page
/* Model for post
{
    "_id": {
        "$oid": "6317e0845d1e2c8c5418fc75"
    },
    "id": "1",
    "title": "Título 1",
    "content": "Conteúdo 1",
    "media": "https://picsum.photos/200/300",
    "fileName": "image.jpg",
    "fileType": "image/jpeg"
}
*/
import React from 'react'
import { GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout/Layout'
import clientPromise from '../lib/mongodb'
import nextBase64 from 'next-base64'
import axios from 'axios'
import Image from 'next/image'

export async function getServerSideProps(context) {
  let res = await axios.get(process.env.NEXT_PUBLIC_APP_API_POSTS)
            .then((res) => {
                return res.data
            })

  let allPosts = res

  return {
    props: { allPosts },
  }
}

export default function PostPage(props) {

    const [postsState, setPostsState] = useState(props.allPosts.data) 
    const [posts, setPosts] = useState(props.allPosts.data)
    const [title, setTitle] = useState(props.allPosts.data[0].title)
    const [content, setContent] = useState(props.allPosts.data[0].content)
    const [postId, setPostId] = useState(props.allPosts.data[0]._id)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { id } = router.query
    let allPosts = props.allPosts.data

    useEffect(() => {
        if (id) {
            let post = allPosts.filter((post) => {
                return post._id == id
            })
            setTitle(post[0].title)
            setContent(post[0].content)
            setPostId(post[0]._id)
        }
    }, [allPosts, id])


    return (
        <Layout>
            <div className="">
                <div className="">
                    <div className="">
                        {
                            postsState.map((post) => {
                                return (
                                    <div key={post._id}>
                                        <h1>{post.title}</h1>
                                        <p>{post.content}</p>
                                        <div className="image-post">
                                            {
                                                post.media ? (
                                                    <Image src={"data:"+post.fileType+";base64,"+post.media} alt={post.fileName} layout="responsive" height="100%" width="100%" placeholder="blur" blurDataURL="true" />
                                                ) : (
                                                    <p>No image</p>
                                                )
                                            }
                                        </div>

                                    </div>
                                )
                            })
                        }
                        
                    </div>
                </div>
            </div>
        </Layout>
    );
}
