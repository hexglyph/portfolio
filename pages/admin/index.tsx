//Admin Home Page
import { getSession, signOut } from 'next-auth/react'
import Layout from "../../components/Layout/Layout"
import { useEffect, useState } from "react"
import Loading from "../../components/Loading"
import { useRouter } from 'next/router'
import clientPromise from '../../lib/mongodb'

export async function getServerSideProps(context) {
    const client = await clientPromise
    const db = client.db('hex')
    let portfolio = await db.collection('posts').find({}).toArray()

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

export default function Admin(props: any) {
    const router = useRouter()

    async function logout() {
        signOut()
        router.push('/login')
    }

    return (
        <Layout>
            <div className="w-full flex flex-col justify-start items-center">
                <h1 className="text-3xl font-bold">Admin Home</h1>
                <h2>Email:
                    {
                        
                        
                    }
                </h2>
                <h2>Name:</h2>
                <button onClick={logout}>Logout</button>
                <div>
                    <div>Admin Page</div>

            
            
                </div>
            </div>
        </Layout>
    )
}
