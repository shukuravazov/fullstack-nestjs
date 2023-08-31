import gql from "graphql-tag";

const GET_ONE_LOCATION_QUERY = gql`
  query GetLocation($id: Float!) {
    getOneLocation(id: $id) {
      id
      name
      address
    }
  }
`;

export default GET_ONE_LOCATION_QUERY;
