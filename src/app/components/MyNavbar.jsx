import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button} from "@nextui-org/react";
import Link from "next/link"
import { getCookie } from "@/utils/cookies";

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
          <Link href="/login">
            <Button color="danger" variant="ghost">Logout</Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    )
}

export default MyNavbar