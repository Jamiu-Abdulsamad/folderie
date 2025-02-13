import { Link, useRouteError } from "react-router";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="mx-auto mt-52 w-max text-start">
      <div className="pb-5 font-semibold">
        <h1>Oops!</h1>
        <p>Sorry, nothing to see here yet, we're still building...</p>
      </div>
      <p className="pb-5 text-gray-400">
        <i>Page not found</i>
      </p>

      <Link to='/app/documentS' className="rounded-md bg-customBlue px-4 py-2 text-sm text-white hover:bg-blue-500">
        Back to dashboard
      </Link>
    </div>
  );
}
