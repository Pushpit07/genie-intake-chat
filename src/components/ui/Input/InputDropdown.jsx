import { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import styles from "../../../styles/CreateNFT/InputDropdown.module.css";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function InputDropdown({ optionsArray, setChoice, initialValue, classes, location }) {
	const [currentFilter, setCurrentFilter] = useState(initialValue);

	useEffect(() => {
		setChoice(currentFilter);
	}, []);

	const handleOptionSelect = (e) => {
		//Currently, I have attached the idx with the selcted item
		//So we can keep a track of indx instead of keeping the entire string
		//In our main nft creation states...

		let selectedValue = e.target.textContent;
		setChoice(selectedValue);
		// selectedValue = selectedValue.length > 20 ? selectedValue.substring(0, 17) + "..." : selectedValue;
		setCurrentFilter(selectedValue);
	};

	// Map all the options into a items renderable array
	const dropdownOptions = optionsArray.map((option, idx) => {
		return (
			<Menu.Item key={idx}>
				{({ active }) => (
					<li
						className={classNames(
							active ? "bg-gray-100 dark:bg-dark-800 text-gray-900" : "text-gray-700",
							"block px-4 py-2 text-sm cursor-pointer dark:text-light-100"
						)}
						onClick={handleOptionSelect}
						value={idx}
					>
						{option}
					</li>
				)}
			</Menu.Item>
		);
	});

	return (
		<Menu as="div" className="relative inline-block w-full text-left">
			{/* The visible dropdown button */}
			<div>
				<Menu.Button
					className={
						"dark:bg-[#323232] hover:dark:border-[#6cc027] dark:text-light-100 dark:border-[#323232] " +
						(classes == "rounded" ? styles["menu-button-rounded"] : styles["menu-button"])
					}
				>
					{currentFilter.length > 20 ? currentFilter.substring(0, 17) + "..." : currentFilter}
					<ChevronDownIcon className="ml-2 h-5 w-5 text-[#6cc027]" aria-hidden="true" />
				</Menu.Button>
			</div>
			{/* Dropdown menu */}
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items
					className={
						"absolute z-10 w-56 mt-3 origin-top-right rounded-md shadow-lg bg-light-400/60 dark:bg-dark-600 ring-1 ring-black ring-opacity-5 focus:outline-none " +
						(location == "left" ? "left-0" : "right-0")
					}
				>
					<div className={styles["menu-item-div"]}>{dropdownOptions}</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
