import gql from "graphql-tag";

const UPDATE_EVENT_MUTATION = gql`
  mutation updateEvent($event: UpdateEventInput!) {
    updateEvent(updateEvent: $event) {
      id
      name
      description
      startDate
      endDate
    }
  }
`;

export default UPDATE_EVENT_MUTATION;
