import useSWR, { mutate } from 'swr'
import clsx from 'clsx'

const fetcher = (url) => fetch(url).then((res) => res.json())

function Item({ isFirst, isLast, isReleased, hasVoted, feature }) {
    const upvote = async (e) => {
        e.preventDefault()

        const res = await fetch('/api/vote', {
            body: JSON.stringify({
                id: feature.id,
                title: feature.title,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        })

        const { error } = await res.json()
        if (error) {
            return toast.error(error)
        }

        mutate('/api/features')
    }

    return (
        <div
            className={clsx(
                'p-6 mx-8 flex items-center border-t border-l border-r',
                isFirst && 'rounded-t-md',
                isLast && 'border-b rounded-b-md'
            )}
        >
            <button
                className={clsx(
                    'ring-1 ring-gray-200 rounded-full w-8 min-w-[2rem] h-8 mr-4 focus:outline-none focus:ring focus:ring-blue-300',
                    (isReleased || hasVoted) &&
                        'bg-green-100 cursor-not-allowed ring-green-300'
                )}
                disabled={isReleased || hasVoted}
                onClick={upvote}
            >
                {isReleased ? '✅' : '👍'}
            </button>
            <h3 className="text font-semibold w-full text-left">
                {feature.title}
            </h3>
            <div className="bg-gray-200 text-gray-700 text-sm rounded-xl px-2 ml-2">
                {feature.score}
            </div>
            <div className="bg-gray-200 text-gray-700 text-sm rounded-xl px-2 ml-2">
                {feature.score}
            </div>
        </div>
    )
}
export const Hero = ({ features, ip }) => {
    console.log(`Features ${features.ip}`)
    const { data, error } = useSWR('/api/features', fetcher, {
        initialData: { features },
    })

    if (error) {
        toast.error(error)
    }

    return (
        <div className="w-full mb-8">
            {data.features.map((feature, index) => (
                <Item
                    key={index}
                    isFirst={index === 0}
                    isLast={index === data.features.length - 1}
                    isReleased={false}
                    hasVoted={feature.ip === ip}
                    feature={feature}
                />
            ))}
        </div>
    )
}
