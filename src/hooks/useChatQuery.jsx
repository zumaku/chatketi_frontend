import { useState } from "react";
import axios from "axios";

const useChatQuery = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchChatResponse = async (input) => {
    if (!input || input.trim() === "") {
      return null;
    }

    setIsLoading(true);
    setIsError(false);

    try {
      const response = await axios.post(
        url,
        { query: input },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.result;
    } catch (error) {
      console.error("Error fetching response:", error);
      setIsError(true);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchChatResponse, isLoading, isError };
};

export default useChatQuery;
