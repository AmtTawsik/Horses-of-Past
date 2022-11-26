import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";

// This is SignUp Page
const SignUp = () => {
  const { user, createUser, updateUserProfile, loading, setLoading } =
    useContext(AuthContext);
  //   const [createdUserEmail, setCreatedUserEmail] = useState('')

  // Registration Handeler
  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        handleUpdateUserProfile(name, photo);
        saveUser(name, email, role);
        toast.success("User Created Successfully");
        form.reset();
      })
      .catch((error) => console.log(error));
  };

  // Take UserName and Picture
  const handleUpdateUserProfile = (name, photo) => {
    const profile = {
      displayName: name,
      photoURL: photo,
    };
    updateUserProfile(profile)
      .then(() => {})
      .catch((e) => console.log(e));
  };

    const saveUser = (name, email, role) => {
    const user = { name, email, role, isVarified:false, };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div className="">
      {loading ? (
        <div className="text-center p-80">
          <div role="status">
            <svg
              className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="SignUp flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-red-400">
          <div>
            <a href="/">
              <h3 className="text-2xl md:text-5xl font-bold text-white">
                SignUp
              </h3>
            </a>
          </div>
          <div className="w-full px-6 py-4 mt-6 overflow-hidden shadow-md sm:max-w-lg sm:rounded-lg">
            <form onSubmit={handleSubmit}>
              {/* Input Fuild for Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-50 undefined"
                >
                  Full Name
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="name"
                    className="block w-full mt-1 p-2 border-gray-300 rounded-md shadow-lg text-black focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
              </div>

              {/* Input Fuild for photo url */}
              <div className="mt-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-50 undefined"
                >
                  Photo URL
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="photo"
                    className="block w-full mt-1 p-2 border-gray-300 rounded-md shadow-lg text-black focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
              </div>

              {/* Input Fuild for Email */}
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-50 undefined"
                >
                  Email
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="email"
                    name="email"
                    className="block w-full mt-1 p-2 border-gray-300 rounded-md shadow-lg text-black focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
              </div>

              {/* Input Fuild for Password */}
              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-50 undefined"
                >
                  Password
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="password"
                    name="password"
                    className="block w-full mt-1 p-2 border-gray-300 rounded-md shadow-lg text-black focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
              <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-50 undefined"
                >
                  What's Your Role?
                </label>
                <select name="role" className="select select-bordered block w-full mt-1 p-2 border-gray-300 rounded-md shadow-lg text-black focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                  <option selected>
                    buyer
                  </option>
                  <option>seller</option>
                </select>
              </div>

              {/* SignUp Button */}
              <div className="flex items-center mt-8">
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-500 rounded-md hover:bg-purple-600">
                  SignUp
                </button>
              </div>
            </form>
            <div className="mt-4 text-grey-600">
              Already have an account?{" "}
              <Link to="/login">
                <button className="text-purple-600" href="#">
                  Log in
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
