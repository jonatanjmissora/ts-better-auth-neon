import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useFormStatus } from "react-dom"

export default function SubmitBtn({
	label,
	className,
}: {
	label: string
	className?: string
}) {
	const { pending } = useFormStatus()
	return (
		<Button
			type="submit"
			className={`${className} bg-orange-500`}
			disabled={pending}
		>
			{pending ? <Loader2 className="h-8 w-20 animate-spin" /> : label}
		</Button>
	)
}
