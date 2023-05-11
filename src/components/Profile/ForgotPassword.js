import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearErrors } from "@/redux/actions/userActions";
import { StatusContext } from "@/store/StatusContextProvider";
import Button from "@/components/ui/Button";

const ForgotPassword = ({ email, onFieldChange }) => {
	const { setSuccess, setError } = useContext(StatusContext);

	const dispatch = useDispatch();
	const { error, loading, message } = useSelector((state) => state.forgotPassword);

	useEffect(() => {
		if (error) {
			setError({
				title: "Something went wrong",
				message: error,
				showErrorBox: true,
			});
			dispatch(clearErrors());
		}
		if (message) {
			setSuccess({
				title: "Email sent successfully",
				message: message,
				showSuccessBox: true,
			});
		}
	}, [dispatch, message, error]);

	const submitHandler = () => {
		const userData = {
			email,
		};
		dispatch(forgotPassword(userData));
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				submitHandler();
			}}
		>
			<div className="flex flex-col mt-2">
				<label htmlFor="email_field" className="text-sm text-dark-300">
					Email
				</label>
				<input
					type="email"
					id="email_field"
					className="mt-1 w-full bg-light-100 text-dark-300 outline-none focus:ring-primary-500 focus:border-primary-500 border border-gray-300 text-sm rounded-md cursor-text form-input block transition duration-300 py-[0.5rem] px-[0.75rem] normal-case"
					value={email}
					name="email"
					onChange={onFieldChange}
					required
				/>
			</div>

			<div className="mt-8">
				<Button variant={"primary"} rounded={true} isLoading={loading} classes="text-md px-8 py-3">
					Send Email
				</Button>
			</div>
		</form>
	);
};

export default ForgotPassword;
