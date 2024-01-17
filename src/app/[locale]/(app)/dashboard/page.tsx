import { auth, signOut } from '@/auth';

async function HomePage() {
  const session = await auth();
  return (
    <div>
      <h1>{JSON.stringify(session)}</h1>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button type='submit'>Singooooout</button>
      </form>
    </div>
  );
}

export default HomePage;
