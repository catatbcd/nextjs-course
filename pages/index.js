import Head from 'next/head';
import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';

function HomePage(props){
    return (
        <div>
          <Head>
            <title>NextJS Eventos</title>
            <meta name="description" content="Find a lot of great events that allow you to envolve..." />
          </Head>
           <EventList items={props.events} />
        </div>
    )
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return{
    props:{
      events:featuredEvents
    },
    revalidate: 1800 //se regenera cada hora y media
  }
}
export default HomePage; 