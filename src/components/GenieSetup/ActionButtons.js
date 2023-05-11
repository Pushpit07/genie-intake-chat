import Button from "@/components/ui/Button";

export default function ActionButtons({ step, prevStep, lastStep }) {
	return (
		<div className="flex justify-between mt-8">
			<div>
				{step !== 1 && (
					<Button variant={"primary"} type="button" onClick={() => prevStep()}>
						Back
					</Button>
				)}
			</div>
			<div>
				<Button variant={"primary"} type="submit">
					{step == lastStep ? "Create Deva" : "Next"}
				</Button>
			</div>
		</div>
	);
}
