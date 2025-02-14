// Setting toggle mode
 
import { RxMoon } from "react-icons/rx";
import { BiSun } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import React, { useState } from "react";

const ModeToogle: React.FC = () => {
    const { setTheme } = useTheme()
    const [isLight, setLight] = useState<boolean>(true)

    const changeTheme = () => {
        setTheme(isLight ? "dark" : "light");
        setLight((prev) => !prev);
    };

    return (
        <Button
            variant='outline'
            size="icon"
            onClick={changeTheme}
            className='bg-transparent group  border border-foreground/60 shadow-none h-auto w-auto p-2  rounded-full duration-200 text-foreground hover:text-foreground hover:bg-foreground/5 text-2xl'
        >
            {
                isLight ?
                    <BiSun className="group-hover:-rotate-[25deg] duration-500" />
                    :
                    <RxMoon className="group-hover:-rotate-[25deg] duration-500" />
            }
        </Button>
    )
}

export default ModeToogle
