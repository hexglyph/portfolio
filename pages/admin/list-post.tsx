// List posts page
import { getSession, signOut } from 'next-auth/react'
import Layout from "../../components/Layout/Layout"
import { useEffect, useState } from "react"
import Loading from "../../components/Loading"
import { useRouter } from 'next/router'
import clientPromise from '../../lib/mongodb'
import nextBase64 from 'next-base64'
import axios from 'axios'
import Image from 'next/image'

export async function getServerSideProps(context) {
    const client = await clientPromise
    const db = client.db('hex')
    let posts = await db.collection('posts').find({}).toArray()
    let res = await axios.get(process.env.NEXT_PUBLIC_APP_API_POSTS)
            .then((res) => {
                return res.data
            })

    let allPosts = res
    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }
    return {
        props: { 
            session,
            allPosts
        },
    }
}

export default function ListPost(props: any) {
    const router = useRouter()

    const [posts, setPosts] = useState(props.allPosts.data)
    const [postTitle, setPostTitle] = useState(props.allPosts.data[0].title)
    const [postContent, setPostContent] = useState(props.allPosts.data[0].content)
    const [postId, setPostId] = useState(props.allPosts.data[0]._id)

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [media, setMedia] = useState('')
    const [fileName, setFileName] = useState('')
    const [fileType, setFileType] = useState('')
    const [loading, setLoading] = useState(false)

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

    async function logout() {
        signOut()
        router.push('/login')
    }

    async function ListPost(e: any) {
        e.preventDefault()
        // Verify user role
        if (props.session.session.user.role !== 'admin') {
            console.log(props.session.session.user.role)
            alert('You are not authorized to add a post')
            return
        }
        setLoading(true)
        let res = await axios.get(process.env.NEXT_PUBLIC_APP_API_POSTS).then((res) => {
            return res.data
        })
        res = res.data
        let newPostId = res.length + 1
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
        let post = {
            id: newPostId,
            title: title,
            content: content,
            media: media,
            fileName: fileName,
            fileType: fileType
        }
        await axios.post(process.env.NEXT_PUBLIC_APP_API_POSTS, post)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            }
        )
    }

    

    // Edit post, router push to edit post page
    function EditPost(e: any) {
        e.preventDefault()
        router.push('/admin/edit-post/' + postId)
    }
    


    return (
        <Layout>
            <div className="w-full flex flex-col justify-start items-center">
                <h1 className="text-3xl font-bold">List Posts</h1>
                <h2>Email:
                    {
                        
                    }
                </h2>
                <h2>Name:</h2>
                <button onClick={logout}>Logout</button>
                <div>
                    <div>List posts Page</div>
                    {/* List posts, with delete and edit function*/}
                    {
                        posts.map((post) => {
                            return (
                                <div key={post._id}>
                                    <div>{post.title}</div>
                                    <div>{post.content}</div>
                                    <div>
                                        {
                                            post.media ? (
                                                <Image src={"data:"+post.fileType+";base64,"+post.media} alt={post.fileName} layout="responsive" height="100%" width="100%" placeholder="blur" blurDataURL="true" />
                                            ) : (
                                                <p>No image</p>
                                            )
                                        }
                                    </div>
                                    <button onClick={() => {
                                        // Edit post, router push to edit post page
                                        router.push('/admin/edit-post/' + post.id)
                                        /*setPostTitle(post.title)
                                        setPostContent(post.content)
                                        setPostId(post._id)*/

                                    }}>Edit</button>
                                    <button onClick={() => {
                                        axios.delete(process.env.NEXT_PUBLIC_APP_API_POSTS + '/' + post.id)
                                            .then((res) => {
                                                console.log(res)
                                            })
                                            .catch((err) => {
                                                console.log(err)
                                            })
                                    }}>Delete</button>
                                </div>
                            )
                        })
                    }

                    
                    

                </div>
            </div>
        </Layout>
    )
}
