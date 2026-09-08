const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const apiBaseUrl = `${apiHost}/api`

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
  return fetchEndpoint(`/api/${collectionName}/`)
}

export async function fetchEndpoint(endpointPath) {
  const response = await fetch(`${apiHost}${endpointPath}`)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return normalizeCollectionResponse(await response.json())
}