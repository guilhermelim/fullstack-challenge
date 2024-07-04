// queries.ts
import { gql } from "@apollo/client";

export const addUser = gql`
  mutation Mutation($input: UserInput!) {
    addUser(input: $input) {
      firstName
      lastName
      participation
    }
  }
`;

export const deleteUser = gql`
  mutation Mutation($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      _id
    }
  }
`;

export const updateUser = gql`
  mutation UpdateUser($input: UserInput!, $updateUserId: ID!) {
    updateUser(input: $input, id: $updateUserId) {
      firstName
      lastName
      participation
    }
  }
`;
