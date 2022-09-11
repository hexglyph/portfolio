//Administration page

/*
    Collection Portfolio
    [{
        "_id": {
            "$oid": "631102f03a93ff232d36926c"
        },
        "post": [
            {
            "_id": 1,
            "date": "",
            "title": "Titulo 1",
            "text": "Texto 1",
            "media": 111
            },
            {
            "_id": 2,
            "date": "",
            "title": "Titulo 1",
            "text": "Texto 1",
            "media": 111
            },
            {
            "_id": 3,
            "date": "",
            "title": "Titulo 1",
            "text": "Texto 1",
            "media": 111
            },
            {
            "_id": 4,
            "date": "",
            "title": "Titulo 1",
            "text": "Texto 1",
            "media": 111
            },
            {
            "_id": 5,
            "date": "",
            "title": "Titulo 1",
            "text": "Texto 1",
            "media": 111
            },
            {
            "_id": 6,
            "date": "",
            "title": "Titulo 1",
            "text": "Texto 1",
            "media": 111
            },
            {
            "_id": 7,
            "date": "",
            "title": "Titulo 1",
            "text": "Texto 1",
            "media": 111
            }
        ],
        "info": {
            "title": "TITLE",
            "seo": "SEO"
        }
        }]
*/

import React from 'react'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout/Layout'
import clientPromise from '../lib/mongodb'

export async function getServerSideProps(context) {
    const client = await clientPromise
    const db = client.db('hex')
    let portfolio = await db.collection('portfolio').find({}).toArray()
    /*const admin = await db.collection('admin').then((docs) => {
                            console.log(JSON.stringify(docs))
                            })
    */

    // Find title in the collection
    let title = await db.collection('portfolio').findOne({ 'info.title': 'TITLE' })
    let post = await db.collection('portfolio').find({ 'post': { $elemMatch: { _id: 1 } } }).toArray()
    

    portfolio = JSON.parse(JSON.stringify(portfolio))
    title = JSON.parse(JSON.stringify(title))
    post = JSON.parse(JSON.stringify(post))


    return {
        props: {
            portfolio,
            title,
            post
        },
    }
}

export default function AdminPage(props) {
    async function buttonCreateCollection(name) {

    }    

    return (
        <Layout>
            <div>Admin Page</div>
            {/*JSON.stringify(props.portfolio, null, 2)*/}

            {/*props.title.info.title*/}
            <div>
                Post Page 
                {props.post[0].post[0].title}
                Post Page 
            </div>
            
            

            {
                props.portfolio.map((portfolio) => {
                    return (
                        <div key={portfolio.info._id}>
                            Info
                            <div>{portfolio.info.title}</div>
                            <div>{portfolio.info.seo}</div>
                        </div>
                    )
                })
            }

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
                                            <p>post</p>
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
                                portfolio.artist.map((artist: any) => {
                                    return (
                                        <div key={artist._id}>
                                            <p>artist</p>
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
