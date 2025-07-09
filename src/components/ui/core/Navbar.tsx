"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, UserRound } from "lucide-react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ModalUser from "./ModalUser";
import { Button } from "../button";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import { login, logout } from "@/lib/redux/features/userSlice";
import { apiCall } from "@/helper/apiCall";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openModalUser, setOpenModalUser] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isLogin = useAppSelector((state) => state.accountReducer.isLogin);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const inDashboard = pathname.startsWith("/stories/dashboard");
  const inArticle = pathname.startsWith("/article");

  const menuNav = [
    { href: "/about", label: "About Us" },
    { href: "/facilities", label: "Facilities" },
    { href: "/stories", label: "Stories" },
    { href: "/teams", label: "Teams" },
    { href: "/contact", label: "Contact" },
  ];

  const checkLogin = async () => {
    const tkn = localStorage.getItem("tkn") || sessionStorage.getItem("tkn");
    if (tkn) {
      try {
        const res = await apiCall.get("/accounts", {
          params: { where: `objectId = '${tkn}'` },
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
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* === DESKTOP NAVBAR === */}
      <nav
        className={`hidden md:flex fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || inDashboard || inArticle
          ? "bg-stone-300 shadow-md"
          : "bg-transparent backdrop-blur-xs"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center w-full">
          <Link href="/">
            <Image src="/logo_hotel.png" alt="logo" width={60} height={60} />
          </Link>

          <ul className="flex space-x-6 items-center">
            {menuNav.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  className={`group relative font-medium transition-all duration-300 ease-in-out ${isScrolled || inDashboard || inArticle
                    ? "text-stone-800 hover:text-stone-900"
                    : "text-stone-100 hover:text-stone-200"
                    } hover:scale-105`}
                >
                  <span className="relative z-10 group-hover:tracking-wide transition-all duration-300">
                    {item.label}
                  </span>
                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-current group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center space-x-4 relative">
            <div className="w-0.5 h-8 bg-stone-600" />
            {isLogin ? (
              <div className="relative">
                <UserRound
                  className={`${isScrolled || inDashboard || inArticle ? "text-stone-600 hover:text-stone-700" : "text-stone-100 hover:text-stone-200"
                    } cursor-pointer`}
                  onClick={() => setOpenModalUser((prev) => !prev)}
                />
                {openModalUser && (
                  <div className="absolute -right-15 -top-15 z-50">
                    <ModalUser openModalUser={setOpenModalUser} />
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className={`border ${isScrolled
                    ? "border-stone-500 hover:bg-stone-500 text-stone-950"
                    : "border-stone-200 hover:bg-stone-200 text-stone-100"
                    } rounded-none`}
                  onClick={() => setOpenSignIn(true)}
                >
                  Sign In
                </Button>
                <Button
                  variant="ghost"
                  className="border border-stone-500 bg-stone-500 rounded-none hover:bg-stone-600 text-white"
                  onClick={() => setOpenSignUp(true)}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* navbar mobile*/}
      <div
        className={`md:hidden fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-stone-300 shadow-md" : "bg-transparent backdrop-blur-xs"}`}
      >

        <div className="flex justify-between items-center px-4 py-3">
          <Link href="/">
            <Image src="/logo_hotel.png" alt="logo" width={50} height={50} />
          </Link>
          <button onClick={() => setDrawerOpen(true)}>
            <Menu className="text-stone-800" size={28} />
          </button>
        </div>
      </div>

      {/* drawewr mobile */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-[80%] bg-stone-100 z-[60] shadow-lg transition-transform duration-300 transform ${drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-stone-300">
          <h2 className="text-lg font-semibold text-stone-800">Menu</h2>
          <button onClick={() => setDrawerOpen(false)}>
            <X size={24} className="text-stone-800" />
          </button>
        </div>

        <ul className="flex flex-col px-4 py-6 space-y-4">
          {menuNav.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="block text-stone-700 text-base font-medium hover:underline"
                onClick={() => setDrawerOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="px-4 mt-6 space-y-3">
          {isLogin ? (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  router.push("/stories/dashboard");
                  setDrawerOpen(false);
                }}
                className="w-full rounded-none text-stone-800 border-stone-400 hover:bg-stone-200"
              >
                Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  dispatch(logout());
                  localStorage.removeItem("tkn");
                  sessionStorage.removeItem("tkn");
                  setDrawerOpen(false);
                }}
                className="w-full rounded-none text-stone-800 border-stone-400 hover:bg-stone-200"
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                className="w-full border border-stone-400 text-stone-800 rounded-none hover:bg-stone-200"
                onClick={() => {
                  setOpenSignIn(true);
                  setDrawerOpen(false);
                }}
              >
                Sign In
              </Button>
              <Button
                variant="default"
                className="w-full bg-stone-600 text-white rounded-none hover:bg-stone-700"
                onClick={() => {
                  setOpenSignUp(true);
                  setDrawerOpen(false);
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>

     
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setDrawerOpen(false)}
        />
      )}


      {openSignIn && (
        <SignIn openSignIn={setOpenSignIn} openSignUp={setOpenSignUp} />
      )}
      {openSignUp && (
        <SignUp openSignUp={setOpenSignUp} openSignIn={setOpenSignIn} />
      )}
    </>
  );
}
