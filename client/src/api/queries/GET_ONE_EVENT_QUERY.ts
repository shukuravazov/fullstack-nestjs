import gql from "graphql-tag";

const GET_ONE_EVENT_QUERY = gql`
  query GetEvent($id: Float!) {
    getOneEvent(id: $id) {
      id
      name
      startDate
      endDate
      description
      location {
        id
        name
        address
      }
    }
  }
`;

export default GET_ONE_EVENT_QUERY;
