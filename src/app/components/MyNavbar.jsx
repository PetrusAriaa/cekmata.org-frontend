'use client'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button} from "@nextui-org/react";
import Link from "next/link"

const handleLogout = async () => {
  await fetch('/api/auth/logout')
  window.location.reload()
}

const MyNavbar = () => {
  return(
    <Navbar shouldHideOnScroll className="bg-neutral-50/50 backdrop-blur-sm">
      <NavbarBrand>
        <p className="font-bold text-inherit">cekmata.org</p>
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem>
          <Link href="#">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button onClick={handleLogout} color="danger" variant="ghost">Logout</Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    )
}

export default MyNavbar