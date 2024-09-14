import React, { useState, useEffect } from "react";
import { auth } from "../utils/Frebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { Class } from "../utils/constants";
import { MenuOutlined } from "@ant-design/icons"; // Ant Design icon

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user); // Accessing the user globally across the component
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/home");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch, navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        navigate("/");
      })
      .catch(() => {
        navigate("/error");
      });
  };

  return (
    <div className="bg-gray-800 fixed top-0 left-0 w-full z-50 shadow-md">
      {user && (
        <>
          <div className="flex items-center px-4 py-3">
            {/* Hamburger Menu and Logo next to each other */}
            <div className="flex items-center">
              <MenuOutlined
                className="text-2xl text-white cursor-pointer mr-3"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />

              <img
                className="w-12 h-12 cursor-pointer"
                src={Class}
                alt="logo"
                onClick={() => navigate("/")}
              />
            </div>

            <div className="ml-auto hidden md:flex items-center">
              {user && user.email && (
                <>
                  <span className="mr-4 text-white">
                    Hello, {user.displayName || "User"}
                  </span>
                  <button
                    className="text-sm md:text-md font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition duration-300"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
