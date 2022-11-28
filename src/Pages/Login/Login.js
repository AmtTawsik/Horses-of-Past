import React from "react";
import "../../App.css";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";
import Loading from "../Shared/Loading";
import useToken from "../../hooks/useToken";

const Login = () => {
  const [loginUserEmail, setLoginUserEmail] = useState('');
  const [token] = useToken(loginUserEmail);
  const { ProviderLogin, signIn, loading, setLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const googleProvider = new GoogleAuthProvider();
  const [error, setError] = useState(" ");

  const from = location.state?.from?.pathname || "/";
  if (token) {
    navigate(from, { replace: true });
  }

  const handleSignIn = (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    // Sign in With Email and Password
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError(" ");
        toast.success("Login successfull");
        // setLoginUserEmail(email);


        //JWT
        
        fetch(`https://horses-of-past-server.vercel.app/jwt?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
          }
        });


        //JWT
        
        
        navigate(from, { replace: true });
        setLoading(false);
        form.reset();
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  // Sign in With Google
  const handleGoogleSignIn = () => {
    setLoading(true);
    ProviderLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        saveUser(user.displayName, user.email);
        // setLoginUserEmail(user.email);

        //JWT
        
        fetch(`https://horses-of-past-server.vercel.app/jwt?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
          }
        });


        //JWT

        navigate(from, { replace: true });
        setLoading(false);
        toast.success("Login successfull");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const saveUser = (name, email) => {
    const user = { name, email, role: "buyer", isVarified: false };
    fetch("https://horses-of-past-server.vercel.app/users", {
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
    <>
      {loading ? (
        <Loading></Loading>
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
