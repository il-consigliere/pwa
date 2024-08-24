export const get = async (path: string) => {
  const response = await fetch(`api/${path}`)

  return response.json()
}

export const postFormData = async (
  path: string,
  data: Record<string, string>,
) => {
  const body = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    body.append(key, value)
  })

  const response = await fetch(`api/${path}`, { method: 'POST', body })

  return response.json()
}

export const postJsonData = async (
  path: string,
  data: Record<string, unknown>,
) => {
  const response = await fetch(`api/${path}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  })

  return response.json()
}
