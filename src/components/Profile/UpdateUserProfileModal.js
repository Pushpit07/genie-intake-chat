import Image from "next/image";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import TextInput from "@/components/ui/Input/TextInput";

const UpdateUserProfileModal = ({ isOpen, setOpen, submitHandler, avatarUrl, user, setUser }) => {
	const { data: session } = useSession();

	const { name, email } = user;
	const onFieldChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	return (
		<>
			<Modal
				isOpen={isOpen}
				title={<h1 className="text-4xl font-bold text-center tracking-[-1px] text-gradient-primary-tr">Profile Details</h1>}
				content={
					<div className="-mt-4">
						<div className="w-full flex items-center justify-center">
							{avatarUrl ? (
								<Image src={avatarUrl} alt="avatar" width="100" height="100" className="rounded-full" />
							) : (
								<Image src={"/default_avatar.jpg"} alt="avatar" width="100" height="100" className="rounded-full object-cover" />
							)}
						</div>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								submitHandler();
							}}
							className="mt-4"
						>
							<div className="flex flex-col">
								<TextInput label={"Name"} type={"text"} value={name} name={"name"} onFieldChange={onFieldChange} />
							</div>

							{session && session.user && !session.user.image.includes("google") && (
								<div className="flex flex-col mt-2">
									<TextInput label={"Email"} type={"email"} value={email} name={"email"} onFieldChange={onFieldChange} />
								</div>
							)}

							<div className="mt-10">
								<Button variant={"primary"} classes="text-md px-8 py-3">
									Update
								</Button>
							</div>
						</form>
					</div>
				}
				onClose={() => {
					setOpen(false);
				}}
			></Modal>
		</>
	);
};

export default UpdateUserProfileModal;
