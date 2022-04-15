import {useRouter} from 'next/router';
import { Fragment } from 'react';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import ErrorAlert from '../../components/ui/error-alert';
import Button from '../../components/ui/button';
import { getFilteredEvents } from '../../dummy-data';

function FilteredEventsPage(){
    const router = useRouter();

    const filterData = router.query.slug;

    //console.log(filterData);
    if(!filterData){
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

    const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth,
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
            <ResultsTitle date={date} />
           <EventList items={filteredEvents} />
        </Fragment>
    )
}
export default FilteredEventsPage;