export const Header = () => {
    return (
        <>
            <div className="flex justify-center items-center bg-black rounded-full w-16 sm:w-24 h-16 sm:h-24 my-8">
                <img src="/mask.jpg" alt="Mask Logo" className="h-8 sm:h-16" />
            </div>
            <h1 className="text-lg sm:text-2xl font-bold mb-2">Voting app</h1>
            <h2 className="text-md sm:text-xl mx-4">
                Create or vote up features you want to see in the next release.
            </h2>
        </>
    )
}
