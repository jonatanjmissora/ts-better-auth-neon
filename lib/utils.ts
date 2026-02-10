import { CategoryType } from "db/categories/schema"
import type { ItemType, ItemWithCategoryType } from "db/items/schema"

export async function delay() {
	return new Promise(resolve => setTimeout(resolve, 3000))
}

export function parseDate(num: number) {
	const s = num.toString()
	return `${s.slice(6, 8)}/${s.slice(4, 6)}/${s.slice(0, 4)} ${s.slice(8, 10)}:${s.slice(10, 12)}`
}

export function setItemForQuery(item: ItemType, category: CategoryType) {
	return {
		id: item.id,
		userId: item.userId,
		date: item.date,
		name: item.name,
		phone: item.phone,
		category,
	}
}

export function setItemWithCategoryId(item: ItemWithCategoryType) {
	return {
		date: item.date,
		id: item.id,
		name: item.name,
		phone: item.phone,
		categoryId: item.category.id,
		userId: item.userId,
	}
}
