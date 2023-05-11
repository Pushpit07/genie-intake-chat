import PageWrapper from "@/layout/PageWrapper";
import Button from "@/components/ui/Button";
import { useRouter } from "next/router";

export default function HomePage() {
	const router = useRouter();

	return (
		<PageWrapper>
			<h1 className="px-2 sm:px-8 md:px-16 text-[48px] sm:text-[50px] md:text-[80px] lg:text-[100px] leading-[120px] text-center font-extrabold tracking-[-2.5px] text-gradient-primary-tr">
				Genie Intake Chat
			</h1>

			<div className="mt-20 flex justify-center">
				<Button classes="text-xl py-4" onClick={() => router.push("genie-setup")}>
					Set up my deva
				</Button>
			</div>
		</PageWrapper>
	);
}
