export const BASE_URL = "http://localhost:8080";

// ======= ACTIVITIES ======= //

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

// Create activity
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

// Updates activity 
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

// Delete activity 
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

// ======= DAILYPLAN ======= //

// Create a new dailyplan
export const createDailyPlan = async (plan) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetch(`${BASE_URL}/dailyplan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken
      },
      body: JSON.stringify(plan)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("posting dailyplan failed:", error)
    throw error;
  }
};

// Updates activity 
export const patchDailyPlan = async (dailyPlanId, updates) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetch(`${BASE_URL}/dailyplan/${dailyPlanId}`, {
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
    console.error("updating dailyplan failed:", error);
    throw error;
  }
};

// Delete dailyplan
export const deleteDailyPlan = async (dailyPlanId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetch(`${BASE_URL}/dailyplan/${dailyPlanId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken
      }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("deleting dailyplan failed:", error)
    throw error
  }
};

// Get daily plan
export const fetchDailyPlan = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetch(`${BASE_URL}/dailyplan`, {
      headers: {
        Authorization: accessToken
      },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("fetching dailyplan failed:", error)
    throw error;
  }
};


