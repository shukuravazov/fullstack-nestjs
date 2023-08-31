import { mount } from "@vue/test-utils";
import BaseButton from "@/components/shared/BaseButton.vue";

describe("BaseButton", () => {
  it("renders correctly", () => {
    const classProp = "btn-primary";
    const wrapper = mount(BaseButton, {
      props: {
        classProp,
      },
    });

    expect(wrapper.find("button").exists()).toBe(true);
    expect(wrapper.text()).toBe("Submit");
  });

  it("renders default slot content", () => {
    const defaultSlotContent = "Submit";
    const wrapper = mount(BaseButton, {
      props: {
        classProp: "btn-primary",
      },
    });

    expect(wrapper.find("button").text()).toBe(defaultSlotContent);
  });

  it("renders slot content", () => {
    const slotContent = "Click Me";
    const wrapper = mount(BaseButton, {
      props: {
        classProp: "btn-primary",
      },
      slots: {
        default: slotContent,
      },
    });

    expect(wrapper.find("button").text()).toBe(slotContent);
  });

  it("renders with btn-primary class", () => {
    const classProp = "btn-primary";
    const wrapper = mount(BaseButton, {
      props: {
        classProp,
      },
    });

    expect(wrapper.find("button").classes()).toContain(classProp);
  });

  it("renders with btn-secondary class", () => {
    const classProp = "btn-secondary";
    const wrapper = mount(BaseButton, {
      props: {
        classProp,
      },
    });

    expect(wrapper.find("button").classes()).toContain(classProp);
  });

  it("emits click event when clicked", async () => {
    const wrapper = mount(BaseButton, {
      props: {
        classProp: "btn-primary",
      },
    });

    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted("click")).toBeTruthy();
  });
});
