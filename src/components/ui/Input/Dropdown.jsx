import { useState, useEffect } from "react";

export default function Dropdown({ label = "", id, options = [], objKey, setChoice, classes }) {
	const [dropdownOptions, setDropdownOptions] = useState(options);

	useEffect(() => {
		setDropdownOptions(options);
	}, [options]);

	return (
		<div className={"flex-col items-start justify-start inline-block " + classes}>
			{label && <p className="text-dark-400 text-sm font-medium mb-1">{label}</p>}
			<select
				id={id}
				className={
					"focus:ring-primary-500 transition duration-300 text-dark-300 border-gray-300 text-sm font-medium rounded-md cursor-pointer p-2 px-6 border-transparent border-r-[10px] outline-none " +
					classes
				}
				onChange={(e) => setChoice && setChoice(e)}
			>
				{dropdownOptions.map((option, index) => {
					return (
						<option key={objKey ? option[objKey] : option} data-index={index} value={objKey ? option[objKey] : option}>
							{objKey ? option[objKey] : option}
						</option>
					);
				})}
			</select>
		</div>
	);
}
