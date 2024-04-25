export const createUserApi = async (name, email, password) => {
  try {
    const res = await fetch("/api/register", {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) throw new Error("Could not register User");
    return res.json();
  } catch (error) {
    console.log("Error creating user", error.message);
  }
};

export const getUserApi = async (email, password) => {
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Could not find User");
    return res.json();
  } catch (error) {
    console.log("Error getting User details", error.message);
  }
};
