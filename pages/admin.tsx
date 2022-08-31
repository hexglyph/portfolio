//Administration page

import React from 'react';
import { GetServerSideProps } from 'next';
//import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
//import { useSession } from 'next-auth/client';
//import { useQuery } from 'react-query';
import { getAdmin } from '../services/admin';
import { getArtist } from '../services/artist';
import Layout from '../components/Layout/Layout';
import { AdminForm } from '../components/AdminForm/AdminForm';

type Props = {
    admin: any;
}

export default function AdminPage(props: Props) {
    //const [session, loading] = useSession();
    const router = useRouter();
    //const { data, isLoading } = useQuery<Admin>('admin', getAdmin);
    const dataAdmin = getAdmin
    const dataArtist = getArtist
    
    /*if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if (!session) {
        router.push('/login');
        return null;
    }*/
    
    return (
        <Layout>
            <AdminForm admin={dataAdmin} artist={dataArtist} />
        </Layout>
    );
}
