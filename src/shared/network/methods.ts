const responseJson = async (response: Response) => {
  try {
    return await response.json()
  } catch (error) {
    void error

    return response.ok ? '{}' : null
  }
}

export const get = async <T>(path: string): Promise<T | null> => {
  try {
    const response = await fetch(`api/${path}`)

    return responseJson(response)
  } catch (error) {
    void error

    return null
  }
}

export const postFormData = async (
  path: string,
  data: Record<string, string>,
) => {
  const body = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    body.append(key, value)
  })

  try {
    const response = await fetch(`api/${path}`, { method: 'POST', body })

    return responseJson(response)
  } catch (error) {
    void error

    return null
  }
}

export const postJsonData = async (
  path: string,
  data: Record<string, unknown>,
) => {
  try {
    const response = await fetch(`api/${path}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })

    return responseJson(response)
  } catch (error) {
    void error

    return null
  }
}
