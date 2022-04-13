import { useRouter } from 'next/router';

function ClientProjectsPage(){
    const router = useRouter();

    console.log(router.query); 

    function loadProjectHandler(){
        //load data
        //router.push('/clients/max/projecta');
        router.push({
            pathname:'/clients/[id]/[clientprojectid]',
            query: { id: 'max', clientprojectid: 'projecta'},
        })

    }
    return (
    <div>
        <h1>Página de proyectos del cliente </h1>
        <button onClick={loadProjectHandler}>Cargar proyecto A</button>
    </div>
    )
}

export default ClientProjectsPage;

//url: http://localhost:3000/clients/max