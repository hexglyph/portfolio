import type { NextPage } from 'next'
import BasicInfo from '../components/BasicInfo'
import Hero from '../components/Hero'
import Layout from '../components/Layout/Layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <BasicInfo />
      <Hero />
    </Layout>
  )
}

export default Home
