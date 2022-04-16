import {useRouter} from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import ErrorAlert from '../../components/ui/error-alert';
import Button from '../../components/ui/button';
import { getFilteredEvents } from '../../helpers/api-util';
import useSWR from 'swr';
import Head from 'next/head';

const fetcher = (url) => fetch(url).then((res) => res.json());

function FilteredEventsPage(props){
    const [loadedEvents, setLoadedEvents] = useState();
    
    const router = useRouter();

    const filterData = router.query.slug;

    const { data, error } = useSWR(
        'https://nextjs-course-97b0b-default-rtdb.firebaseio.com/events.json', fetcher
      );

      useEffect(()=>{
          if(data){
            const events = [];
  
            for (const key in data) {
              events.push({
                id: key,
                ...data[key]
              });
            }
          
            setLoadedEvents(events);
          }

      },[data])

    //console.log(filterData);
    if(!loadedEvents){
        return <p className='center'>Loading ...</p>

    }
    const filterYear = filterData[0];
    const filterMonth = filterData[1];
 // transformar datos a numeros
    const numYear = +filterYear;
    const numMonth = +filterMonth;

    if(isNaN(numYear)||isNaN(numMonth)||numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12){
        return(
            <Fragment>
                <ErrorAlert>Invalid filter. Please adjust your values!</ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
                
            </Fragment>
            );
        
    }
    const filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
      });
      


    if(!filteredEvents || filteredEvents.length === 0){
        return(
        <Fragment>
            <ErrorAlert>No events found for the chosen filter</ErrorAlert>
            <div className='center'>
                <Button link='/events'>Show All Events</Button>
            </div>
            
        </Fragment>
        );
    }
    const date = new Date(numYear,numMonth-1);

    return (
        <Fragment>
            <Head>
            <title>Eventos Filtrados</title>
            <meta name="description" content={`Todos los eventos del ${numMonth}/${numYear}.`} />
          </Head>
            <ResultsTitle date={date} />
           <EventList items={filteredEvents} />
        </Fragment>
    )
}


/*export async function getServerSideProps(context){
    const {params}= context;
    const filterData = params.slug;

    const filterYear = filterData[0];
    const filterMonth = filterData[1];
 // transformar datos a numeros
    const numYear = +filterYear;
    const numMonth = +filterMonth;

    if(isNaN(numYear)||isNaN(numMonth)||numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12||error){
        return{
            props:{hasError: true},
            //notFound:true,
            //redirect:{
                //destination: '/error'
            //}
        };
        
    }

    const filteredEvents = await getFilteredEvents({
        year: numYear,
        month: numMonth,
    });
    return {
        props:{
            events: filteredEvents,
            date:{
                year: numYear,
                month: numMonth
            }
        }
    }
}*/
export default FilteredEventsPage;