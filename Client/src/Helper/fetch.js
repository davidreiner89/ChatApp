const baseURL = "http://localhost:8080/api/";

export const fetchSinToken = async (endPoint, data, method = "GET") => {
  // URL
  const url = `${baseURL}${endPoint}`;

  // Get
  if (method === "GET") {
    const response = await fetch(url);
    return await response.json();
  }
  // Others
  else {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }
};

export const fetchConToken = async (endPoint, data, method = "GET") => {
  // URL
  const url = `${baseURL}${endPoint}`;

  // Obtenemos el token
  const tokenStorage = localStorage.getItem("token") || "";

  // Get
  if (method === "GET") {
    const response = await fetch(url, {
      headers: {
        "x-token": tokenStorage,
      },
    });
    return await response.json();
  }
  // Others
  else {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-token": tokenStorage,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }
};
