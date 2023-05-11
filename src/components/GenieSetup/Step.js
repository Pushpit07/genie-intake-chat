export default function Step({ text, isActive, onClick, isComplete, lastStep }) {
	return (
		<li
			onClick={() => onClick()}
			className={
				"flex h-full items-center cursor-pointer " +
				(lastStep
					? ""
					: "after:content-[''] after:absolute after:ml-[17px] after:mt-[68px] after:h-8 after:border after:inline-block " +
					  (isActive || isComplete ? "after:border-neongreen" : "after:border-neongreen"))
			}
		>
			<div
				className={
					"relative p-4 rounded-full " +
					(isComplete
						? "bg-neongreen border-2 border-neongreen"
						: isActive
						? "border-2 border-neongreen bg-midnight-900"
						: "border-2 border-neongreen/40 bg-midnight-700")
				}
			>
				{isComplete ? (
					<i className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-md text-dark-800 fas fa-check"></i>
				) : (
					isActive && (
						<span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-[5px] bg-neongreen"></span>
					)
				)}
			</div>
			<p className={"ml-4 font-semibold text-xs " + (isActive ? "text-neongreen" : "text-light-300")}>{text}</p>
		</li>
	);
}
