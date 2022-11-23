import React from "react";
import "../../App.css";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const { ProviderLogin, signIn, loading, setLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const googleProvider = new GoogleAuthProvider();
  const [error, setError] = useState(" ");

  const from = location.state?.from?.pathname || "/";

  const handleSignIn = (event) => {
    setLoading(true);
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    // Sign in With Email and Password
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
        setError(" ");

        // jwt token start
        const currentUser = {
          email: user.email,
        };
        fetch("https://photo-phactory-server.vercel.app/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            localStorage.setItem("Photo-Phactory-Token", data.token);
            navigate(from, { replace: true });
            setLoading(false);
            toast.success("Login successfull");
          });
      })
      .catch((error) => setError(error.message));
  };

  // Sign in With Google
  const handleGoogleSignIn = () => {
    setLoading(true);
    ProviderLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);

        // jwt token start
        const currentUser = {
          email: user.email,
        };
        fetch("https://photo-phactory-server.vercel.app/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            localStorage.setItem("Photo-Phactory-Token", data.token);
            navigate(from, { replace: true });
            setLoading(false);
            toast.success("Login successfull");
          });
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
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
        <div className="hero min-h-screen bg-base-200 login-from">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-white">Login now!</h1>
              <p className="py-6 text-orange-200 text-lg">
                PHOTO-PHACTORY is one of the most populer website for
                Photography services. You can easyly get Any kind of services
                from our website. just login and start a new jaurny of enjoy
                your Life with us.
              </p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form onSubmit={handleSignIn} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control mt-2">
                  <button
                    type="submit"
                    className="btn bg-emerald-400 hover:bg-emerald-600 text-white font-bold border-0"
                  >
                    Login
                  </button>
                </div>
                <p>
                  Don't Have an Account?
                  <Link to="/signup" className="link link-primary">
                    {" "}
                    Sign Up Now!
                  </Link>
                </p>
                {/* error message */}
                <p className="text-red-600 text-center font-lg">{error}</p>
              </form>

              <div className="flex items-center w-full my-0">
                <hr className="w-full" />
                <p className="px-3 ">OR</p>
                <hr className="w-full" />
              </div>
              <div className="my-0 space-y-2 p-5 mt-0">
                {/* Google Login */}
                <button
                  onClick={handleGoogleSignIn}
                  aria-label="Login with Google"
                  type="button"
                  className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 hover:bg-emerald-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    className="w-5 h-5 fill-current"
                  >
                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                  </svg>
                  Login with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
