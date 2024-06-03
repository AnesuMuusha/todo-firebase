import React, { useEffect, useState } from "react";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import Todo from "./Todo";

function SignIn() {
  const [value, setValue] = useState("");

  const handleFacebookLogin = () => {
    alert("Use Google sign In!");
  };


  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
    });
  };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  });

  return (
    <div>
      {value ? (
        <Todo />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h3 className="font-bold py-2 px-4 text-2xl">Todo-App</h3>
          <br />
          <p className="font-bold py-2 px-4">Sign in</p>
          <br />
          <p>
            <button
              className="w-60 bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4 hover:bg-blue-700"
              onClick={handleFacebookLogin}
            >
              Login with Facebook
            </button>
          </p>
          <p>
            <button
              className="w-60 bg-white text-gray-700 py-2 px-4 rounded mb-4 border border-gray-300 hover:bg-gray-100"
              onClick={handleGoogleLogin}
            >
              Login with Google
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
export default SignIn;
