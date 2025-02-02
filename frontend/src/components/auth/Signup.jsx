import React, { useState } from 'react'
import Navbar from '@/components/shared/Navbar.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Button } from '@/components/ui/button.jsx'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signup() {
    const navigate = useNavigate()
    const [avatar, setAvatar] = useState(null)

    const acceptingTypes = ['image/png', 'image/jpg', 'image/jpeg']
    const handleFileChange = (e) => {
        if (
            e.target.files[0] &&
            acceptingTypes.includes(e.target.files[0].type)
        ) {
            setAvatar(e.target.files[0])
        } else toast.error('Only png, jpg, and jpeg file formats are allowed!')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.currentTarget)
            if (!avatar) {
                toast.warning('Please provide all the inputs!')
                return null
            }
            const res = await axios.post(
                `${import.meta.env.VITE_USER_API}/register`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                }
            )

            console.log(res)
            if (res.status === 200) {
                toast.success(res.data.message)
                navigate('/login')
            } else if (res.status / 100 === 4) {
                toast.error(res.data.message)
                navigate('/signup')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form
                    onSubmit={handleSubmit}
                    className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
                >
                    <h1 className="font-bold text-xl mb-5">Sign Up</h1>
                    <div className="my-2">
                        <Label>Full Name</Label>
                        <Input type="text" name="fullName" required />
                    </div>
                    <div className="my-2">
                        <Label>Email</Label>
                        <Input type="email" name="email" required />
                    </div>
                    <div className="my-2">
                        <Label>Phone Number</Label>
                        <Input type="text" name="phoneNumber" required />
                    </div>
                    <div>
                        <Label>Password</Label>
                        <Input type="password" required />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="applicant"
                                    className="cursor-pointer"
                                    required
                                />
                                <Label htmlFor="r1">Applicant</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    className="cursor-pointer"
                                    required
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Label>Profile</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                className="cursor-pointer "
                                required
                                name="avatar"
                                // onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full my-4">
                        Signup
                    </Button>
                    <span className="text-sm">
                        Account have an account?{' '}
                        <Link className="text-blue-600" to="/login">
                            Login
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Signup
