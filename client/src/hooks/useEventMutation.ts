import { useMutation } from "@vue/apollo-composable";
import CREATE_EVENT_MUTATION from "@/api/mutations/CREATE_EVENT_MUTATION";
import UPDATE_EVENT_MUTATION from "@/api/mutations/UPDATE_EVENT_MUTATION";
import REMOVE_EVENT_MUTATION from "@/api/mutations/REMOVE_EVENT_MUTATION";

function useEventMutation() {
  const { mutate: createEvent } = useMutation(CREATE_EVENT_MUTATION);
  const { mutate: updateEvent } = useMutation(UPDATE_EVENT_MUTATION);
  const { mutate: removeEvent } = useMutation(REMOVE_EVENT_MUTATION);

  return {
    createEvent,
    updateEvent,
    removeEvent,
  };
}

export default useEventMutation;
