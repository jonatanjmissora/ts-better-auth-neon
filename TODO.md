tanstack react form
items/create-form ✔
items/edit-form ❌

tanstack query - mutations
items/get-items-query ❌ (STREAMING ❌)
items/useCreateItem ✔
items/useUpdateItem ❌
items/useDeleteItem ❌

categories/get-categories-query ✔ (STREAMING ❌)
categories/useCreateCategories ✔
categories/useUpdateCategories ❌
categories/useDeleteCategories ❌

serverFn con auth
items/get-items-server ❌
items/create-items-server ✔
items/update-items-server ❌
items/delete-items-server ❌
categories/get-categories-server ✔
categories/create-categories-server ❌
categories/update-categories-server ❌
categories/delete-categories-server ❌

db actions
itmes/get-items-db ❌
items/insert-item-db ✔
items/update-item-db ❌
items/delete-item-db ❌
categories/get-categories-db ✔
categories/insert-category-db ❌
categories/update-category-db ❌
categories/delete-category-db ❌

carpetas:
- db (aqui coloco los schemas, drizzle, zod schemas y crud operations)
- server (server functions que interactuan con las crud operations)
- queries (tanstack query hooks)