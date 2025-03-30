export const catchError = (error) => {
  const { response } = error;

  if (response) {
    const { status, data } = response;
    // Check if the response contains HTML (e.g., returned as a string containing HTML tags)
    if (typeof data === "string" && data.trim().startsWith("<!DOCTYPE html>")) {
      return {
        message: `Unexpected HTML response received. Status: ${status}.`,
        success: false,
      };
    }

    // If response data exists and is an object, return it
    if (data) {
      return {
        message: data.message || "An error occurred.",
        success: false,
        data,
      };
    }

    // Default case for a response without data
    return {
      message: `Request failed with status code ${status}.`,
      success: false,
    };
  }

  // Handle errors without a response (e.g., network errors)
  return {
    message: error.message || "An unknown error occurred.",
    success: false,
  };
};
