
export const loadModules = async (user: string) => {
  try {
    const response = await fetch(
      `http://localhost:3232/LoadModules?uid=${user}`
    );
    console.log("the load modules api call was done!!")
   console.log(response)
  } catch (error) {
    console.error("Failed to check survey status:", error);
  }
};
