export const sendFeedback = async (review: string) => {
  try {
    const response = await fetch(
      "http://127.0.0.1:7000/api/reviews/classify/",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ review }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    return (error as Error).message;
  }
};
