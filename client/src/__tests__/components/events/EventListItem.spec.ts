import { mount } from "@vue/test-utils";
import EventListItem from "@/components/events/EventListItem.vue";
import formatDate from "@/utils/dateUtils";

describe("EventListItem", () => {
  it("displays event data correctly", async () => {
    const eventData = {
      name: "Test Event",
      description: "This is a test event",
      startDate: "2023-08-30T15:00:00Z",
      endDate: "2023-08-30T17:00:00Z",
      location: {
        name: "Test Location",
      },
    };

    const wrapper = mount(EventListItem, {
      props: {
        eventData: eventData,
        handleRemoveEvent: jest.fn(),
        openUpdateComponent: jest.fn(),
      },
    });

    await wrapper.vm.$nextTick(); // Wait for component to update/render

    expect(wrapper.find("th").text()).toBe(eventData.name);
    expect(wrapper.find("td:nth-child(2)").text()).toBe(eventData.description);

    expect(wrapper.find("td:nth-child(3)").text()).toBe(
      formatDate(eventData.startDate)
    );

    expect(wrapper.find("td:nth-child(4)").text()).toBe(
      formatDate(eventData.endDate)
    );

    expect(wrapper.find("td:nth-child(5)").text()).toBe(
      eventData.location.name
    );
  });

  it("opens update component when update button is clicked", async () => {
    const eventData = {
      id: 1,
      name: "Test Event",
      description: "This is a test event",
      startDate: "2023-08-30T15:00:00Z",
      endDate: "2023-08-30T17:00:00Z",
      location: {
        name: "Test Location",
      },
    };

    const openUpdateComponentMock = jest.fn();

    const wrapper = mount(EventListItem, {
      props: {
        eventData: eventData,
        handleRemoveEvent: jest.fn(),
        openUpdateComponent: openUpdateComponentMock,
      },
    });

    await wrapper.find(".btn-primary").trigger("click");

    expect(openUpdateComponentMock).toHaveBeenCalledWith(eventData.id);
  });

  it("calls handleRemoveEvent when delete button is clicked", async () => {
    const eventData = {
      id: 1,
      name: "Test Event",
      description: "This is a test event",
      startDate: "2023-08-30T15:00:00Z",
      endDate: "2023-08-30T17:00:00Z",
      location: {
        name: "Test Location",
      },
    };

    const handleRemoveEventMock = jest.fn();

    const wrapper = mount(EventListItem, {
      props: {
        eventData: eventData,
        handleRemoveEvent: handleRemoveEventMock,
        openUpdateComponent: jest.fn(),
      },
    });

    await wrapper.find(".btn-danger").trigger("click");

    expect(handleRemoveEventMock).toHaveBeenCalledWith(eventData.id);
  });
});
