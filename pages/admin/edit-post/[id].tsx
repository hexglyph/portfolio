// Edit post [id].tsx
import { getSession, signOut } from 'next-auth/react'
import Layout from "../../../components/Layout/Layout"
import { useEffect, useState } from "react"
import Loading from "../../../components/Loading"
import { Router, useRouter } from 'next/router'
import clientPromise from '../../../lib/mongodb'
import nextBase64 from 'next-base64'
import axios from 'axios'

export async function getServerSideProps(context) {
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
            session
        },
    }
}

export default function EditPost(props: any) {
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [media, setMedia] = useState('')
    const [fileName, setFileName] = useState('')
    const [fileType, setFileType] = useState('')
    const [loading, setLoading] = useState(false)
    const { id } = router.query

    // Get post id from url and fetch post from database
    //console.log(id)
    useEffect(() => {
        if (id) {
            axios.get(`${process.env.NEXT_PUBLIC_APP_API_POST}/${id}`)
            .then(res => {
                //console.log(res.data)
                //console.log(res.data.data)
                setTitle(res.data.data.title)
                setContent(res.data.data.content)
                setMedia(res.data.data.media)
                setFileName(res.data.data.fileName)
                setFileType(res.data.data.fileType)
            })
            .catch(err => {
                //console.log(err)
            })
        }
    }, [id])



    /*useEffect(() => {
        if (post) {
            setTitle(post.title)
            setContent(post.content)
            setMedia(post.media)
            setFileName(post.fileName)
            setFileType(post.fileType)
        }
    }, [post])*/

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleContentChange = (e) => {
        setContent(e.target.value)
    }

    const handleMediaChange = (e) => {
        setMedia(e.target.value)
    }

    const handleFileNameChange = (e) => {
        setFileName(e.target.value)
    }

    const handleFileTypeChange = (e) => {
        setFileType(e.target.value)
    }

    async function logout() {
        signOut()
        router.push('/login')
    }

    async function editPost(e: any) {
        e.preventDefault()

        // Verify user role
        if (props.session.session.user.role !== 'admin') {
            //console.log(props.session.session.user.role)
            alert('You are not authorized to edit a post')
            return
        }
        //console.log(props.session.session.user.role)
        setLoading(true)
        // Get the post id from the url
        const postId = router.query.id
        // Update post in database with new data with API
        let updatedPost = {
            id: postId,
            title: title,
            content: content,
            media: media,
            fileName: fileName,
            fileType: fileType
        }
        console.log(updatedPost)
        axios.put(`${process.env.NEXT_PUBLIC_APP_API_POST}/${postId}`, updatedPost)
        .then(res => {
            console.log(res)
            setLoading(false)
            //router.push('/admin/posts')
        })
    }

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Edit Post</h1>
                        <button onClick={logout} className="btn btn-danger">Logout</button>
                        <hr />
                        <form onSubmit={editPost}>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Content</label>
                                <textarea className="form-control" id="content" rows={3} value={content} onChange={(e) => setContent(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="media">Media</label>
                                <input type="file" className="form-control-file" id="media" onChange={(e) => {
                                    const reader = new FileReader()
                                    reader.readAsDataURL(e.target.files[0])
                                    reader.onload = (e) => {
                                        setMedia(e.target!.result.toString().split(",").pop())
                                    }
                                    setFileName(e.target.files[0].name)
                                    setFileType(e.target.files[0].type)
                                }
                                } />
                            </div>
                            <button type="submit" className="btn btn-primary">Edit Post</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

