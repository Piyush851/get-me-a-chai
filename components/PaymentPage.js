"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import { fetchuser, fetchpayments, initiate } from "@/actions/useractions"
import { useSearchParams, useRouter } from "next/navigation"
import { ToastContainer, toast, Bounce } from "react-toastify"
import Image from "next/image"

const PaymentPage = ({ username }) => {
    const [paymentform, setPaymentform] = useState({
        name: "",
        message: "",
        amount: "",
    })
    const [currentUser, setCurrentUser] = useState({})
    const [payments, setPayments] = useState([])

    const searchParams = useSearchParams()
    const router = useRouter()

    // Fetch user + payments
    useEffect(() => {
        if (!username) return

        const getData = async () => {
            const u = await fetchuser(username)
            const dbpayments = await fetchpayments(username)

            setCurrentUser(u)
            setPayments(dbpayments)
        }

        getData()
    }, [username])

    // Toast after payment
    useEffect(() => {
        if (searchParams.get("paymentdone") === "true") {
            toast("Thanks for your donation!", {
                position: "top-right",
                autoClose: 5000,
                transition: Bounce,
            })

            router.replace(`/${username}`)
        }
    }, [searchParams, router, username])

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const pay = async (amount) => {
        const order = await initiate(amount, username, paymentform)
        let orderId = order.id;
        if (!window.Razorpay) return

        const rzp = new window.Razorpay({
            key: currentUser.razorpayid,
            amount,
            currency: "INR",
            name: "Get Me a Chai",
            description: "Support Creator",
            order_id: order.id,
            callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            theme: { color: "#3399cc" },
        })

        rzp.open()
    }

    return (
        <>
            <ToastContainer />
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            <div className="cover relative w-full h-[50vh]">
                {currentUser?.coverpic && (
                    <Image
                        src={currentUser.coverpic}
                        alt="Cover"
                        fill
                        className="object-cover"
                    />
                )}

                {currentUser?.profilepic && (
                    <div className="absolute top-80 left-1/2 -translate-x-1/2 border-2 border-white rounded-full">
                        <Image
                            src={currentUser.profilepic}
                            alt="User"
                            width={100}
                            height={100}
                            className="rounded-full"
                        />
                    </div>
                )}
            </div>


            <div className="info mt-14 text-center">
                <h1 className="text-2xl font-bold">@{username}</h1>
                <p className="text-slate-400">
                    {payments.length} payments · ₹
                    {payments.reduce((a, b) => a + b.amount, 0)} raised
                </p>
            </div>
            <div className="payment flex gap-5 w-[80%] mx-auto mt-10">
                <div className="supporters w-1/2 bg-slate-800 rounded-xl">
                    <h2 className="my-5 text-center font-bold text-xl jus">Top 10 supporters</h2> {/* Supporters leaderboard */}
                    <ul className="mx-5 text-lg">
                        {payments.map((p, i) => {
                            return <li key={i} className="my-2 flex gap-2 justify-center items-center">
                                <img width={33} src="/avatar.gif" alt="avatar" />
                                <span>{p.name} donated <spam className="font-bold">₹{p.amount}</spam>with a message &quot;{p.message}&quot; </span>
                            </li>
                        })}
                    </ul>
                </div>
                <div className="makePayment w-1/2 bg-slate-800 rounded-xl">
                    <h2 className="text-2xl ml-3 font-bold my-5">Make a Payment</h2>
                    <div className="flex gap-2 m-2 flex-col"> <div>
                        <input onChange={handleChange} value={paymentform.name} name='name' type="text" className="w-full p-3 rounded-lg bg-slate-700" placeholder="Enter Name" />
                    </div>
                        <input onChange={handleChange} value={paymentform.message} name='message' type="text" className="w-full p-3 rounded-lg bg-slate-700" placeholder="Enter Message" />
                        <input onChange={handleChange} value={paymentform.amount} type="text" name="amount" className="w-full p-3 rounded-lg bg-slate-700" placeholder='Enter Amount' />
                        <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-xl text-sm px-4 py-2.5 text-center leading-5 cursor-pointer" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length < 1}>Pay</button>
                    </div>
                    <div className="flex gap-2 mt-5 justify-start ml-2 mb-2">
                        <button className="bg-slate-700 p-3 rounded-lg cursor-pointer" onClick={()=>pay(1000)}>Pay ₹10</button>
                        <button className="bg-slate-700 p-3 rounded-lg cursor-pointer" onClick={()=>pay(2000)}>Pay ₹20</button>
                        <button className="bg-slate-700 p-3 rounded-lg cursor-pointer" onClick={()=>pay(3000)}>Pay ₹30</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
// 3:53:33