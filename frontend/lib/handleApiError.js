export function handleApiError(error, defaultMessage = "Something went wrong.") {
    if (!error) return defaultMessage;

    // Strapi v4 standard error format (Axios response)
    if (error.response?.data?.error?.message) {
        return error.response.data.error.message;
    }

    // Strapi custom / wrapped error format
    if (error.error?.message) {
        return error.error.message;
    }

    // Axios error message (network, timeout, etc.)
    if (typeof error.message === "string") {
        return error.message;
    }

    return defaultMessage;
}
