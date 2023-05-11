import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import logo from "../../public/logo_removedbg.png";
import HamburgerMenu from "./HamburgerMenu";

const Navbar = ({ setAuthModalOpen }) => {
	const { data: session, status } = useSession();

	let truncatedName;
	if (session && session.user && session.user.name) {
		truncatedName = session.user.name ?? "";
		if (session.user.name && session.user.name.length > 10) {
			truncatedName = truncatedName.substring(0, 8) + "...";
		}
	}

	let avatarUrl = session && session.user && session.user.image;

	let truncatedEmail;
	if (session && session.user && session.user.email) {
		truncatedEmail = session.user.email.substring(0, 16) + "...";
	}

	const router = useRouter();

	return (
		<div className="flex justify-center w-screen">
			<div className={"w-full fixed z-40 max-w-[1920px]"}>
				<nav className={"navbar duration-500 ease-in mx-auto border-b-[0.5px] border-b-gray-700"}>
					<div className="w-full flex flex-wrap items-center justify-between pl-7 sm:pl-9 pr-16 lg:px-16 py-2">
						<Link href="/">
							<span className="flex">
								<Image src={logo} alt="MXV Logo" width="50" className="rounded-full" />
							</span>
						</Link>

						{/* <div className="hidden md:block">
							<ul className="flex flex-row items-center text-sm font-medium md:space-x-8 lg:space-x-3 xl:space-x-6 md:mt-0 sm:text-sm">
								<li className="hidden md:block">
									<ul className="relative group dropdown">
										<a
											className="flex items-center dropdown-toggle hidden-arrow"
											id="dropdownMenuButton2"
											role="button"
											data-bs-toggle="dropdown"
											aria-expanded="false"
										>
											{status === "authenticated" ? (
												<div className="flex items-center justify-center px-4 py-2 text-sm rounded-full bg-[#e9e9e9]">
													<span className="mr-3">{truncatedName}</span>
													{avatarUrl ? (
														<Image src={avatarUrl} alt="avatar" width="24" height="24" className="rounded-full" />
													) : (
														<Image src={"/default_avatar.jpg"} alt="avatar" width="24" height="24" className="rounded-full" />
													)}
												</div>
											) : (
												<div
													onClick={() => setAuthModalOpen(true)}
													className="flex items-center justify-center px-10 py-2 text-base font-semibold rounded-full bg-[#e9e9e9] hover:bg-light-400 transition duration-300"
												>
													Sign In
												</div>
											)}
										</a>

										{status === "authenticated" && (
											<ul
												className="absolute right-0 left-auto z-10 hidden text-sm font-medium float-left m-0 text-left list-none border-none rounded-xl shadow-lg dropdown-menu min-w-[250px] bg-[#e9e9e9] backdrop-blur-[24px] backdrop-brightness-105
											bg-clip-padding group-hover:block"
												aria-labelledby="dropdownMenuButton2"
											>
												{status === "authenticated" && (
													<li>
														<div className="flex flex-col px-4 py-3 rounded-t-xl">
															<div className="flex items-center justify-between w-full bg-transparent rounded-t-xl dropdown-item whitespace-nowrap active:bg-transparent active:text-dark-900">
																<div>
																	<p>Email</p>
																	<p>{truncatedEmail}</p>
																</div>
																{avatarUrl ? (
																	<Image src={avatarUrl} alt={"avatar"} width={40} height={40} className="rounded-lg" />
																) : (
																	<Image
																		src={"/default_avatar.jpg"}
																		alt="avatar"
																		width="40"
																		height="40"
																		className="rounded-lg"
																	/>
																)}
															</div>
														</div>
													</li>
												)}

												{status === "authenticated" && (
													<li>
														<Link href={`/dashboard`} passHref={true}>
															<div className="block w-full px-4 py-2 bg-transparent cursor-pointer dropdown-item whitespace-nowrap bg-[#e9e9e9] hover:bg-light-400">
																Dashboard
															</div>
														</Link>
													</li>
												)}

												
												<li>
													{status === "authenticated" ? (
														<button
															className="w-full px-4 pt-2 pb-3 font-medium transition-all bg-transparent cursor-pointer rounded-b-xl border-light-300 hover:bg-error-400/20"
															onClick={() => {
																signOut();
																localStorage.removeItem("selectedTeam");
															}}
														>
															Sign out
														</button>
													) : (
														<span></span>
													)}
												</li>
											</ul>
										)}
									</ul>
								</li>
							</ul>
						</div>

						
						<HamburgerMenu avatarUrl={session && session.user && session.user.image} truncatedName={session && session.user && session.user.name} /> 
						*/}
					</div>
				</nav>
			</div>
		</div>
	);
};

export default Navbar;
