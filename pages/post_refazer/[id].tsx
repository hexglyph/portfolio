// Post API route = /api/post/[id]
// Page to view the post
import { NextApiRequest, NextApiResponse } from 'next'
//API route to get the post
import { getPost } from '../api/post_refazer/[_id]'

//Page to view the post
export default function Post({ postID }) {

    // getPost
    const id = postID
    let content
    const post = getPost(id, content)
    console.log(post)


    return (
        <div>
            
        </div>
    )
}