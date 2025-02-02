import React, { useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover.jsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx'
import { Button } from '@/components/ui/button.jsx'
import { User2, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'

function Navbar() {
    const [user, setUser] = useState(false)

    return (
        <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
            <div>
                <h1 className="text-2xl font-bold">
                    Job <span className="text-[#f83002]">Portal</span>
                </h1>
            </div>
            <div>
                <ul className="flex font-medium items-center gap-5">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>Jobs</li>
                    <li>Browse</li>
                </ul>
            </div>
            {!user ? (
                <div className="flex items-center gap-2">
                    <Link to="/login">
                        <Button variant="outline">Login</Button>
                    </Link>
                    <Link to="/signup">
                        <Button className="bg-[#6a3ac2] hover:bg-[#5b30a6]">
                            Signup
                        </Button>
                    </Link>
                </div>
            ) : (
                <Popover>
                    <PopoverTrigger asChild>
                        <Avatar className="cursor-pointer ">
                            <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                            />
                        </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className="w-70">
                        <div className="flex-col gap-12 justify-between space-y-2">
                            <div className="flex gap-4 items-center">
                                <Avatar className="cursor-pointer ">
                                    <AvatarImage
                                        src={'https://github.com/shadcn.png'}
                                        alt="@shadcn"
                                    ></AvatarImage>
                                </Avatar>
                                <div className="flex-col">
                                    <h4 className="font-medium">Roshan Ali</h4>
                                    <p className="text-xs text-muted-foreground">
                                        Lorem ipsum dolor sit.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <User2></User2>
                                <Button variant="link">View Profile</Button>
                            </div>
                            <div className="flex items-center">
                                <LogOut></LogOut>
                                <Button variant="link">Logout</Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            )}
        </div>
    )
}

export default Navbar
