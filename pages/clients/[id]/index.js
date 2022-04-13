import { useRouter } from 'next/router';

function ClientProjectsPage(){
    const router = useRouter();

    console.log(router.query); 
    return (
    <div>
        <h1>Página de proyectos del cliente </h1>
    </div>
    )
}

export default ClientProjectsPage;

//url: http://localhost:3000/clients/max