import { mount } from "@vue/test-utils";
import HomePage from "@/pages/HomePage.vue"; // Make sure to use the correct path

jest.mock("@/components/events/EventForm.vue", () => ({
  __esModule: true,
  default: {
    name: "EventForm",
  },
}));

jest.mock("@/components/events/EventList.vue", () => ({
  __esModule: true,
  default: {
    name: "EventList",
  },
}));

jest.mock("@/components/locations/LocationForm.vue", () => ({
  __esModule: true,
  default: {
    name: "LocationForm",
  },
}));

jest.mock("@/components/locations/LocationList.vue", () => ({
  __esModule: true,
  default: {
    name: "LocationList",
  },
}));

describe("HomePage", () => {
  it("renders without errors", () => {
    const wrapper = mount(HomePage);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders the home page components", () => {
    const wrapper = mount(HomePage);

    expect(wrapper.findComponent({ name: "EventForm" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "EventList" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "LocationForm" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "LocationList" }).exists()).toBe(true);
  });

  it("renders EventList and LocationList components", () => {
    const wrapper = mount(HomePage);
    const eventListComponent = wrapper.findComponent({ name: "EventList" });
    const locationListComponent = wrapper.findComponent({
      name: "LocationList",
    });
    expect(eventListComponent.exists()).toBe(true);
    expect(locationListComponent.exists()).toBe(true);
  });

  it("renders EventForm and LocationForm components", () => {
    const wrapper = mount(HomePage);
    const eventFormComponent = wrapper.findComponent({ name: "EventForm" });
    const locationFormComponent = wrapper.findComponent({
      name: "LocationForm",
    });
    expect(eventFormComponent.exists()).toBe(true);
    expect(locationFormComponent.exists()).toBe(true);
  });

  it("renders EventList and LocationList components within list container", () => {
    const wrapper = mount(HomePage);
    const listContainer = wrapper.find(".list-container");
    const eventListComponent = wrapper.findComponent({ name: "EventList" });
    const locationListComponent = wrapper.findComponent({
      name: "LocationList",
    });
    expect(eventListComponent.element.parentElement).toBe(
      listContainer.element
    );
    expect(locationListComponent.element.parentElement).toBe(
      listContainer.element
    );
  });

  it("renders EventForm and LocationForm components within form container", () => {
    const wrapper = mount(HomePage);
    const formContainer = wrapper.find(".form-container");
    const eventFormComponent = wrapper.findComponent({ name: "EventForm" });
    const locationFormComponent = wrapper.findComponent({
      name: "LocationForm",
    });
    expect(eventFormComponent.element.parentElement).toBe(
      formContainer.element
    );
    expect(locationFormComponent.element.parentElement).toBe(
      formContainer.element
    );
  });
});
