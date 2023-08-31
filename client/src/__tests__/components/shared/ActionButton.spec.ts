import { mount } from "@vue/test-utils";
import ActionButton from "@/components/shared/ActionButton.vue";

describe("ActionButton", () => {
  it("renders correctly", () => {
    const wrapper = mount(ActionButton, {
      props: {
        onClick: jest.fn(),
        classProp: "btn-primary",
      },
    });

    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("renders default slot content", () => {
    const defaultSlotContent = "Submit"; 
    const wrapper = mount(ActionButton, {
      props: {
        onClick: jest.fn(),
        classProp: "btn-primary",
      },
    });

    expect(wrapper.find("button").text()).toBe(defaultSlotContent);
  });

  it("renders slot content", () => {
    const slotContent = "Save changes";
    const wrapper = mount(ActionButton, {
      props: {
        onClick: jest.fn(),
        classProp: "btn-primary",
      },
      slots: {
        default: slotContent,
      },
    });

    expect(wrapper.find("button").text()).toBe(slotContent);
  });

  it("calls onClick when clicked", async () => {
    const onClick = jest.fn();
    const wrapper = mount(ActionButton, {
      props: {
        onClick,
        classProp: "btn-primary",
      },
    });

    await wrapper.find("button").trigger("click");

    expect(onClick).toHaveBeenCalled();
  });

  it("renders with btn-primary class", () => {
    const classProp = "btn-primary";
    const wrapper = mount(ActionButton, {
      props: {
        onClick: jest.fn(),
        classProp,
      },
    });

    expect(wrapper.find("button").classes()).toContain(classProp);
  });

  it("renders with btn-secondary class", () => {
    const classProp = "btn-secondary";
    const wrapper = mount(ActionButton, {
      props: {
        onClick: jest.fn(),
        classProp,
      },
    });

    expect(wrapper.find("button").classes()).toContain(classProp);
  });
});
