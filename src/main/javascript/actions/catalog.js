export const UPDATE_CATALOGS = 'UPDATE_CATALOGS'

export function updateCatalogs(catalogs) {
  return {
    type: UPDATE_CATALOGS,
    catalogs
  }
}
