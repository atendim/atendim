import { api } from '@/trpc/server';

export default async function Home() {
  const hello = await api.hello.hello.query({ teste: 'teste' });
  return (
    <main>
      <h1>{hello.message}</h1>
    </main>
  );
}
