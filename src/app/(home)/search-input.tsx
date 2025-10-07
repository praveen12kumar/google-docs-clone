'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRef} from "react";
import {useQueryState} from 'nuqs';
import { useSearchParam } from "@/hooks/user-search-param";

const SearchInput = ()=>{
    
    const [value, setValue] = useSearchParam();

    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(value);
        setValue("");
        inputRef.current?.blur();
    };

    return(
    <div className="flex-1 flex items-center justify-center">
        <form className="relative max-w-[720px] w-full" onSubmit={handleSubmit}>
            <Input 
            onChange={handleChange}
            ref={inputRef}
            value={value}
            type="search"
            placeholder="Search..."
            className="w-full h-[48px] md:text-base text-sm placeholder:text-neutral-800 px-14 border-none focus-visible:ring-0 focus:bg-white  focus-visible:shadow-sm bg-[#F0F4F8] rounded-full"
            />
            <Button type="submit" variant="ghost" size="icon" 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 [&_svg]:size-5 rounded-full">
                <SearchIcon/>
            </Button>
            
        </form>
    </div>
    )
};


export default SearchInput