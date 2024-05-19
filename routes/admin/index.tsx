import type { Handlers, PageProps } from '$fresh/server.ts';
import { getCookies } from '$std/http/cookie.ts';
import { Input } from '@/components/Input.tsx';

export type AuthData = {
  isAllowed: boolean;
};

export const Login = () => {
  return (
    <form method={'post'} action={'/api/login'}>
      <Input type={'text'} name={'username'} placeholder={'username'} />
      <Input type={'password'} name={'password'} placeholder={'password'} />
      <button type={'submit'}>Submit</button>
    </form>
  );
};

export const handler: Handlers = {
  GET(req, ctx) {
    const cookies = getCookies(req.headers);
    return ctx.render!({ isAllowed: cookies.auth === 'bar' });
  },
};

export default function Auth({ data }: PageProps<AuthData>) {
  return (
    <div>
      <div>
        You Currently {data.isAllowed ? 'are' : 'are not'} logged in.
        <Login />
      </div>
    </div>
  );
}
