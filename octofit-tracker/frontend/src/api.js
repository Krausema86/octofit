const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function normalizeCollectionResponse(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  const collectionKeys = ['results', 'data', 'items', 'docs']
  const collection = collectionKeys
    .map((key) => payload?.[key])
    .find((value) => Array.isArray(value))

  return collection ?? []
}

export async function fetchCollection(collectionName) {
  const response = await fetch(`${apiBaseUrl}/${collectionName}/`)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return normalizeCollectionResponse(await response.json())
}