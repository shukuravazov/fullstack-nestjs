import { mount } from "@vue/test-utils";
import LocationListItem from "@/components/locations/LocationListItem.vue";

describe("LocationListItem", () => {
  it("displays location data correctly", async () => {
    const locationData = {
      name: "Test Location",
      address: "123 Test Street",
    };

    const wrapper = mount(LocationListItem, {
      props: {
        locationData: locationData,
        handleRemoveLocation: jest.fn(),
        openUpdateComponent: jest.fn(),
      },
    });

    expect(wrapper.find("th").text()).toBe(locationData.name);
    expect(wrapper.find("td:nth-child(2)").text()).toBe(locationData.address);
  });

  it("calls openUpdateComponent when update button is clicked", async () => {
    const locationData = {
      id: 1,
      name: "Test Location",
      address: "123 Test Street",
    };

    const openUpdateComponentMock = jest.fn();

    const wrapper = mount(LocationListItem, {
      props: {
        locationData: locationData,
        handleRemoveLocation: jest.fn(),
        openUpdateComponent: openUpdateComponentMock,
      },
    });

    await wrapper.find(".btn-primary").trigger("click");

    expect(openUpdateComponentMock).toHaveBeenCalledWith(locationData.id);
  });

  it("calls handleRemoveLocation when delete button is clicked", async () => {
    const locationData = {
      id: 1,
      name: "Test Location",
      address: "123 Test Street",
    };

    const handleRemoveLocationMock = jest.fn();

    const wrapper = mount(LocationListItem, {
      props: {
        locationData: locationData,
        handleRemoveLocation: handleRemoveLocationMock,
        openUpdateComponent: jest.fn(),
      },
    });

    await wrapper.find(".btn-danger").trigger("click");

    expect(handleRemoveLocationMock).toHaveBeenCalledWith(locationData.id);
  });
});
