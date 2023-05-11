import TextInput from "@/components/ui/Input/TextInput";

const NameDetails = ({ formValues, onFieldChange }) => {
	return (
		<>
			<div>
				<h2 className="text-xl font-semibold">What do friends call you?</h2>
				<p className="mt-1 text-sm text-dark-100">Please enter your name</p>
			</div>

			<div className="md:w-1/2 w-full flex flex-col mt-4">
				<TextInput label={"Name"} value={formValues.name} name={"name"} onFieldChange={onFieldChange} />

				<p className="mt-2 text-xs text-dark-100">We autofill your name from your Twitter account. You can change it if you wish to.</p>
			</div>
		</>
	);
};

export default NameDetails;
