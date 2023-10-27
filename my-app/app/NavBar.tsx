"use client";
import Link from "next/link";
import { GiAlienBug } from "react-icons/gi";
import classNames from "classnames";
import { usePathname } from "next/navigation";


const NavBar = () => {
  const links = [
    { lable: "Dashboard", href: "/" },
    { lable: "Issues", href: "/issues" },
  ];
  const currentPath = usePathname();
  console.log(currentPath)
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center text-xl">
      <Link href="/">
        <GiAlienBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li
            key={link.href}
            // className="text-zinc-500 hover:text-zinc-800 transition-colors"
           className={ classNames({"text-zinc-900": link.href === currentPath, "text-zinc-500": link.href !== currentPath, "hover:text-zinc-800 transition-colors": true})}
                
          >
            <Link href={link.href}>{link.lable}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
