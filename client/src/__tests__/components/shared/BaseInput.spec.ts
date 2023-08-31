import { mount } from "@vue/test-utils";
import BaseInput from "@/components/shared/BaseInput.vue";

describe("BaseInput", () => {
  it("renders correctly", () => {
    const label = "Username";
    const modelValue = "test";
    const wrapper = mount(BaseInput, {
      props: {
        label,
        modelValue,
      },
    });

    expect(wrapper.find("input").exists()).toBe(true);
    expect(wrapper.find("label").text()).toBe(label);
    expect(wrapper.find("input").element.value).toBe(modelValue);
  });

  it("displays default value", () => {
    const wrapper = mount(BaseInput);

    expect(wrapper.find("input").element.value).toBe("");
  });

  it("emits 'update:modelValue' event when input changes", async () => {
    const modelValue = "test";
    const updatedValue = "updated";
    const wrapper = mount(BaseInput, {
      props: {
        modelValue,
      },
    });

    await wrapper.find("input").setValue(updatedValue);

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    const emittedEvent = wrapper.emitted("update:modelValue");
    if (emittedEvent) {
      expect(emittedEvent[0]).toEqual([updatedValue]);
    } else {
      fail("Event 'update:modelValue' was not emitted.");
    }
  });

  it("applies attributes from v-bind", () => {
    const label = "Username";
    const placeholder = "Enter your username";
    const wrapper = mount(BaseInput, {
      props: {
        label,
        modelValue: "",
      },
      attrs: {
        placeholder,
      },
    });

    expect(wrapper.find("input").attributes("placeholder")).toBe(placeholder);
  });

  it("handles input change correctly", () => {
    const wrapper = mount(BaseInput, {
      props: {
        label: "Name",
        modelValue: "",
      },
    });

    const input = wrapper.find("input");
    const newValue = "John Doe";

    input.setValue(newValue);

    expect(input.element.value).toBe(newValue);
  });
});
