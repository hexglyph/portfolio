//Administration page

import React from 'react'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout/Layout'
import clientPromise from '../lib/mongodb'

export async function getServerSideProps(context) {
    const client = await clientPromise
    const db = client.db('hex')
    const portfolio = await db.collection('portfolio').find({}).toArray()
    /*const admin = await db.collection('admin').then((docs) => {
                            console.log(JSON.stringify(docs))
                            })
    */
    return {
        props: {
            portfolio: JSON.parse(JSON.stringify(portfolio)),
        },
    }
}

export default function AdminPage(props, {portfolio}) {


    async function buttonCreateCollection(name) {

    }    

    return (
        <Layout>
            <div>Admin Page</div>
            {JSON.stringify(props.portfolio, null, 2)}

            {
                props.portfolio.map(portfolio => {
                    return (
                        <div key={portfolio._id}>
                            <p>Portfolio post array</p>
                            {
                                portfolio.post && 
                                portfolio.post.length > 0 && 
                                portfolio.post.map(post => {
                                    return (
                                        <div key={post._id}>
                                            <p>post array</p>
                                            <p>{post._id}</p>
                                            <p>{post.title}</p>
                                            <p>{post.text}</p>
                                        </div>
                                    )
                                })
                            }

                            {
                                portfolio.artist && 
                                portfolio.artist.length > 0 && 
                                portfolio.artist.map(artist => {
                                    return (
                                        <div key={artist._id}>
                                            <p>artist array</p>
                                            <p>{artist.artistName}</p>
                                            <p>{artist.artistBio}</p>
                                            <p>{artist.artistImage}</p>
                                            <p>{artist.artistVideo}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                    
                })
            }
            {
                props.portfolio && 
                props.portfolio.length > 0 && 
                props.portfolio.map((admin) => {
                    return (
                        <>
                            <div key={admin.index}>
                                <p>{admin.name}</p>
                                <p>{admin.email}</p>
                            </div>
                        </>
                    )
                })
            }


        </Layout>
    );
}
