import gql from "graphql-tag";

const CREATE_LOCATION_MUTATION = gql`
  mutation createLocation($location: CreateLocationInput!) {
    createLocation(createLocation: $location) {
      id
      name
      address
      createdAt
      updatedAt
      events {
        name
      }
    }
  }
`;

export default CREATE_LOCATION_MUTATION;
