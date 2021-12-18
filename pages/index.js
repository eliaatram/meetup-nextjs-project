import { MongoClient } from 'mongodb';
import Head from 'next/head';
import MeetupList from '../components/Meetup/MeetupList';

const HomePage = (props) => {

  return (
    <>
      <Head>
        <title>Meetups</title>
        <meta name="description" content='List of Meetups' />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  )
}

// this function runs for every incoming request
// there is no need to revalidate
// that can actually be a disadvantage, because we need to wait for the page
// to be generated on every incomingrequest
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     },
//   };
// }

// here we pre-generate an HTML file
// this file can then be stored and served by a CDN
// this is simply faster that pre-generating the page for every incoming request
// because then it can be cached and reused, instead of regenerated every time
// "getServerSideProps" should really only be used if we need acces to the concrete request object
// or if we really have data that changes multiple times every second
export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect('mongodb+srv://Elia:Eliaea@cluster0.hg9jp.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
      }))
    },
    // number of seconds next js will wait until it regererates this page
    // for an incoming request, with revalidate set to some number, this page will not just be generated during the build process
    // but it will also be generated every couple of seconds on the server, at least if there are request for this page
    revalidate: 10
  };
}

export default HomePage
