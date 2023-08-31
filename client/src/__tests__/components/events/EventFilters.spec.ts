import { mount } from "@vue/test-utils";
import EventFilters from "@/components/events/EventFilters.vue";
import BaseInput from "@/components/shared/BaseInput.vue";
import SelectInput from "@/components/shared/SelectInput.vue";
import OptionItem from "@/interfaces/OptionItem";

describe("EventFilters", () => {
  it("renders BaseInput components for start and end dates", () => {
    const wrapper = mount(EventFilters, {
      props: {
        locations: [],
      },
    });

    expect(wrapper.findAllComponents(BaseInput)).toHaveLength(2);
  });

  it("renders SelectInput component for location filter", () => {
    const wrapper = mount(EventFilters, {
      props: {
        locations: [],
      },
    });

    expect(wrapper.findComponent(SelectInput).exists()).toBe(true);
  });

  it("calls applyFilters method when Filter button is clicked", async () => {
    const applyFilters = jest.fn();
    const wrapper = mount(EventFilters, {
      props: {
        locations: [],
      },
      global: {
        mocks: {
          applyFilters,
        },
      },
    });

    await wrapper.find(".btn-outline-primary").trigger("click");

    expect(applyFilters).toHaveBeenCalled();
  });

  it("calls clearFilters method when Clear button is clicked", async () => {
    const clearFilters = jest.fn();
    const wrapper = mount(EventFilters, {
      props: {
        locations: [],
      },
      global: {
        mocks: {
          clearFilters,
        },
      },
    });

    await wrapper.find(".btn-outline-secondary").trigger("click");

    expect(clearFilters).toHaveBeenCalled();
  });

  it("displays correct text on Filter button", () => {
    const wrapper = mount(EventFilters, {
      props: {
        locations: [],
      },
    });

    const filterButton = wrapper.find(".btn-outline-primary");
    expect(filterButton.text()).toBe("Filter");
  });

  it("displays correct text on Clear button", () => {
    const wrapper = mount(EventFilters, {
      props: {
        locations: [],
      },
    });

    const clearButton = wrapper.find(".btn-outline-secondary");
    expect(clearButton.text()).toBe("Clear");
  });

  it("passes locations prop to SelectInput component", () => {
    const locations = [{ id: "1", name: "Location 1" }];
    const wrapper = mount(EventFilters, {
      props: {
        locations,
      },
    });

    const selectInput = wrapper.findComponent(SelectInput);
    expect(selectInput.props("options")).toEqual(locations);
  });

  it("updates SelectInput component when locations prop changes", async () => {
    const initialLocations: OptionItem[] = [];
    const updatedLocations = [{ id: "1", name: "Updated Location" }];
    const wrapper = mount(EventFilters, {
      props: {
        locations: initialLocations,
      },
    });

    await wrapper.setProps({ locations: updatedLocations });

    const selectInput = wrapper.findComponent(SelectInput);
    expect(selectInput.props("options")).toEqual(updatedLocations);
  });

  it("calls applyFilters method multiple times when Filter button is clicked multiple times", async () => {
    const applyFilters = jest.fn();
    const wrapper = mount(EventFilters, {
      props: {
        locations: [],
      },
      global: {
        mocks: {
          applyFilters,
        },
      },
    });

    await wrapper.find(".btn-outline-primary").trigger("click");
    await wrapper.find(".btn-outline-primary").trigger("click");

    expect(applyFilters).toHaveBeenCalledTimes(2);
  });

  it("calls clearFilters method multiple times when Clear button is clicked multiple times", async () => {
    const clearFilters = jest.fn();
    const wrapper = mount(EventFilters, {
      props: {
        locations: [],
      },
      global: {
        mocks: {
          clearFilters,
        },
      },
    });

    await wrapper.find(".btn-outline-secondary").trigger("click");
    await wrapper.find(".btn-outline-secondary").trigger("click");

    expect(clearFilters).toHaveBeenCalledTimes(2);
  });
});
