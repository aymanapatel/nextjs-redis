import { useState, useRef } from 'react'
import toast from 'react-hot-toast'
import { LoadingSpinner } from '../lib/loadingSpinner'

export const Subscription = () => {
    const subscribeInputRef = useRef(null)
    const [isEmailLoading, setEmailLoading] = useState(false)

    const subscribe = async (e) => {
        e.preventDefault()
        setEmailLoading(true)

        const res = await fetch('/api/subscribe', {
            body: JSON.stringify({
                email: subscribeInputRef.current.value,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        })

        const { error } = await res.json()
        setEmailLoading(false)

        if (error) {
            return toast.error(error)
        }

        toast.success('You are now subscribed to feature updates!')
        subscribeInputRef.current.value = ''
    }

    return (
        <div className="relative my-8">
            <p className="flex text-gray-500">
                Leave your email address here to be notified when feature
                requests are released.
            </p>

            <form className="relative my-4" onSubmit={subscribe}>
                <input
                    ref={subscribeInputRef}
                    aria-label="Email for updates"
                    placeholder="jane@doe.com"
                    type="email"
                    autoComplete="email"
                    maxLength={60}
                    required
                    className="px-3 py-3 mt-1 text-lg block w-full border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
                />
                <button
                    className="flex items-center justify-center absolute right-2 top-2 px-4 h-10 border border-gray-200 text-gray-900 rounded-md w-24 focus:outline-none focus:ring focus:ring-blue-300 focus:bg-gray-100"
                    type="submit"
                >
                    {isEmailLoading ? <LoadingSpinner /> : 'Subscribe'}
                </button>
            </form>
        </div>
    )
}
