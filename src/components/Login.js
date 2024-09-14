import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkvalidator } from "../utils/UseValidatorService";

import { useDispatch } from "react-redux";
import { auth } from "../utils/Frebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router";
import { addUser } from "../utils/userSlice";

import { BG_URL, USER_AVATAR } from "../utils/constants";
import { Spin } from "antd";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [IsSignin, setIsSignin] = useState(true);
  const [errormessage, seterrormessage] = useState(null);
  const [loading, setloading] = useState(false);
  const email = useRef(null);
  const password = useRef(null);
  const phone = useRef(null);
  const name = useRef(null);

  const toggleSignInForm = () => {
    setIsSignin(!IsSignin);
  };

  const handelbuttonClick = (e) => {
    e.preventDefault(); // Prevent default form behavior

    let message = checkvalidator({
      email: email.current.value,
      password: password.current.value,
      name: !IsSignin ? name.current.value : "",
      isSignin: IsSignin,
    });

    seterrormessage(message);

    if (message) return;

    setloading(true);
    if (!IsSignin) {
      // Sign-up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User created:", user); // Add logging to ensure user creation
          navigate("/home");

          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              seterrormessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrormessage(`${errorCode} - ${errorMessage}`);
        })
        .finally(() => setloading(false));
    } else {
      // Sign-in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User signed in:", user);
          navigate("/home");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrormessage(`${errorCode} - ${errorMessage}`);
        })
        .finally(() => setloading(false));
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute inset-0">
        <img src={BG_URL} alt="logo" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 flex justify-center items-center">
        <form
          className="w-full md:w-8/12 lg:w-6/12 xl:w-4/12 p-4 md:p-12 bg-black text-white bg-opacity-75 rounded-lg"
          onSubmit={handelbuttonClick}
        >
          <h1 className="font-bold text-2xl sm:text-3xl py-2 sm:py-4">
            {IsSignin ? "Sign In" : "Sign Up"}
          </h1>
          {!IsSignin && (
            <input
              ref={name}
              type="text"
              placeholder="Enter Name"
              className="p-2 sm:p-4 my-2 sm:my-4 w-full bg-gray-800 rounded-lg"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email Id"
            className="p-2 sm:p-4 my-2 sm:my-4 w-full bg-gray-800 rounded-lg"
          />
          {!IsSignin && (
            <input
              ref={phone}
              type="text"
              placeholder="Phone Number"
              className="p-2 sm:p-4 my-2 sm:my-4 w-full bg-gray-800 rounded-lg"
            />
          )}
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-2 sm:p-4 my-2 sm:my-4 w-full bg-gray-800 rounded-lg"
          />
          <button
            className="p-2 sm:p-4 my-2 sm:my-4 bg-red-700 w-full rounded-lg"
            type="submit"
          >
            {IsSignin ? "Sign In" : "Sign Up"}
          </button>
          <p className="py-2 sm:py-4 cursor-pointer" onClick={toggleSignInForm}>
            {IsSignin
              ? "New To Classroom? Sign Up Now"
              : "Already registered user? Sign in now"}
          </p>
          {errormessage && <p className="text-red-500">{errormessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
