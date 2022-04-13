import Link from 'next/link';

function ClientsPage(){
    const clients = [
        { id: "max", name: "Maximilian"},
        { id: "kate", name: "Katherine"},
        { id: "manu", name: "Manuel"}
    ];
    return (
    <div>
        <h1>Página de los Clientes </h1>
        <ul>
            {clients.map((client) => (
            <li key={client.id}>
                <Link href={`/clients/${client.id}`}>{client.name}</Link>
            </li>
            ))}
        </ul>
    </div>
    )
}

export default ClientsPage;

//url: http://localhost:3000/clients