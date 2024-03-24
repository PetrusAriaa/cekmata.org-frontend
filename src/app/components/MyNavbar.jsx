'use client'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button} from "@nextui-org/react";
import Link from "next/link"
import { useEffect, useState } from "react";

const paths = ["/", "/checkup", "/dashboard", "/details"]

const MyNavbar = () => {
  const [displayNavbar, setDisplayNavbar] = useState(false);

  useEffect(() => {
    if (paths.includes(window.location.pathname)){
      setDisplayNavbar(true);
    }
  }, [setDisplayNavbar])

  return(
    displayNavbar ?
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
          <Link href="#">
            Patient Data
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#">
            Recommendation
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#">
            Reports
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#">
            <Button color="primary">Login</Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    :
    null
  )
}

export default MyNavbar