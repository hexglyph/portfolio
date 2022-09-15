import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import BasicInfo from '../components/BasicInfo'
import Hero from '../components/Hero'
import Layout from '../components/Layout/Layout'
import useAppData from '../data/hook/UseAppData'
import axios from 'axios'

export async function getServerSideProps(context) {
  let res = await axios.get(process.env.NEXT_PUBLIC_APP_API_POSTS)
            .then((res) => {
              return res.data
            })
  let cms = await axios.get(process.env.NEXT_PUBLIC_APP_API_CMS)
            .then((res) => {
              return res.data
            })
  let data = res
  let cmsData = cms
  return {
    props: {
      data,
      cmsData
    },
  }
}
export default function Home(props) {
  let data = props.data.data
  let lasttwoposts = props.data
  // Get the last two posts from data
  lasttwoposts = lasttwoposts.data.slice(-2)
  let cmsprop = props.cmsData

  const router = useRouter()
  const [posts, setPosts] = useState(data)
  const [post, setPost] = useState(data[0])
  const [postIndex, setPostIndex] = useState(0)
  const [isPost, setIsPost] = useState(false)

  const [ postNum, setPostNum] = useState(1)

  const { htmlSize, switchTheme, switchMenu, theme, menu, size, setCmsData, cms } = useAppData()

  useEffect(() => {
    setCmsData(cmsprop.data[0])
    console.log('cms',cms)
  }, [
    setCmsData,
    cmsprop,
    cms
  ])


  function handleLoadMore() {
    setPostNum(prevPostNum => prevPostNum + 1)
  }
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
        <div>
          Load data from getCmsData:
          <div>
            {
              // verify if cms data is loaded
              cms && cms.title !== '' ? cms.title : 'Loading...'
            }
          </div>
        </div>
        <h2>Last 2 posts</h2>
        <div className="w-full flex flex-col items-center justify-center">
          {
            // Load the last two posts
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
            // Load all posts
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
        <div className='bg-sky-500'>
          {
            // Load more posts
            posts.slice(0, postNum).map(
              (post, index) => {
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
                )
              }
            )
          }

          <button onClick={handleLoadMore}>Load More</button>

      </div>              
      </div>
    </Layout>
  )
}
