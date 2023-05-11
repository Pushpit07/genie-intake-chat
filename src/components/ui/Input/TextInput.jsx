export default function TextInput({ label, type = "text", value = "", name, onFieldChange, placeholder = "", required = true }) {
	return (
		<div className="w-full flex flex-col justify-end">
			<p className="text-light-500 text-sm font-medium mb-1 text-start">{label}</p>
			<input
				type={type}
				name={name}
				value={value}
				onChange={onFieldChange}
				placeholder={placeholder}
				required={required}
				className="w-full bg-midnight-800 text-neongreen outline-none focus:ring-neongreen focus:border-neongreen border border-gray-800 text-sm rounded-md cursor-text form-input block transition duration-300 py-[0.5rem] px-[0.75rem]"
			/>
		</div>
	);
}
