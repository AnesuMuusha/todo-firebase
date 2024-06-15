import React, { useEffect, useState } from "react";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import TodoAppFirebaseHome from "./TodoAppFirebaseHome";
// import TodoHome from "./TodoHome";
// import TodoFirebaseHome from "./TodoFibaseHome";

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
  }, []);

  return (
    <div>
      {value ? (
        <TodoAppFirebaseHome />
        // <TodoFirebaseHome />
        // <TodoHome />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
          <h3 className="font-bold text-orange-400 py-2 px-4 text-2xl sm:text-3xl">Todo-App</h3>
          <p className="font-bold text-orange-400 py-2 px-4 text-lg sm:text-xl">Sign in</p>
          <div className="flex flex-col items-center space-y-4">
            <button
              className="w-full max-w-xs bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4 hover:bg-blue-700"
              onClick={handleFacebookLogin}
            >
              Login with Facebook
            </button>
            <button
              className="w-full max-w-xs bg-white text-gray-700 py-2 px-4 rounded mb-4 border border-gray-300 hover:bg-gray-100"
              onClick={handleGoogleLogin}
            >
              Login with Google
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default SignIn;
