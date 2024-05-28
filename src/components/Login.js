import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Login(props) {
  const SignIn = () => {
    alert(" ");
   
  };

  // const auth = getAuth();
  // signInWithPopup(auth, provider)
  //   .then((result) => {
  //     // This gives you a Google Access Token. You can use it to access the Google API.
  //     const credential = GoogleAuthProvider.credentialFromResult(result);
  //     const token = credential.accessToken;
  //     // The signed-in user info.
  //     const user = result.user;
  //     // IdP data available using getAdditionalUserInfo(result)
  //     // ...
  //   }).catch((error) => {
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // The email of the user's account used.
  //     const email = error.customData.email;
  //     // The AuthCredential type that was used.
  //     const credential = GoogleAuthProvider.credentialFromError(error);
  //     // ...
  //   });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h3 className="font-bold py-2 px-4 text-2xl"> Todo-App</h3>
      <br />
      <p className="font-bold py-2 px-4">Sign in</p>
      <br />
      <p>
      <button className="w-60 bg-orange-500 text-white font-bold py-2 px-4 rounded mb-4 hover:bg-orange-600">        
      Login with Facebook
      </button>
      </p>
      <p>
        <button
          className="w-60 bg-orange-500 text-white font-bold py-2 px-4 rounded mb-4 hove:bg-orange-600"
          onClick={SignIn}
        >
          Login with Google
        </button>
      </p>
    </div>
  );
}

export default Login;
