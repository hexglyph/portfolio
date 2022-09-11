//Login Admin Page

import { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { getSession } from 'next-auth/react'
import Loading from "../components/Loading"
import Layout from "../components/Layout/Layout"

export default function Login(props: any) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getSession().then((session) => {
          if (session) {
              router.replace('/');
          } else {
              setLoading(false);
          }
      })
    }, [router])

    if (loading) {
        return <Loading />
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const result = await signIn('credentials', {
            redirect: false,
            email: email,
            password: password
        })
        console.log(result)
        if (result.error) {
            alert(result.error)
            setLoading(false)
        } else {
            router.replace('/admin')
        }
    }

    return (
        <Layout>
            <div className="w-full flex flex-col justify-start items-center">
                <form className="w-full md:w-3/5 flex flex-col my-8" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        className="border border-gray-600 rounded-md"
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        className="border border-gray-600 rounded-md"
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="bg-teal-500 m-4" type="submit">Login</button>
                </form>
            </div>
        </Layout>
    )
}