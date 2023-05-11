import Image from "next/image";
import logo from "../../public/logo_removedbg.png";

const Footer = () => {
	return (
		<div className="flex justify-center w-full">
			<div className="w-full max-w-[1920px] pt-12 pb-12 px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-36 bg-midnight-900 border-t-[0.5px] border-t-gray-700">
				<div className="w-full flex justify-between items-center">
					<Image src={logo} alt="logo" width="60" className="rounded-full" />
					<p className="font-primary sm:text-lg text-base font-medium text-neongreen">Genie Intake Chat</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
