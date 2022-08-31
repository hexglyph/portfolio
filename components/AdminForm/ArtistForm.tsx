//AdminForm 

import React, { useState } from 'react';
import { Admin } from '../../types/admin';
import { Artist } from '../../types/artist';
import { updateAdmin } from '../../services/admin';
import { updateArtist } from '../../services/artist';

type Props = {
    admin: Admin;
    artist: Artist;
}

export const AdminForm = (props: Props) => {
    const [showSuccess, setShowSuccess] = useState(false);

    const onSubmit = async (data: Admin) => {
        await updateAdmin(data);
        setShowSuccess(true);
    };
    const onSubmitArtist = async (data: Artist) => {
        await updateArtist(data);
        setShowSuccess(true);
    };

    return (
        <div>
            <h1>Admin</h1>

            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={admin.name}
                    />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        defaultValue={admin.email}
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        defaultValue={admin.password}
                    />
                </div>

                <button type="submit">Update</button>
            </form>
            
            {showSuccess && <p>Success!</p>}

            <div>
                <form onSubmit={onSubmitArtist}>
                    {/* Artist name update */}
                    <div><h2>Content</h2></div>
                    <div>
                        <label htmlFor="artistName">Artist Name</label>
                        <input
                            type="text"
                            name="artistName"
                            id="artistName"
                            defaultValue={artist.artistName}
                        />

                        <label htmlFor="artistBio">Artist Bio</label>
                        <input
                            type="text"
                            name="artistBio"
                            id="artistBio"
                            defaultValue={artist.artistBio}
                        />

                        <label htmlFor="artistImage">Artist Image</label>
                        <input
                            type="text"
                            name="artistImage"
                            id="artistImage"
                            defaultValue={artist.artistImage}
                        />

                        <label htmlFor="artistVideo">Artist Video</label>
                        <input
                            type="text"
                            name="artistVideo"
                            id="artistVideo"
                            defaultValue={artist.artistVideo}
                        />

                        <button type="submit">Update</button>
                    
                    </div>
                </form>
            </div>
        </div>
    );
}

