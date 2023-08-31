import gql from "graphql-tag";

const REMOVE_LOCATION_MUTATION = gql`
  mutation removeLocation($id: Float!) {
    removeLocation(id: $id)
  }
`;

export default REMOVE_LOCATION_MUTATION;
