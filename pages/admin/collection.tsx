// Collection creation page
import type { NextPage } from 'next'
import { getSession, signOut } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout/Layout'
import clientPromise from '../../lib/mongodb'
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
export default function CollectionCreate(props) {
    const [collectionName, setCollectionName] = useState('')
    const [collectionNameDelete, setCollectionNameDelete] = useState('')



    async function handleCollectionCreation(e: any){
        e.preventDefault()      
        // Get data from form
        let collection = {
            name: collectionName
        }
        // Send data to API
        let res = await axios.post(process.env.NEXT_PUBLIC_APP_API_COLLECTION, collection)
        console.log(res) 
    }

    async function handleCollectionDeletion(e: any){   
        e.preventDefault()      
        // Get data from form
        let collectiondelete = {
            name: collectionNameDelete
        }
        console.log(collectiondelete)
        // Send data to API
        let res = await axios.delete(process.env.NEXT_PUBLIC_APP_API_COLLECTION, {data: collectiondelete})
        console.log(res)
         
    }

  
  return (
    <Layout>
        <div>
            <form onSubmit={handleCollectionCreation}>
                <label htmlFor="collectionName">Collection Name</label>
                <input type="text" id="collectionName" value={collectionName} onChange={
                    (e) => {
                        setCollectionName(e.target.value)
                    }} />
                <button type="submit">Create Collection</button>
            </form>
        </div>
        <div>
            <form onSubmit={handleCollectionDeletion}>
                <label htmlFor="collectionNameDelete">Collection Name</label>
                <input type="text" id="collectionNameDelete" value={collectionNameDelete} onChange={
                    (e) => {
                        setCollectionNameDelete(e.target.value)
                    }} />
                <button type="submit">Delete Collection</button>
            </form>
        </div>
                 
      
    </Layout>
  )
}
