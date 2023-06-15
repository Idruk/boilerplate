const request = (method: string, formDataBody = false) => async (
    url: string,
    body?: Record<string, unknown> | FormData,
) => {
    let res: Response;
    let jsonResponse;

    const opt: RequestInit = {
        body: formDataBody ? (body as FormData) : JSON.stringify(body),
        method
    }

    if (body) {
        opt.headers = formDataBody
            ? undefined
            : {
                "Content-Type": "application/json",
            };
    }


    try {
        const baseUrl = "http://127.0.0.1:8080"
        res = await fetch(`${baseUrl}${url}`, opt);

        if (res.status === 204) {
            return {};
        }

        let data;

        if (res.headers.get("Content-Type")?.includes("application/json")) {
            data = await res.json();
        } else if (res.headers.get("Content-Type")?.includes("text")) {
            data = await res.text();
        } else if (res.headers.get("Content-Type")?.includes("octet-stream")) {
            data = await res.blob();
        }

        if (res.headers.get("Content-Disposition")?.includes('filename="')) {
            jsonResponse = {
                filename: res.headers.get("Content-Disposition")?.match(/.*filename="([^"]*)"/)![1],
                file: data,
            };
        } else {
            jsonResponse = data;
        }
    } catch (err) {
        throw new Error("Server unavailable");
    }

    if (!res.ok) {
        throw jsonResponse.error || new Error("Server unavailable");
    }

    return jsonResponse;
}

export default {
    post: request("POST"),
    get: request("GET"),
    put: request("PUT"),
    delete: request("DELETE"),
    patch: request("PATCH"),
    upload: request("POST", true),
};
