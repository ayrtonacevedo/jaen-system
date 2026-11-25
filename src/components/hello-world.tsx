type HelloWorldProps = {
  name: string;
};

export function HelloWorld({ name }: HelloWorldProps) {
  return (
    <section className="flex flex-col items-center gap-2 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">Hola mundo</h1>
      <p className="text-lg opacity-70">Bienvenido a {name}</p>
    </section>
  );
}
