import Step from "@/components/GenieSetup/Step";

export default function Sidebar({ step, setStep }) {
	return (
		<div className="basis-full md:basis-1/5 p-12 space-y-4 bg-midnight-800/40 pt-32">
			<ol className="flex flex-col items-start w-full space-y-8">
				<Step
					text="Connect Twitter"
					isActive={step === 1}
					onClick={() => {
						setStep(1);
					}}
					isComplete={step > 1}
				/>
				<Step
					text="What's your name?"
					isActive={step === 2}
					onClick={() => {
						setStep(2);
					}}
					isComplete={step > 2}
				/>
				<Step
					text="Add Personality"
					isActive={step === 3}
					onClick={() => {
						setStep(3);
					}}
					isComplete={step > 3}
				/>
				<Step
					text="Your Interests"
					isActive={step === 4}
					onClick={() => {
						setStep(4);
					}}
					isComplete={step > 4}
				/>
				<Step
					text="Finish Deva Setup"
					isActive={step === 5}
					onClick={() => {
						setStep(5);
					}}
					isComplete={step > 5}
					lastStep={true}
				/>
			</ol>
		</div>
	);
}
