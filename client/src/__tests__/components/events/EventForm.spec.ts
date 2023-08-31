import { mount } from "@vue/test-utils";
import EventForm from "@/components/events/EventForm.vue";
import { useMutation } from "@vue/apollo-composable";

jest.mock("@vue/apollo-composable", () => ({
  __esModule: true,
  useMutation: jest.fn(),
}));

describe("EventForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("initializes with empty form fields", async () => {
    const mockedUseMutation = useMutation as jest.Mock;
    mockedUseMutation.mockReturnValue({
      mutate: jest.fn(),
    });

    const wrapper = mount(EventForm);

    expect(wrapper.vm.eventTitle).toBe("");
    expect(wrapper.vm.eventDescription).toBe("");
    expect(wrapper.vm.eventStartDate).toBe("");
    expect(wrapper.vm.eventEndDate).toBe("");
    expect(wrapper.vm.eventLocationId).toBe("");
  });

  it("displays location options correctly", async () => {
    const mockedUseMutation = useMutation as jest.Mock;
    mockedUseMutation.mockReturnValue({
      mutate: jest.fn(),
    });

    const mockLocations = [
      { id: 1, name: "Location 1" },
      { id: 2, name: "Location 2" },
    ];

    const wrapper = mount(EventForm, {
      global: {
        mocks: {
          useLocationSocketHandlers: () => ({
            locations: mockLocations,
            initializeLocationHandlers: jest.fn(),
          }),
        },
      },
    });

    await wrapper.vm.$nextTick();

    const selectInput = wrapper.findComponent({ name: "SelectInput" });

    expect(selectInput.exists()).toBe(true);

    const options: Array<{ value: string; text: string }> =
      selectInput.props("options");

    options.forEach((option, index) => {
      expect(option.value).toBe(mockLocations[index].id.toString());
      expect(option.text).toBe(mockLocations[index].name);
    });
  });
});
