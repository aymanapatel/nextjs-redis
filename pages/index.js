import Head from 'next/head'
import clsx from 'clsx'
import useSWR, { mutate } from 'swr'
import toast from 'react-hot-toast'
import redis from '../lib/redis'

import { Subscription } from './components/Subscription'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { InsertBar } from './components/InsertBar'
import { Hero } from './components/Hero'

export default function Roadmap({ features, ip }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Head>
                <title>Voting – Next.js and Redis Example</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-20 text-center">
                <Header />

                <div className="flex flex-wrap items-center justify-around max-w-4xl my-8 sm:w-full bg-white rounded-md shadow-xl h-full border border-gray-100">
                    <InsertBar />

                    <Hero features={features} ip={ip} />
                </div>
                <hr className="border-1 border-gray-200 my-8 mx-8 w-full" />

                <div className="flex flex-wrap items-center justify-around max-w-4xl my-8 sm:w-full bg-green-200 rounded-md shadow-xl h-full border border-gray-100">
                    <div className="mx-8 w-full ">
                        <Subscription />
                        <Footer />
                    </div>
                </div>
            </main>
        </div>
    )
}

export async function getServerSideProps({ req }) {
    const ip =
        req.headers['x-forwarded-for'] || req.headers['Remote_Addr'] || 'NA'
    const features = (await redis.hvals('features'))
        .map((entry) => JSON.parse(entry))
        .sort((a, b) => {
            // Primary sort is score
            if (a.score > b.score) return -1
            if (a.score < b.score) return 1

            // Secondary sort is title
            if (a.title > b.title) return 1
            if (a.title < b.title) return -1

            return 1
        })

    return { props: { features, ip } }
}
