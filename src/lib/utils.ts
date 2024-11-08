import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { NextApiResponse } from "next"
import { Response } from "../types/response"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleAPIResponse = <T>(
  res: NextApiResponse<Response<T>>,
  payload: T,
  message: string,
  statusCode = 200
): void => {
  res.statusCode = statusCode
  res.json({ payload, error: null, message })
}

export const handleAPIError = (res: NextApiResponse, error: string, statusCode = 400): void => {
  res.statusCode = statusCode
  res.json({ payload: null, error: error, message: "An error occurred" })
}
