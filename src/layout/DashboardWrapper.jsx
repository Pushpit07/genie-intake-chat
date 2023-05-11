import Sidebar from "@/components/Dashboard/Sidebar";
import TeamContextProvider from "@/store/TeamContextProvider";

export default function DashboardWrapper({ children }) {
	return (
		<main className="w-full flex flex-col items-center justify-center bg-light-200">
			<div className="w-full max-w-[1920px] flex justify-center items-start min-h-screen">
				<div className="relative w-full h-full flex flex-col md:flex-row pt-20">
					<TeamContextProvider>
						<Sidebar />

						<div className="basis-full md:basis-4/5 flex flex-col py-10 pb-32 gap-y-10 pl-6 pr-10 md:pl-0">{children}</div>
					</TeamContextProvider>
				</div>
			</div>
		</main>
	);
}
