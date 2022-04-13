import {  useRouter } from 'next/router';

function PortfolioProjectPage(){
    const router = useRouter();

    console.log(router.pathname);
    console.log(router.query.projectid); //retorna valor especifico del id

    return (
    <div>
        <h1>Página de los proyectos del portafolio </h1>
    </div>
    )
}

export default PortfolioProjectPage;
//url: http://localhost:3000/portfolio/projectid