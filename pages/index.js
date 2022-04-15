import path from 'path';
import fs from 'fs/promises';
import Link from 'next/link';

function HomePage(props) {
    const { products } = props;
    return (
      <ul>
       {products.map((product) =>(
           <li key={product.id}><Link href={`/products/${product.id}`} >{product.title}</Link></li>

       ))}
      </ul>
    );
  }
  
  export async function getStaticProps(){
    console.log('(Re)Generating...');
    const filePath = path.join(process.cwd(),'data','dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    if(!data){
      return{
        redirect: {
          detination:'/no-data'

        } //para redirigir
      }
    }

    if(data.products.length === 0) {
      return{ notFound:true // si es  true retorna 404 error
    };
    }

      return {
        props: {
          products: data.products
        },
      revalidate: 10, // tiempo en seg para la siguiente regeneracion ISG (Incremental Static Generation)
     
    };


  }
  export default HomePage;