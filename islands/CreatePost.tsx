import { FormButton } from '@/components/FormButton.tsx';
import { Input } from '@/components/Input.tsx';

export const CreatePost = () => {
  return (
    <>
      <div class='items-stretch min-w-0'>
        <div class='flex justify-center'>
          <h2 class='my-4'>Create Post</h2>
        </div>
        <form method='post' class='flex flex-col space-y-4 min-w-0'>
          <Input
            autofocus
            class={'border-2'}
            name='title'
          />
          <Input class={'border-2'} name='snippet' />
          <label for={'content'}>Content</label>
          <textarea
            class={'border-2 rounded p-2'}
            id='content'
            name={'content'}
            value={''}
          />
          <FormButton
            type='submit'
            formAction={'/api/create-post'}
            class='!mt-8 bg-[#86efac]'
          >
            Submit
          </FormButton>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
