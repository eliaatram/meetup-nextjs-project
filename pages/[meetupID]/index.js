import React from 'react';
import MeetupDetail from '../../components/Meetup/MeetupDetail';
import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';

const MeetupDetails = (props) => {
    return (
        <>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description" content={props.meetupData.description} />
            </Head>
            <MeetupDetail image={props.meetupData.image} title={props.meetupData.title}
                address={props.meetupData.address} description={props.meetupData.description} />
        </>
    )
}

// used for dynamic pages only when getStaticProps is used
export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://Elia:Eliaea@cluster0.hg9jp.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        // "false" means that the "paths" array contains all supported meetupID values
        // if the user enters anything that is not supported here, he would see a 404 page
        // if it's set to "true" nextJS will try to generate a page for this meetupID dynamically on the server
        fallback: 'blocking', // here we are telling to next js that the list of paths might not be exhaustive, there might be more
        paths: meetups.map((meetup) => ({
            params: {
                meetupID: meetup._id.toString()
            }
        })),
    };
}

// the page is pre-generated during the build process
export async function getStaticProps(context) {
    // fetch data for a single meetup

    const meetupID = context.params.meetupID;

    const client = await MongoClient.connect('mongodb+srv://Elia:Eliaea@cluster0.hg9jp.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupID) });

    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            }
        },
        revalidate: 10
    };
}

export default MeetupDetails
