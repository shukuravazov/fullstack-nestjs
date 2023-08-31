import { mount } from "@vue/test-utils";
import { useMutation } from "@vue/apollo-composable";
import LocationForm from "@/components/locations/LocationForm.vue";

jest.mock("@vue/apollo-composable", () => ({
  __esModule: true,
  useMutation: jest.fn(),
}));

describe("LocationForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("initializes with empty form fields", async () => {
    const mockedUseMutation = useMutation as jest.Mock;
    mockedUseMutation.mockReturnValue({
      mutate: jest.fn(),
    });

    const wrapper = mount(LocationForm);

    expect(wrapper.vm.title).toBe("");
    expect(wrapper.vm.address).toBe("");
  });
});
