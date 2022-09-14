// Add post page
import { getSession, signOut } from 'next-auth/react'
import Layout from "../../components/Layout/Layout"
import { useEffect, useState } from "react"
import Loading from "../../components/Loading"
import { useRouter } from 'next/router'
import clientPromise from '../../lib/mongodb'
import nextBase64 from 'next-base64'
import axios from 'axios'

export async function getServerSideProps(context) {
    const client = await clientPromise
    const db = client.db('hex')
    let posts = await db.collection('posts').find({}).toArray()

    const session = await getSession(context)
    console.log(session)
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
            session
        },
    }
}

export default function AddPost(props: any) {
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [media, setMedia] = useState('')
    const [fileName, setFileName] = useState('')
    const [fileType, setFileType] = useState('')
    const [loading, setLoading] = useState(false)


    async function logout() {
        signOut()
        router.push('/login')
    }

    async function addPost(e: any) {
        e.preventDefault()

        // Verify user role
        if (props.session.session.user.role !== 'admin') {
            console.log(props.session.session.user.role)
            alert('You are not authorized to add a post')
            return
        }
        console.log(props.session.session.user.role)



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
        console.log(post)
        await axios.post(process.env.NEXT_PUBLIC_APP_API_POSTS, post)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            }
        )
        //router.push('/admin')
    }


    return (
        <Layout>
            <div className="w-full flex flex-col justify-start items-center">
                <h1 className="text-3xl font-bold">Add Post</h1>
                <h2>Email:
                    {
                        
                    }
                </h2>
                <h2>Name:</h2>
                <button onClick={logout}>Logout</button>
                <div>
                    <div>Add Post Page</div>
                    <form onSubmit={addPost}>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" value={title} onChange={
                            (e) => {
                                setTitle(e.target.value)
                            }
                        } />
                        <label htmlFor="content">Content</label>
                        <textarea name="content" id="content" value={content} onChange={
                            (e) => {
                                setContent(e.target.value)
                            }
                        } />
                        <label htmlFor="media">Media</label>
                        <input type="file" name="media" id="media" onChange={
                            (e) => {
                                if(e.target!.files[0] === null) {
                                    setMedia('')
                                    setFileName('')
                                    setFileType('')
                                }
                                else {
                                    console.log(e.target!.files[0])
                                    const file = e.target!.files[0]
                                    const filename = file.name
                                    setFileName(filename)
                                    const filetype = file.type
                                    setFileType(filetype)
                                    const reader = new FileReader()
                                    reader.readAsDataURL(file)
                                    reader.onload = (e) => {
                                        setMedia(e.target!.result.toString().split(",").pop())
                                    }
                                }
                            }
                        } />
                        <button type="submit">Add Post</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}
