import gql from "graphql-tag";

const UPDATE_LOCATION_MUTATION = gql`
  mutation updateLocation($location: UpdateLocationInput!) {
    updateLocation(updateLocation: $location) {
      id
      name
      address
    }
  }
`;

export default UPDATE_LOCATION_MUTATION;
