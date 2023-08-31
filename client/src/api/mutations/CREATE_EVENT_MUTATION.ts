import gql from "graphql-tag";

const CREATE_EVENT_MUTATION = gql`
  mutation CreateEvent($createEventInput: CreateEventInput!) {
    createEvent(createEvent: $createEventInput) {
      id
      name
      startDate
      endDate
      description
      createdAt
      updatedAt
      location {
        id
        name
      }
    }
  }
`;

export default CREATE_EVENT_MUTATION;
