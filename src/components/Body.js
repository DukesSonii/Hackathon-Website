import React, { useEffect } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/Frebase";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import ClassDetail from "./ClassDetail";
const Body = () => {
  const dispatch = useDispatch();

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Dashboard />,
    },
    {
      path: "/class/:id",
      element: <ClassDetail />,
    },
  ]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
          })
        );
      } else {
        dispatch(removeUser());
      }
    });

    return () => {
      //when we call unsubscribe it will remove onAuthStateChanged from the browser
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
