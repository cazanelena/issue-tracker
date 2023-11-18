"use client";
import { Box, Container, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiAlienBug } from "react-icons/gi";

const NavBar = () => {
  const { status, data: session } = useSession();

  const links = [
    { lable: "Dashboard", href: "/" },
    { lable: "Issues", href: "/issues/list" },
  ];
  const currentPath = usePathname();

  return (
    <nav className="border-b mb-5 px-5 py-3 text-xl">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <GiAlienBug />
            </Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li
                  key={link.href}
                  className={classNames({
                    "text-zinc-900": link.href === currentPath,
                    "text-zinc-500": link.href !== currentPath,
                    "hover:text-zinc-800 transition-colors": true,
                  })}
                >
                  <Link href={link.href}>{link.lable}</Link>
                </li>
              ))}
            </ul>
          </Flex>
            <Box>
              {status === "authenticated" && (
                <Link href="/api/auth/signout">Log out</Link>
              )}
              {status === "unauthenticated" && (
                <Link href="/api/auth/signin">Log in</Link>
              )}
            </Box>
        
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
