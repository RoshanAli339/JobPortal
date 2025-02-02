import React from 'react'
import Navbar from '@/components/shared/Navbar.jsx'
import { toast } from 'sonner'
import { Label } from '@/components/ui/label.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.currentTarget)
            const res = await axios.post(
                `${import.meta.env.VITE_USER_API}/login`,
                Object.fromEntries(formData),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            )

            console.log(res)

            if (res.status === 200) {
                toast.success(res.data.message)
                navigate('/')
            } else if (res.status / 100 === 4) {
                toast.error(res.data.message)
                navigate('/login')
            }
        } catch (e) {
            console.log(e)
            toast.error(e.response.data.message)
            navigate('/login')
        }
    }

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form
                    onSubmit={handleLogin}
                    className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
                >
                    <h1 className="font-bold text-xl mb-5">Login</h1>
                    <div className="my-2">
                        <Label>Email</Label>
                        <Input name="email" type="email" required />
                    </div>
                    <div>
                        <Label>Password</Label>
                        <Input name="password" type="password" required />
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
                    </div>
                    <Button type="submit" className="w-full my-4">
                        Login
                    </Button>
                    <span className="text-sm">
                        Don&apos;t have an account?{' '}
                        <Link className="text-blue-600" to="/login">
                            Signup
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Login
