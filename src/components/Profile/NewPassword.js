import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors } from "@/redux/actions/userActions";
import { StatusContext } from "@/store/StatusContextProvider";
import Button from "@/components/ui/Button";
import { sleep } from "@/utils/Sleep";
import TextInput from "@/components/ui/Input/TextInput";

const NewPassword = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const { setSuccess, setError } = useContext(StatusContext);
	const router = useRouter();

	const dispatch = useDispatch();
	const { error, loading, success } = useSelector((state) => state.forgotPassword);

	useEffect(() => {
		if (error) {
			setError({
				title: "Something went wrong",
				message: error,
				showErrorBox: true,
			});
			dispatch(clearErrors());
		}
		if (success) {
			setSuccess({
				title: "Password reset successfully",
				message: success,
				showSuccessBox: true,
			});
			sleep(2000).then(() => {
				router.push("/?login");
			});
		}
	}, [dispatch, success, error]);

	const submitHandler = () => {
		const passwords = {
			password,
			confirmPassword,
		};
		dispatch(resetPassword(router.query.token, passwords));
	};

	return (
		<div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/3 p-8 bg-light-100 rounded-lg mt-10">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					submitHandler();
				}}
			>
				<p className="text-dark-600 text-center">Please enter your new password</p>
				<div className="flex flex-col gap-4 mt-8">
					<TextInput label={"Password"} type={"password"} value={password} name={"password"} onFieldChange={(e) => setPassword(e.target.value)} />
					<TextInput
						label={"Confirm Password"}
						type={"password"}
						value={confirmPassword}
						name={"password"}
						onFieldChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</div>

				<div className="mt-8">
					<Button variant={"primary"} rounded={true} isLoading={loading} classes="text-md px-8 py-3">
						Reset Password
					</Button>
				</div>
			</form>
		</div>
	);
};

export default NewPassword;
