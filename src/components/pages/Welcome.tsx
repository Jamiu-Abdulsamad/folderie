import Header from "../header";

export default function Welcome() {
  return (
    <div className="h-full overflow-y-auto">
      <Header />
      <div className="mt-6 text-center text-3xl font-bold text-customBlue">
        Welcome to Docworld
      </div>
      <div className="text-md mt-4 text-center text-gray-700">
        A seamless and intuitive solution for all your file management needs.
        Whether you’re organizing your personal documents or managing team
        projects, and intuitive solution for all your file management needs.
        Whether you’re organizing your personal documents or managing team
        projects Docworld is here to make it easier.
      </div>

      <div className="mt-10 text-center text-2xl font-semibold text-customBlue">
        What We Offer?
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-6 px-4">
        <div className="w-[300px] rounded-lg bg-[rgb(201,224,245)] p-6 shadow-md">
          <h3 className="text-1xl mb-3 text-center font-bold text-customBlue">Effortless Organization</h3>
          <p className="text-center text-sm">
            Organize your files into folders, categorize documents, and keep
            everything structured.
          </p>
        </div>
        <div className="w-[300px] rounded-lg bg-[rgb(201,224,245)] p-6 shadow-md">
          <h3 className="text-1xl mb-3 text-center font-bold text-customBlue">Secure Sharing</h3>
          <p className="text-center text-sm">
            Share files securely with your team or clients with just a few
            clicks.
          </p>
        </div>
        <div className="w-[300px] rounded-lg bg-[rgb(201,224,245)] p-6 shadow-md">
          <h3 className="text-1xl mb-3 text-center font-bold text-customBlue">Cloud Backup</h3>
          <p className="text-center text-sm">
            Never lose a file again with our automatic cloud backup solutions.
          </p>
        </div>
      </div>

      <div className="mt-10 text-center text-2xl font-semibold text-customBlue">
        Getting Started is Easy Too!
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-6 px-4">
        <div className="w-[300px] rounded-lg bg-[rgb(201,224,245)] p-6 shadow-md">
          <h3 className="text-1xl mb-3 text-center font-bold text-customBlue">Step 1: Sign Up</h3>
          <p className="text-center text-sm">
            Create an account to start organizing and managing your documents.
          </p>
        </div>
        <div className="w-[300px] rounded-lg bg-[rgb(201,224,245)] p-6 shadow-md">
          <h3 className="text-1xl mb-3 text-center font-bold text-customBlue">Step 2: Upload Files</h3>
          <p className="text-center text-sm">
            Easily upload your files and documents to your secure storage.
          </p>
        </div>
        <div className="w-[300px] rounded-lg bg-[rgb(201,224,245)] p-8 shadow-md">
          <h3 className="text-1xl mb-3 text-center font-bold text-customBlue">Step 3: Collaborate</h3>
          <p className="text-center text-sm">
            Invite your team and start working together seamlessly.
          </p>
        </div>

      </div>
    </div>
  );
}
