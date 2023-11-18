"use client";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiAlienBug } from "react-icons/gi";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3 text-xl">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <GiAlienBug />
            </Link>
            <NavLinks/>
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === 'loading') return null;
  if (status === 'unauthenticated') 
  return <Link href="/api/auth/signin">Log in</Link>
  return (
    <Box>
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session.user!.image!}
              fallback="?"
              className="cursor-pointer"
              radius="full"
              size="2"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <Text size="2">
              <DropdownMenu.Label>{session.user!.email}</DropdownMenu.Label>
            </Text>
            <DropdownMenu.Item>
              <Link href="/api/auth/signout" className="text-zinc-500 hover:text-zinc-800 transition-colors">Log out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};

const NavLinks = () => {
  const links = [
    { lable: "Dashboard", href: "/" },
    { lable: "Issues", href: "/issues/list" },
  ];
  const currentPath = usePathname();
  return (
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
  );
};

export default NavBar;
