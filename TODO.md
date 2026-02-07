tanstack react form
items/create-form ✔
items/edit-form ❌

DB ACTIONS								SERVERFN									HOOKs
----------------------------------------------------------------------------------------------------------------
itmes/get-items-db ✔				     items/get-items-server ✔						items/use-get-items ✔
items/insert-item-db ✔				     items/create-items-server ✔				     items/useCreateItem ✔
items/update-item-db ❌				 items/update-items-server ❌      			   items/useUpdateItem ❌
items/delete-item-db ✔				    items/delete-items-server ✔				     items/useDeleteItem ✔
categories/get-categories-db ✔		categories/get-categories-server ✔			categories/get-categories-query ✔
categories/insert-category-db ❌	    categories/create-categories-server ❌ 	categories/useCreateCategories ✔
categories/update-category-db ❌	  categories/update-categories-server ❌	   categories/useUpdateCategories ❌
categories/delete-category-db ❌	   categories/delete-categories-server ❌		categories/useDeleteCategories ❌



✔ hacer bien el createRouter por el streaming (defaultPendingMs: 0,	defaultPreload: "intent",defaultPreloadStaleTime: 0),

✔ hacer bien el queryOptions, por el tema del refresco (refetchInterval: 60 * 1000,)

✔ hacer bien el streaming cuando leo datos de la base

✔ hay  retraso en todas las operaciones de base de datos


cuando usar getQueryClient() ? en loaders, server functions, providers, etc
cuando usar useQueryClient() ? siempre que estes en componentes React. Es un hook.

cuando usar Route.invalidate() ? si tu data proviene del loader y necesitas refrescar datos.
cuando usar route.navigate() ? Cuando vas de una ruta a otra.
cuando usar queryClient.invalidateQueries() ? cuando haces un mutation en cliente.

cuando uso getSession() ? en loaders, server functions, providers, etc
cuando uso const { session } = useSession() ? en componentes React. Consume la session que ya guarde en el
root via loader.

FALTA 
======

✔ que cuando haga la mutacion, actualizar sin tener que hacer refetch, solo con el onSuccess

si en el DialogAlert, no es mejor hacer un form, asi veo el spinner cuando esta eliminando

agregar el price a la tabla de categories
