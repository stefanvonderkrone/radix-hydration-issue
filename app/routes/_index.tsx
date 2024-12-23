import {
  defer,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = (args: LoaderFunctionArgs) => {
  const promise = new Promise<{ foo: string }>((resolve) =>
    setTimeout(
      () =>
        resolve({
          foo: "test",
        }),
      2000
    )
  );
  return defer({ promise });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to <span className="sr-only">Remix</span>
          </h1>
        </header>
        <Suspense fallback={null}>
          <Await resolve={data.promise}>
            {(result) => <div>{result.foo}</div>}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}
