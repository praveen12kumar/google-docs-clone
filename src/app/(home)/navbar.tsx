import Link from "next/link";
import Image from "next/image";
import SearchInput from "./search-input";
import {UserButton, OrganizationSwitcher} from '@clerk/clerk-react';
const Navbar = ()=>{

return(
    <nav className="flex items-center justify-between h-full w-full">
        <div className="flex items-center shrink-0 pr-6">
            <Link href="/">
                <Image src="/logo.svg" width={40} height={40} alt="" />
            </Link>
            <h3 className="text-xl ml-1">Docs</h3>
        </div>
        <SearchInput/>
        <div className="flex gap-3 items-center pl-6">
            <OrganizationSwitcher 
            afterLeaveOrganizationUrl="/"
            afterCreateOrganizationUrl="/"
            afterSelectOrganizationUrl="/"
            afterSelectPersonalUrl="/"
            />
             <UserButton/>
        </div>
       
    </nav>
)

};

export default Navbar;