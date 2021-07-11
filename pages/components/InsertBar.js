import { useState, useRef } from 'react'
import { LoadingSpinner } from '../../lib/loadingSpinner'
import { mutate } from 'swr'

export const InsertBar = () => {
    const [isCreateLoading, setCreateLoading] = useState(false)

    const featureInputRef = useRef(null)

    const addFeature = async (e) => {
        e.preventDefault()
        setCreateLoading(true)

        const res = await fetch('/api/create', {
            body: JSON.stringify({
                title: featureInputRef.current.value,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        })

        const { error } = await res.json()
        setCreateLoading(false)

        if (error) {
            toast.error(error)
            return
        }

        mutate('/api/features')
        featureInputRef.current.value = ''
    }

    return (
        <div className="mx-8 w-full">
            <form className="relative my-8" onSubmit={addFeature}>
                <input
                    ref={featureInputRef}
                    aria-label="Suggest a feature for our roadmap"
                    placeholder="I wants..."
                    type="text"
                    maxLength={150}
                    required
                    className="pl-3 pr-28 py-3 mt-1 text-lg block w-full border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
                />
                <button
                    className="flex items-center justify-center absolute right-2 top-2 px-4 h-10 text-lg border bg-black text-white rounded-md w-24 focus:outline-none focus:ring focus:ring-blue-300 focus:bg-gray-800"
                    type="submit"
                >
                    {isCreateLoading ? <LoadingSpinner invert /> : 'Request'}
                </button>
            </form>
        </div>
    )
}
