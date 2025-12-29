import PaymentPage from "@/components/PaymentPage"
import { notFound } from "next/navigation"
import connectDb from "@/db/connectDb"
import User from "@/models/User"

export default async function UsernamePage({ params }) {
    const { username } = await params

    await connectDb()
    const user = await User.findOne({ username })

    if (!user) {
        notFound()
    }

    // Pass plain data only
    return <PaymentPage username={username} />
}

export async function generateMetadata({ params }) {
    const { username } = await params

    return {
        title: `Support ${username} - Get Me a Chai`,
    }
}
