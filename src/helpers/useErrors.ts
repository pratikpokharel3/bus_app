import { AxiosError } from "axios"

export function useErrors(err: any) {
  if (err instanceof AxiosError) {
    let value: any = []
    let errors: string[] = []

    if ("errors" in err.response?.data) {
      for ([, value] of Object.entries(err.response?.data.errors)) {
        errors.push(value[0])
      }
      return errors
    }

    errors.push(err.response?.data.message)
    return errors
  }

  return []
}
