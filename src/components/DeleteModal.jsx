import Modal from "@/components/ui/Modal";

const DeleteModal = ({ isOpen, setOpen, title, confirmation, name, deleteHandler }) => {
	return (
		<Modal
			isOpen={isOpen}
			image={
				<div className="mx-auto flex items-center relative justify-center h-24 w-24 text-4xl">
					<i className="fa-solid fa-trash"></i>
				</div>
			}
			title={title}
			content={
				<div>
					<form
						onSubmit={async (e) => {
							e.preventDefault();
							deleteHandler();
						}}
					>
						<div className="flex flex-col justify-center">
							<div className="flex justify-center items-center gap-x-4">
								<p className="text-xl font-semibold text-dark-500">{name}</p>
							</div>
						</div>

						<p className="text-sm font-semibold text-center mt-10">{confirmation}</p>

						<div className="flex justify-end">
							<button
								type="submit"
								className="flex items-center mt-10 -mb-6 px-6 py-2 text-sm font-primary font-bold rounded-md bg-error-600 hover:bg-error-700 text-light-100"
							>
								Delete
								<span className="ml-6 text-lg">
									<i className="fa-solid fa-arrow-right-long"></i>
								</span>
							</button>
						</div>
					</form>
				</div>
			}
			onClose={() => {
				setOpen(false);
			}}
		></Modal>
	);
};

export default DeleteModal;
