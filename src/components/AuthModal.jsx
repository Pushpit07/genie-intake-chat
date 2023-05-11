const { Fragment, useState, useEffect, useContext } = require("react");
const { Transition } = require("@headlessui/react");
import { useRouter } from "next/router";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearErrors } from "@/redux/actions/userActions";
import logo from "/public/logo.png";
import { LoadingContext } from "@/store/LoadingContextProvider";
import { StatusContext } from "@/store/StatusContextProvider";
import Button from "@/components/ui/Button";
import ForgotPassword from "@/components/Profile/ForgotPassword";

export default function AuthModal({ isOpen = "", onClose = "" }) {
	const router = useRouter();

	const { setLoading } = useContext(LoadingContext);
	const { setError } = useContext(StatusContext);
	const [isModalOpen, setIsModalOpen] = useState(isOpen);

	const [authState, setAuthState] = useState("signup");
	const [forgotPassword, setForgotPassword] = useState(false);

	useEffect(() => {
		setIsModalOpen(isModalOpen);
		if (!isModalOpen) {
			document.documentElement.style.overflow = "auto";
		} else {
			document.documentElement.style.overflow = "hidden";
		}
	}, [isModalOpen]);

	useEffect(() => {
		setIsModalOpen(isOpen);
	}, [isOpen]);

	const handleChange = () => {
		setIsModalOpen(!isModalOpen);
	};

	const closeModal = () => {
		if (forgotPassword) {
			setForgotPassword(false);
			return;
		}
		handleChange();
		if (router.pathname == "/") router.replace("/", undefined, { shallow: true });
		onClose();
	};

	// Register
	const dispatch = useDispatch();

	const [user, setUser] = useState({ name: "", email: "", password: "" });
	const { name, email, password } = user;

	const { success, error } = useSelector((state) => state.auth);
	const { data: session } = useSession();
	useEffect(() => {
		if (success) {
			setLoading({ status: false });
			if (session && session.user) {
				router.push("/dashboard");
				closeModal();
			} else setAuthState("login");
		}
		if (error) {
			setError({
				title: "Something went wrong",
				message: error,
				showErrorBox: true,
			});
			setLoading({ status: false });
			dispatch(clearErrors());
		}
	}, [dispatch, success, error]);

	const registerHandler = () => {
		setLoading({ status: true });
		const userData = {
			name,
			email,
			password,
		};
		dispatch(registerUser(userData));
	};

	// Login
	const loginCredentialsSubmitHandler = async () => {
		setLoading({ status: true });

		const result = await signIn("credentials", {
			redirect: false,
			email,
			password,
		});

		if (result.error) {
			setError({
				title: "Something went wrong",
				message: result.error,
				showErrorBox: true,
			});
			setLoading({ status: false });
		} else {
			onClose();
			router.push("/dashboard");
			setLoading({ status: false });
		}
	};

	const onFieldChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	return (
		<>
			<Transition show={isModalOpen}>
				<Transition.Child
					as={Fragment}
					enter="transition-all duration-200"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-all duration-200"
					leaveTo="opacity-0"
					leaveFrom="opacity-100"
				>
					<div style={{ zIndex: "50" }} onClick={() => handleChange()} className="w-full h-full left-0 top-0 bg-black/40 backdrop-blur fixed" />
				</Transition.Child>
				<Transition.Child
					as={Fragment}
					enter="transition-all duration-200"
					enterFrom="opacity-0 scale-75"
					enterTo="opacity-100 scale-100"
					leave="transition-all duration-200"
					leaveTo="opacity-0 scale-75"
					leaveFrom="opacity-100 scale-100"
				>
					<div style={{ zIndex: "50" }} className="flex justify-center items-center h-full w-full fixed">
						<div className="max-w-[26rem] w-11/12 p-4 pl-7 sm:pl-9 pb-12 bg-light-200 rounded-lg">
							<div className="w-full flex justify-start">
								<div className="w-full flex flex-col justify-center items-center mt-4">
									{!forgotPassword && (
										<div className="w-full flex justify-between sm:px-12 px-2 mb-8">
											<button
												onClick={() => setAuthState("signup")}
												className={
													"py-2 px-8 hover:bg-primary-100 rounded text-sm font-semibold " +
													(authState === "signup" && "border-2 border-transparent border-b-primary-500")
												}
											>
												Sign Up
											</button>
											<button
												onClick={() => setAuthState("login")}
												className={
													"py-2 px-8 hover:bg-primary-100 rounded text-sm font-semibold " +
													(authState === "login" && "border-2 border-transparent border-b-primary-500")
												}
											>
												Log In
											</button>
										</div>
									)}
									<Image src={logo} alt="Logo" width="60" height="60" className="rounded-full" />
								</div>
								<div
									onClick={() => closeModal()}
									className="w-8 h-8 flex justify-center items-center rounded-lg transition-all duration-200 cursor-pointer hover:bg-zinc-500/20 "
								>
									<i className="fa-solid fa-xmark"></i>
								</div>
							</div>

							{forgotPassword ? (
								<div className="w-full flex flex-col mt-4 pr-4">
									<div className="text-center">
										<div className="text-xl font-semibold font-primary">Forgot Password&nbsp;&nbsp;&nbsp;</div>
										<p className="text-sm mt-4">Please enter your email address to get the password reset link</p>
									</div>
									<div className="mt-8">
										<div className="w-full space-y-4">
											<ForgotPassword email={email} onFieldChange={onFieldChange} />
										</div>
									</div>
								</div>
							) : (
								<div className="w-full flex flex-col mt-4 pr-2 sm:pr-4">
									<div className="text-center">
										<div className="text-xl font-semibold font-primary">
											{authState === "signup" ? "Get Started" : "Welcome Back"}&nbsp;&nbsp;&nbsp;
										</div>
										<p className="text-[13px] mt-4">Make production ready landing pages in minutes!</p>
									</div>
									<div className="mt-8">
										<div className="w-full space-y-4">
											<div className="w-full flex gap-x-4 justify-center items-center">
												<button
													onClick={() => {
														setLoading({ status: true });
														signIn("google");
													}}
													className="w-full flex justify-center items-center bg-light-400/60 hover:bg-light-400/80 transition duration-300 rounded-lg p-3 text-sm"
												>
													<Image src="/auth/google.png" alt="Google Logo" width="28" height="28" />
												</button>
											</div>

											<p className="my-4 text-center text-sm text-dark-100">or continue with</p>

											<form
												onSubmit={(e) => {
													e.preventDefault();
													if (authState === "signup") registerHandler();
													else loginCredentialsSubmitHandler();
												}}
											>
												{authState === "signup" && (
													<div className="flex flex-col">
														<label htmlFor="name_field" className="text-sm text-dark-300">
															Name
														</label>
														<input
															type="text"
															id="name_field"
															className="mt-1 w-full bg-light-100 text-dark-300 outline-none focus:ring-primary-500 focus:border-primary-500 border border-gray-300 text-sm rounded-md cursor-text form-input block transition duration-300 py-[0.5rem] px-[0.75rem] normal-case"
															value={name}
															name="name"
															onChange={onFieldChange}
															required
														/>
													</div>
												)}

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

												<div className="flex flex-col mt-2">
													<label htmlFor="password_field" className="text-sm text-dark-300">
														Password
													</label>
													<input
														type="password"
														id="password_field"
														className="mt-1 w-full bg-light-100 text-dark-300 outline-none focus:ring-primary-500 focus:border-primary-500 border border-gray-300 text-sm rounded-md cursor-text form-input block transition duration-300 py-[0.5rem] px-[0.75rem] normal-case"
														value={password}
														name="password"
														onChange={onFieldChange}
														required
													/>
												</div>

												{authState === "login" && (
													<span
														onClick={() => setForgotPassword(true)}
														className="float-right mt-2 mb-4 text-xs text-dark-300 hover:text-dark-600 cursor-pointer"
													>
														Forgot Password?
													</span>
												)}

												<div className="mt-8">
													<Button variant={"primary"} rounded={true} classes="text-md px-8 py-3">
														{authState === "login" ? "Log In" : "Sign Up"}
													</Button>
												</div>
											</form>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</Transition.Child>
			</Transition>
		</>
	);
}
