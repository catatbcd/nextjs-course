import { useRouter } from 'next/router';

function SelectedClientProjectsPage(){
    const router = useRouter();
    
    console.log(router.query);
    return (
    <div>
        <h1>Página de un proyecto en especifico del cliente seleccionado </h1>
    </div>
    )
}

export default SelectedClientProjectsPage;

//url: http://localhost:3000/clients/max/1