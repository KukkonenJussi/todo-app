import axios from "axios";
import { ErrorResponse } from "../types";

const extractAxiosErrorMessage = (error: unknown): string | null => {
  if (
    axios.isAxiosError(error) &&
    error.response &&
    typeof (error.response.data as ErrorResponse).error === "string"
  ) {
    const errorData = error.response.data as ErrorResponse;
    return errorData.error;
  }

  return null;
};

export default extractAxiosErrorMessage;
