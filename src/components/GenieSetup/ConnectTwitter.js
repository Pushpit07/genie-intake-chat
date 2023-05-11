const ConnectTwitter = ({}) => {
	return (
		<>
			<div>
				<h2 className="text-xl font-semibold">Connect your Twitter account</h2>
				<p className="mt-1 text-sm text-dark-100">Please click the button below</p>
			</div>

			<div className="md:w-1/3 w-full flex flex-col mt-4">
				<button
					type="button"
					className="px-4 py-2 bg-blue-500 hover:bg-blue-600 transition duration-300 text-light-100 font-medium flex gap-x-3 justify-center items-center rounded-full"
				>
					<i className="fa fa-twitter"></i>Connect Twitter
				</button>

				<p className="mt-2 text-xs text-dark-100">You can&apos;t proceed until you connect your twitter account.</p>
			</div>
		</>
	);
};

export default ConnectTwitter;
