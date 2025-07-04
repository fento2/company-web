"use client";
import Link from "next/link";

function Navbar() {

  const menuNav = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/facilities", label: "Facilities" },
    { href: "/blog", label: "Blog List" },
    { href: "/teams", label: "Teams" },
  ];

  return (
    <nav className="bg-stone-300 shadow-md sticky top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <img src="/images/logo_hotel.png" className="w-20 h-20" />
        <ul className="flex space-x-6">
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
      </div>
    </nav>
  );
}

export default Navbar;
