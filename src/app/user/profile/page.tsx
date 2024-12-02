'use client'
import { useAuthContext } from "@/app/auth/auth-context"




export default function ProfilePage() {

    const { isAuthenticated, user } = useAuthContext()

    if (!isAuthenticated || !user) {
        return (
            <div>
                <h1>Not Authorized</h1>
                <p>You must be logged in to view this page</p>
            </div>
        )
    }


    return (
        <div>
            <h1>Profile Page</h1>

            {user && <p>{user.email}</p>}
        </div>
    )
}