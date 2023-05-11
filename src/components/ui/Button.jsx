export default function Button({ variant = "primary", outline = false, rounded, type, disabled, onClick, children, classes, innerClasses, isLoading = false }) {
	return (
		<button
			type={type ? type : "submit"}
			disabled={disabled || isLoading ? disabled : false}
			onClick={() => (!isLoading && !disabled && onClick ? onClick() : {})}
			className={
				`w-full flex items-center justify-center font-primary font-medium transition duration-300 text-[14px] ` +
				(isLoading ? `cursor-default ` : `cursor-pointer `) +
				(outline ? `px-[2px] py-[2px] ` : `px-6 py-2 `) +
				(variant == "primary"
					? outline
						? isLoading
							? `bg-gradient-primary-tr-outline `
							: `bg-gradient-primary-tr-outline `
						: (isLoading ? `bg-gradient-primary-tr-loading ` : `bg-gradient-primary-tr `) + `text-light-100 `
					: variant == "secondary"
					? outline
						? isLoading
							? `bg-gradient-secondary-tr-outline `
							: `bg-gradient-secondary-tr-outline `
						: (isLoading ? `bg-gradient-secondary-tr-loading ` : `bg-gradient-secondary-tr `) + `text-light-100 `
					: variant == "error"
					? outline
						? isLoading
							? `bg-gradient-error-tr-outline `
							: `bg-gradient-error-tr-outline `
						: (isLoading ? `bg-gradient-error-tr-loading ` : `bg-gradient-error-tr `) + `text-light-100 `
					: variant == "classic"
					? outline
						? isLoading
							? `bg-gradient-error-tr-outline `
							: `bg-gradient-error-tr-outline `
						: isLoading
						? `bg-gradient-error-tr-loading `
						: `py-2 px-7 font-semibold rounded-md bg-light-100 hover:bg-light-200 text-dark-600 text-base  `
					: variant == "default"
					? outline
						? isLoading
							? `bg-gradient-default-tr-outline `
							: `bg-gradient-default-tr-outline `
						: (isLoading ? `bg-gradient-default-tr-loading ` : `bg-gradient-default-tr border border-[#30363d] `) + `text-light-200 `
					: ` `) +
				(rounded ? `rounded-full ` : `rounded-lg `) +
				(classes ? classes : ` `)
			}
		>
			{outline ? (
				isLoading ? (
					<span
						className={
							`w-full flex items-center justify-center bg-light-100 text-dark-800 hover:text-light-100 ` +
							(rounded ? `rounded-full ` : `rounded-md `) +
							(innerClasses ? innerClasses : `py-[7px] px-4 `)
						}
					>
						<span className="loader"></span>
					</span>
				) : (
					<span
						className={
							`w-full flex items-center justify-center bg-light-100 text-dark-800 hover:text-light-100 hover:bg-transparent transition duration-300 ` +
							(rounded ? `rounded-full ` : `rounded-md `) +
							(innerClasses ? innerClasses : `py-[7px] px-4 `)
						}
					>
						{children}
					</span>
				)
			) : isLoading ? (
				<span className="loader"></span>
			) : (
				children
			)}
		</button>
	);
}
