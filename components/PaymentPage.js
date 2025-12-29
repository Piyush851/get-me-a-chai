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

            <div className="cover relative w-full h-[35vh] md:h-[50vh]">
                {currentUser?.coverpic && (
                    <Image
                        src={currentUser.coverpic}
                        alt="Cover"
                        fill
                        className="object-cover w-full h-full"
                    />
                )}

                {currentUser?.profilepic && (
                    <div className="absolute -bottom-14 md:-bottom-16  left-1/2 -translate-x-1/2 border-2 border-white rounded-full">
                        <Image
                            src={currentUser.profilepic}
                            alt="User"
                            width={100}
                            height={100}
                            className="rounded-full object-cover"
                        />
                    </div>
                )}
            </div>


            <div className="info mt-14 md:mt-20 text-center my-4 px-4">
                <h1 className="text-2xl font-bold">@{username}</h1>
                <p className="text-slate-400">
                    {payments.length} payments · ₹
                    {payments.reduce((a, b) => a + b.amount, 0)} raised
                </p>
            </div>
            <div className="payment flex flex-col md:flex-row w-full gap-5 md:w-[80%] mx-auto mt-10 px-4 pb-10">
                <div className="supporters w-full md:w-1/2 bg-slate-800 rounded-xl p-4">
                    <h2 className="my-3 text-center font-bold text-xl">Top 10 supporters</h2> {/* Supporters leaderboard */}
                    <ul className="text-base mx-5 md:text-lg space-y-3">
                        {payments.length === 0 && <li className="text-center text-sm text-gray-400">No payments yet. Be the first one!</li>}
                        {payments.map((p, i) => (
                            <li key={i} className="flex gap-2 items-center my-2 p-2 bg-slate-700/30 rounded-lg">
                                <img width={30} src="/avatar.gif" alt="avatar" />
                                <span className="text-sm md:text-base">
                                    {p.name} donated <span className="font-bold text-green-400">₹{p.amount}</span> with a message: &quot;{p.message}&quot;
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="makePayment w-full md:w-1/2 bg-slate-800 rounded-xl p-6">
                    <h2 className="text-2xl font-bold mb-5">Make a Payment</h2>
                    <div className="flex gap-4 flex-col"> <div>
                        <input onChange={handleChange} value={paymentform.name} name='name' type="text" className="w-full p-3 rounded-lg bg-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter Name" />
                    </div>
                        <input onChange={handleChange} value={paymentform.message} name='message' type="text" className="w-full p-3 rounded-lg bg-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter Message" />
                        <input onChange={handleChange} value={paymentform.amount} type="text" name="amount" className="w-full p-3 rounded-lg bg-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder='Enter Amount' />
                        <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-xl text-sm px-4 py-2.5 text-center leading-5 cursor-pointer" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length < 1}>Pay</button>
                    </div>
                    <div className="flex gap-2 mt-5 justify-start ml-2 mb-2">
                        <button className="bg-slate-700 p-3 rounded-lg cursor-pointer transition-colors flex-1" onClick={()=>pay(1000)}>Pay ₹10</button>
                        <button className="bg-slate-700 p-3 rounded-lg cursor-pointer transition-colors flex-1" onClick={()=>pay(2000)}>Pay ₹20</button>
                        <button className="bg-slate-700 p-3 rounded-lg cursor-pointer transition-colors flex-1" onClick={()=>pay(3000)}>Pay ₹30</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
