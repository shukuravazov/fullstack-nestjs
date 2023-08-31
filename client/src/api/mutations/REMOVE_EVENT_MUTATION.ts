import gql from "graphql-tag";

const REMOVE_EVENT_MUTATION = gql`
  mutation RemoveEvent($id: Float!) {
    removeEvent(id: $id)
  }
`;

export default REMOVE_EVENT_MUTATION;
