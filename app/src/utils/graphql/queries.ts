// queries.ts
import { gql } from "@apollo/client";

export const getUsers = gql`
  query Query {
    users {
      _id
      firstName
      lastName
      participation
    }
  }
`;
