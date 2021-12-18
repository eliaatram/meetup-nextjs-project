import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import MeetupForm from '../../components/Meetup/MeetupForm';

const NewMeetupPage = () => {
    const router = useRouter();

    const addMeetupHandler = async (enteredMeetupData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();
        console.log(data);

        router.push('/')
    }

    return (
        <>
            <Head>
                <title>New Meetup</title>
                <meta name="description" content='add a new meetup' />
            </Head>
            <MeetupForm onAddMeetup={addMeetupHandler} />
        </>
    )
}

export default NewMeetupPage
