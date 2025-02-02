import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '@/components/Home.jsx'
import Login from '@/components/auth/Login.jsx'
import Signup from '@/components/auth/Signup.jsx'
import Notification from '@/components/shared/Notification.jsx'
import { Toaster } from '@/components/ui/sonner.jsx'

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
])

function App() {
    return (
        <>
            <RouterProvider router={appRouter} />
            <Toaster />
        </>
    )
}

export default App
