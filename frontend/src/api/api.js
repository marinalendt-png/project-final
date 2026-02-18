
export const BASE_URL = "http://localhost:8080";

// GET - fetches activities from the database
export const fetchActivities = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetch(`${BASE_URL}/activities`, {
      headers: {
        Authorization: accessToken,
      },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("fetching activities failed:", error);
    throw error;
  }
};

// POST
export const createActivity = async (activity) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetch(`${BASE_URL}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken
      },
      body: JSON.stringify(activity)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("posting activity failed:", error)
    throw error;
  }
};

// PATCH
export const patchActivities = async (activityId, updates) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetch(`${BASE_URL}/activities/${activityId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken
      },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("updating activity failed:", error);
    throw error;
  }
};

// DELETE

export const deleteActivities = async (activityId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetch(`${BASE_URL}/activities/${activityId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken
      }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("deleting activity failed:", error)
    throw error
  }
};