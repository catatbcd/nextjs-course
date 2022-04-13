import Link from 'next/link';

function HomePage(){
    return (
    <div>
        <h1>Página de Inicio </h1>
        <ul>
            <li>
                <Link href="/portfolio">Portafolio</Link>
            </li>
            <li>
                <Link href="/clients">Clientes</Link>
            </li>
            
        </ul>
    </div>
    )
}

export default HomePage;
//url: http://localhost:3000/