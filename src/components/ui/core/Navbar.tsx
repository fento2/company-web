"use client";
import Link from "next/link";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useState } from "react";
import { UserRound } from "lucide-react";
import { Button } from "../button";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import ModalUser from "./ModalUser";
import { login } from "@/lib/redux/features/userSlice";
import { useEffect } from "react";
import { apiCall } from "@/helper/apiCall";



function Navbar() {

  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const isLogin = useAppSelector((state) => state.accountReducer.isLogin);
  const [openModalUser, setOpenModalUser] = useState(false);
  const dispatch = useAppDispatch();

  const menuNav = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/facilities", label: "Facilities" },
    { href: "/blog", label: "Blog List" },
    { href: "/teams", label: "Teams" },
  ];




  const checkLogin = async () => {

    const tkn = localStorage.getItem("tkn") || sessionStorage.getItem("tkn");

    if (tkn) {

      try {
        const res = await apiCall.get("/accounts", {
          params: {
            where: `objectId = '${tkn}'`,
          },
        });

        const user = res.data[0];

        dispatch(
          login({
            objectId: user.objectId ?? "",
            username: user.username ?? "",
            firstName: user.firstName ?? "",
            lastName: user.lastName ?? "",
            isLogin: true,
          })
        );

      } catch (error) {
        console.error(error);
      }


    } else {
      return;
    }
  };

 
  useEffect(() => {

    checkLogin();

  }, []);



  return (
    <nav className="bg-stone-300 shadow-md sticky top-0 left-0 w-full z-50">
      <div className="mx-4 px-4 py-2 flex justify-between items-center">
        <img src="/images/logo_hotel.png" className="w-20 h-20 mx-8" />
        <div className="flex items-center gap-4">
          <ul className="md:flex space-x-6">
            {menuNav.map((value, index) => (
              <li key={index}>
                <Link
                  href={value.href}
                  className="text-neutral-800 font-medium transition"
                >
                  {value.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="w-0.5 h-8 bg-stone-600" />
          <div className="space-x-4">


            {isLogin ? (

              <UserRound className="text-stone-500 hover:text-stone-600"
                onClick={() => setOpenModalUser(!openModalUser)} />

            ) : (
              <>
                <Button variant="ghost" className="border border-stone-500
            rounded-none hover:bg-stone-500"
                  onClick={() => setOpenSignIn(true)}>Sign In</Button>

                <Button variant="ghost" className="border border-stone-500
            rounded-none bg-stone-500 hover:bg-stone-600"
                  onClick={() => setOpenSignUp(true)}>Sign Up</Button>
              </>)
            }
          </div>
        </div>
      </div>

      {/* signin dan sign up */}
      {openSignIn && <SignIn openSignIn={setOpenSignIn} openSignUp={setOpenSignUp} />}
      {openSignUp && <SignUp openSignUp={setOpenSignUp} openSignIn={setOpenSignIn} />}
      {/* modaluser */}
      {openModalUser && <ModalUser openModalUser={setOpenModalUser} />}

    </nav>
  );
}

export default Navbar;
