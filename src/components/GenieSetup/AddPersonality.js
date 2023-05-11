import TextInput from "@/components/ui/Input/TextInput";

const AddPersonality = ({ formValues, onFieldChange, addCollaborator }) => {
	return (
		<>
			<div>
				<h2 className="text-xl font-semibold">Describe your personality</h2>
				<p className="mt-1 text-sm text-dark-100">Your deva needs this to resemble you as closely as possible</p>
			</div>

			<div className="xl:w-1/3 lg:w-1/2 md:w-2/3 w-full flex flex-col gap-3 mt-4">
				<h2 className="text-base font-medium">Give us a description</h2>
				<textarea
					type={"text"}
					rows={5}
					className="w-full bg-midnight-800 text-neongreen outline-none focus:ring-neongreen focus:border-neongreen border border-gray-800 text-sm rounded-md cursor-text form-input block transition duration-300 py-[0.5rem] px-[0.75rem]"
				></textarea>

				<p className="text-base text-light-500 text-center mt-4">and/or</p>
			</div>

			<div className="w-full">
				<h2 className="text-base font-medium mb-2">Add personality traits one by one</h2>

				<div className="xl:w-1/3 lg:w-1/2 md:w-2/3 w-full flex flex-col gap-5">
					{formValues.collaborators.map((collaborator, index) => (
						<div className="flex" key={index}>
							<TextInput
								type={"text"}
								value={collaborator.email}
								name={"collaborators" + String(index)}
								onFieldChange={onFieldChange}
								placeholder="Eg. Honest, Funny, Sarcastic, etc."
								required={false}
							/>
						</div>
					))}

					{formValues.collaborators && formValues.collaborators.length < 10 && (
						<div className="group flex items-center justify-start cursor-pointer" onClick={() => addCollaborator()}>
							<button
								type="button"
								className="rounded-full flex justify-center items-center w-6 h-6 text-dark-800 text-sm bg-neongreen group-hover:bg-neongreen/80 transition duration-200"
							>
								<i className="fa-solid fa-plus"></i>
							</button>
							<span className="pl-3 text-sm font-normal">Add another</span>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default AddPersonality;
