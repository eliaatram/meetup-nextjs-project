import React from 'react';
import MeetupForm from '../../components/Meetup/MeetupForm';

const NewMeetupPage = () => {

    const addMeetupHandler = (enteredMeetupData) => {
        console.log(enteredMeetupData);
    }

    return (
        <MeetupForm />
    )
}

export default NewMeetupPage
