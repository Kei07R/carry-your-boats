export const sendMessage = async (message, chatHistory) => {
  try {
    const response = await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, chatHistory }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
