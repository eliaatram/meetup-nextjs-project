import MeetupList from '../components/Meetup/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'First meetup',
    image: 'https://wonderfulengineering.com/wp-content/uploads/2014/07/Hi-Tech-Wallpaper-13.jpg',
    address: 'Some address 5, 12345 some city',
    description: 'First Meetup!'
  },
  {
    id: 'm2',
    title: 'Second meetup',
    image: 'https://wonderfulengineering.com/wp-content/uploads/2014/07/Hi-Tech-Wallpaper-13.jpg',
    address: 'Some address 5, 12345 some city',
    description: 'Second Meetup!'
  },
  {
    id: 'm3',
    title: 'Third meetup',
    image: 'https://wonderfulengineering.com/wp-content/uploads/2014/07/Hi-Tech-Wallpaper-13.jpg',
    address: 'Some address 5, 12345 some city',
    description: 'Third Meetup!'
  }
]

const HomePage = () => {
  return (
    <MeetupList meetups={DUMMY_MEETUPS} />
  )
}

export default HomePage
