import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import DocumentInput from './document-input';
import MenuBar from  './menubar';
import {OrganizationSwitcher, UserButton} from '@clerk/nextjs';

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between'>
       <div className="flex gap-2 items-center">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={40} height={40} />
        </Link>
        <div className="flex flex-col">
            <DocumentInput/>
            <div className="flex">
                <MenuBar/>
            </div>
        </div>
       </div>
       <div className="flex gap-3 items-end pl-6">
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
}

export default Navbar;