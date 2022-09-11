import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import BasicInfo from '../components/BasicInfo'
import Hero from '../components/Hero'
import Layout from '../components/Layout/Layout'
import axios from 'axios'

export async function getServerSideProps(context) {
  let res = await axios.get('http://localhost:3000/api/posts')
            .then((res) => {
              return res.data
            })
  let lasttwoposts = res
  let data = res
  return {
    props: {data, lasttwoposts},
  }
}
export default function Home(props) {
  let data = props.data.data
  let lasttwoposts = props.lasttwoposts
  // Get the last two posts from data
  lasttwoposts = lasttwoposts.data.slice(-2)


  const router = useRouter()
  const [posts, setPosts] = useState(data)
  const [post, setPost] = useState(data[0])
  const [postIndex, setPostIndex] = useState(0)
  const [isPost, setIsPost] = useState(false)
  useEffect(() => {
    if (router.query.id) {
      const index = posts.findIndex((post) => post._id === router.query.id)
      setPostIndex(index)
      setPost(posts[index])
      setIsPost(true)
    } else {
      setPost(posts[0])
      setIsPost(false)
    }
  }, [posts, router.query.id])
  const handlePost = (index) => {
    setPostIndex(index)
    setPost(posts[index])
    setIsPost(true)
    router.push(`/post/${posts[index]._id}`)
  }
  const handleNext = () => {
    if (postIndex !== posts.length - 1) {
      setPostIndex(postIndex + 1)
      setPost(posts[postIndex + 1])
      router.push(`/post/${posts[postIndex + 1]._id}`)
    }
  }
  const handlePrev = () => {
    if (postIndex !== 0) {
      setPostIndex(postIndex - 1)
      setPost(posts[postIndex - 1])
      router.push(`/post/${posts[postIndex - 1]._id}`)
    }
  }
  return (
    <Layout>
      <Hero />
      <BasicInfo />
      <div className="w-full flex flex-col items-center justify-center">
        <h2>Last 2 posts</h2>
        <div className="w-full flex flex-col items-center justify-center">
          {
            lasttwoposts.map((post, index) => {
              return (
                <div
                  key={post._id}
                  className="w-full flex flex-col items-center justify-center"
                >
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                </div>
              )
            }
          )}


          

        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <h2>All posts</h2>
          {
            posts.map((post, index) => {
            return (
              <div
                key={post._id}
                className="w-full flex flex-col items-center justify-center"
              >
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <button onClick={() => handlePost(index)}>Read more</button>

                {isPost && (
                  <div className="w-full flex flex-col items-center justify-center">
                    <button onClick={handleNext}>Next</button>
                    <button onClick={handlePrev}>Prev</button>

                    <h3>{post.title}</h3>
                    <p>{post.content}</p>

                    <button onClick={() => handlePost(index)}>Read more</button>
                    <button onClick={() => router.push('/')}>Back</button>
                    <button onClick={() => router.push('/')}>Back</button>
                  </div>
                )}
              </div>
            )})
          }
        </div>                
      </div>
    </Layout>
  )
}
