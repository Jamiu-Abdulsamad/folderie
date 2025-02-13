import { CircleArrowRight } from 'lucide-react';
import logo from '../../components/images/doc-img.avif';
import { Link } from 'react-router';

export default function GuestIndex() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* Centered container with rounded borders */}
      <div className="min-h-[90vh] w-[40%] max-w-4xl flex-none rounded-[60px] border bg-white p-8 shadow-lg">
        <div className="flex flex-col justify-center text-center">
          <h1 className="py-3 text-5xl font-bold text-customBlue">
            Welcome to Docworld<br />
          </h1>
          <div className="fw-900 font-bold italic">
            ...a safe space for all your documents
          </div>
          <br />
          {/* Larger image */}
          <img
            className="h-75 mx-auto mb-3 mt-3 w-80 rounded-[100%] object-cover shadow-[0px_10px_20px_rgba(0,0,0,0.3)]"
            src={logo}
            alt="home-img"
          />
          <br />
          <div className="fw-extrabold font-bold italic">
            Experience the beauty, and security of document archiving...
          </div>
          <div className="mt-2 flex items-center justify-center gap-3">
            <Link to={"/register"} className="m-4 flex items-center gap-3 rounded-lg bg-customBlue px-5 py-2.5 font-normal text-white hover:bg-blue-600">
              Get started <CircleArrowRight strokeWidth={1.3} />
            </Link>

          </div>
          <div className='flex items-center justify-center gap-3'>
            <div>Already have an account?</div>
            <div>
              <Link to="/signIn" className="text-customBlue hover:underline">
                Sign In
              </Link>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
