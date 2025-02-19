// api.ts

import axios from "axios";

import type { GraphQLResponse } from "~/types/cartesi";

export const fetchGraphQLData = async <T>(query: string) => {
  const response = await axios.post<GraphQLResponse<T>>(
    "http://localhost:8080/graphql",
    {
      query,
    }
  );
  return response.data.data;
};
