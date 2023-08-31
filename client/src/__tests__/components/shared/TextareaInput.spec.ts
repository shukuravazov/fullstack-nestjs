import { mount } from "@vue/test-utils";
import TextareaInput from "@/components/shared/TextareaInput.vue";

describe("TextArea", () => {
  it("renders the provided label as the textarea label", () => {
    const label = "Description";
    const wrapper = mount(TextareaInput, {
      props: {
        label: label,
        modelValue: "",
      },
    });

    const labelElement = wrapper.find("label");
    expect(labelElement.text()).toBe(label);
  });

  it("emits update:modelValue event when textarea value changes", async () => {
    const wrapper = mount(TextareaInput, {
      props: {
        label: "Description",
        modelValue: "",
      },
    });

    const textareaElement = wrapper.find("textarea");

    await textareaElement.setValue("New description");

    const emittedEvents = wrapper.emitted("update:modelValue");
    expect(emittedEvents).toBeTruthy();
    expect(emittedEvents?.[0]).toEqual(["New description"]);
  });

  it("binds the provided modelValue prop to the textarea value", async () => {
    const initialValue = "Initial value";
    const wrapper = mount(TextareaInput, {
      props: {
        label: "Description",
        modelValue: initialValue,
      },
    });

    const textareaElement = wrapper.find("textarea");

    expect(textareaElement.element.value).toBe(initialValue);

    await textareaElement.setValue("Updated value");

    const emittedEvents = wrapper.emitted("update:modelValue");
    expect(emittedEvents).toBeTruthy();
    expect(emittedEvents?.[0]).toEqual(["Updated value"]);
  });

  it("updates textarea content when modelValue prop changes", async () => {
    const wrapper = mount(TextareaInput, {
      props: {
        label: "Description",
        modelValue: "",
      },
    });

    const textareaElement = wrapper.find("textarea");

    await wrapper.setProps({ modelValue: "New content" });

    expect(textareaElement.element.value).toBe("New content");
  });

  it("updates label content when label prop changes", async () => {
    const wrapper = mount(TextareaInput, {
      props: {
        label: "Description",
        modelValue: "",
      },
    });

    const labelElement = wrapper.find("label");

    await wrapper.setProps({ label: "New Label" });

    expect(labelElement.text()).toBe("New Label");
  });
});
