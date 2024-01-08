export function Container({
  children,
  as = 'main'
}: React.PropsWithChildren<{ as?: 'main' | 'div' }>) {
  const Component = as;
  return (
    <Component className='mx-auto w-full max-w-screen-xl px-5 md:px-20'>
      {children}
    </Component>
  );
}
