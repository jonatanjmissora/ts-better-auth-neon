export async function delay() {
	return new Promise(resolve => setTimeout(resolve, 3000))
}

export function parseDate(num: number) {
	const s = num.toString()
	return `${s.slice(6, 8)}/${s.slice(4, 6)}/${s.slice(0, 4)} ${s.slice(8, 10)}:${s.slice(10, 12)}`
}
