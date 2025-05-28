const baseUrl = import.meta.env.VITE_BASE__URL;

export async function getInvoices(query = "") {
  // All
  const req = await fetch(baseUrl + (query ? `?status=${query}` : ""));
  if (req.status === 200) {
    const result = await req.json();
    return result.data;
  } else {
    throw new Error("Something went wrong :(");
  }
}
// Get by Id
export async function getInvoice(id) {
  const req = await fetch(baseUrl + `/${id}`);
  if (req.status === 200) {
    const result = await req.json();
    return result;
  } else {
    throw new Error("Something went wrong :(");
  }
}

// Delete by id
export async function deleteById(id) {
  const req = await fetch(baseUrl + `/${id}`, { method: "DELETE" });
  if (req.status === 200) {
    return "success";
  } else {
    throw new Error("Something went wrong :(");
  }
}

// Update by id
export async function updateById(id, newData) {
  const req = await fetch(baseUrl + `/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });

  if (req.status === 200) {
    const result = await req.json();
    return result;
  } else {
    throw new Error("Something went wrong :(");
  }
}

// Add
export async function addInvoice(data) {
  const req = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (req.status === 200) {
    const result = await req.json();
    return result;
  } else {
    throw new Error("Something went wrong :(");
  }
}
