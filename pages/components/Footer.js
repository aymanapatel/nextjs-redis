export const Footer = () => {
    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <p className="flex items-center my-8 w-full justify-center sm:justify-start">
                    Powered by
                    <img
                        src="/vercel.svg"
                        alt="Vercel Logo"
                        className="h-5 mx-2"
                    />
                    and
                    <img
                        src="/upstash.svg"
                        alt="Upstash Logo"
                        className="h-5 mx-2"
                    />
                </p>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex rounded focus:outline-none focus:ring focus:ring-blue-300 mb-4 sm:mb-0 min-w-max"
                    href="https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-redis&project-name=redis-roadmap&repository-name=redis-roadmap&demo-title=Redis%20Roadmap&demo-description=Create%20and%20upvote%20features%20for%20your%20product.&demo-url=https%3A%2F%2Froadmap-redis.vercel.app%2F&integration-ids=oac_V3R1GIpkoJorr6fqyiwdhl17"
                >
                    <img
                        src="https://vercel.com/button"
                        alt="Vercel Deploy Button"
                    />
                </a>
            </div>
        </>
    )
}
