import { PageProps } from '$fresh/server.ts';
import { Handlers } from '$fresh/server.ts';
import { Input } from '@/components/Input.tsx';
import { FormButton } from '@/components/FormButton.tsx';
import CreatePost from '@/islands/CreatePost.tsx';

export const handler: Handlers = {
  async GET(_req, ctx) {
    return await ctx.render();
  },
};
export const CreatePostPage = (props: PageProps) => {
  return (
    <div class={'mx-auto max-w-screen-md p-4'}>
      <div class='flex justify-center'>
        <div class='flex flex-col items-stretch w-[500px] md:w-2/3'>
          <div class='flex justify-center'>
            <img
              src='/logo.svg'
              class='w-16 h-16 mt-8 mb-4'
              alt='the fresh logo: a sliced lemon dripping with juice'
            />
          </div>

          <CreatePost />
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
// <div class={''}>
//       <form
//         method={'post'}
//         class={'h-screen self-center items-center w-auto flex flex-col align-middle justify-center self-center'}
//         action={'/api/'}
//       >
//         <Input type={'text'} name={'username'} placeholder={'username'} />
//         <Input type={'password'} name={'password'} placeholder={'password'} />
//         <Button type={'submit'}>Submit</Button>
//       </form>
//     </div>
