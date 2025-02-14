import React from 'react'
import { Link } from 'react-router-dom'
import pageNoteFound from '/images/not-found-image.png'
import SEO from '@/components/custom/utils/SEO'

const PageError: React.FC = () => {
	return (
		<section className='relative w-screen h-screen overflow-x-hidden py-10'>
			<SEO
				title='Page Not Found | We are sorry this page is not available'
				description='we are sorry but this page is not available at the moment.'
			/>

			<div className='container relative z-40 flex items-center justify-between flex-col md:flex-row gap-6 md:gap-10 h-full w-full'>
				<div className="max-w-full lg:max-w-[50%] flex-1 w-full h-full py-0 flex items-center justify-center flex-col gap-6 md:gap-8 lg:gap-10">
					<div className="w-fit">
						<h1 className='bg-background p-0 w-fit mx-auto text-5xl md:text-6xl lg:text-7xl text-center font-bold'>
							<span
								className="bg-clip-text text-transparent bg-gradient-to-tr from-blue-500 via-[#c850c0] font-bold to-blue-500"
							>
								404
							</span>
						</h1>
						<h2 className='bg-background p-0 w-fit text-2xl md:text-3xl lg:text-5xl text-center font-semibold'>
							Page Not Found
						</h2>
					</div>

					<p className="bg-background p-0 w-fit text-center text-base md:text-lg text-foreground/80">
						Sorry, the page you are looking for could not be found.
					</p>

					{/* Line of separation */}
					<div className="w-full border bg-foreground/80 rounded-full shadow-md "></div>

					{/* Redirection links */}
					<div className="text-sm md:text-base mx-auto flex flex-wrap items-center gap-y-1 gap-4 md:gap-6 justify-center w-full capitalize">
						<Link
							to={'/'}
							className="link-underline bg-clip-text text-transparent bg-gradient-to-tr from-blue-500 via-[#c850c0] to-blue-500 font-medium md:py-2"
						>
							<span>Back to Home</span>
						</Link>

						<Link
							to={'/products'}
							className="link-underline bg-clip-text text-transparent bg-gradient-to-tr from-[#c850c0] to-blue-500 font-medium md:py-2"
						>
							<span>view products</span>
						</Link>

						<Link
							to={'/support'}
							className="link-underline bg-clip-text text-transparent bg-gradient-to-tr from-blue-500 to-[#c850c0] font-medium md:py-2"
						>
							<span>Contact Support</span>
						</Link>
					</div>
				</div>

				<div className="max-w-full lg:max-w-[50%] flex-1 w-full md:h-full flex items-center justify-center text-center">
					<img
						src={pageNoteFound}
						alt="404 page not found"
						className="w-full h-full pointer-events-none select-none"
					/>
				</div>
			</div>
		</section>
	)
}

export default PageError

