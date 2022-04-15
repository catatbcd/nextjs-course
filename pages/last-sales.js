import { useEffect, useState } from "react";
import useSWR from 'swr';

function LastSalesPage(){
    const [sales, setSales]= useState();
    //const[isLoading, setIsLoading] = useState(false);

    const { data, error } = useSWR( 
        'https://nextjs-course-97b0b-default-rtdb.firebaseio.com/sales.json'
        );
        console.log(data);
    useEffect(() => {
        if(data) {
            const transformedSales = [];

            for (const key in data){
                transformedSales.push({
                    id:key, 
                    username: data[key].username, 
                    volume: data[key].volume,
                });
            }
            
            setSales(transformedSales);
        }
    },[data]);
    /*useEffect(() => {
        setIsLoading(true);
        fetch(
            'https://nextjs-course-97b0b-default-rtdb.firebaseio.com/sales.json'
        ).then(response => response.json())
        .then(data => {
            const transformedSales = [];

            for (const key in data){
                transformedSales.push({
                    id:key, 
                    username: data[key].username, 
                    volume: data[key].volume,
                });
            }
            setSales(transformedSales);
            setIsLoading(false);
        });
    },[])*/

    //if (isLoading){
    if(error){
       return <p>Failed to load</p>
    }
    if(!data){
        return <p>!data Loading...</p>
    }
    if(!sales){
        return <p>!sales Loading...</p>
    }
       
    return (
    <ul>
        {sales.map((sale) =>(
         <li key={sale.id} >
            {sale.username}-${sale.volume}
        </li>
        ))}
    </ul>);
}

export default LastSalesPage;