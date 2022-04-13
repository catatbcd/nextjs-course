import { useRouter } from 'next/router';
function BlogPostsPage(){
    const router = useRouter();
    
    console.log(router.query);
    return (
    <div>
        <h1>Blogs Posteados</h1>
    </div>
    )
}

export default BlogPostsPage;
//url: http://localhost:3000/blog/2022/12/today
//url: http://localhost:3000/blog/2022/08