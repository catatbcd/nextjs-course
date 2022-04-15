function UserProfilePage(props){
    return <h1>{props.username}</h1>
}

export default UserProfilePage;

export async function getServerSideProps(context){//no necesita revalidate ya que por defecto corre con cada request
    const { params, req ,res } = context;
    //console.log(req);
    //console.log(res);
    console.log('Server side code');
    return {
        props: {
            username: "Max"
        }
    }
}