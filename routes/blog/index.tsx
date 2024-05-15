import { Handlers, PageProps } from '$fresh/server.ts';
import { getPosts, Post } from '@/utils/posts.ts';
import { PostCard } from '@/components/PostCard.tsx';

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts();
    return ctx.render(posts);
  },
};
export const BlogIndexPage = (props: PageProps<Post[]>) => {
  const posts = props.data;
  return (
    <main class={'max-w-screen-md px-4 pt-16 mx-auto'}>
      <h1 class={'text-5xl font-bold'}>Blog</h1>
      <div class={'mt-8'}>
        {posts.map((post) => <PostCard post={post} />)}
      </div>
    </main>
  );
};

export default BlogIndexPage;
