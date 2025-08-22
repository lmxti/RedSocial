import Layout from "@/components/Layout";
import HomeHashtags from "@/components/Post/HomeHashtags";
import CreatePost from "@/components/Post/CreatePost";
import PostList from "@/components/Post/PostsList";
// Hooks personalizados para publicaciones
import { usePosts } from "@/hooks/posts/usePosts";
import { useCreatePost } from "@/hooks/posts/useCreatePost";

export default function HomePage() {
  const { data: posts = [], isLoading } = usePosts();
  const createPost = useCreatePost();

  return (
    <Layout title="Inicio | NextJS" description="Descripcion Inicio" navbar rightComponent={<HomeHashtags />}>
      
      <CreatePost 
        onSubmit={(form) => createPost.mutate(form)} 
        loading={createPost.isLoading} 
      />
      <PostList posts={posts} loading={isLoading} />      
      
    </Layout>
  );
}
