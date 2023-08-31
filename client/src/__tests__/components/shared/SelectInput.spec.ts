import { mount } from "@vue/test-utils";
import SelectInput from "@/components/shared/SelectInput.vue";

describe("SelectInput", () => {
  it("binds modelValue prop to select value", async () => {
    const initialModelValue = "2";
    const wrapper = mount(SelectInput, {
      props: {
        modelValue: initialModelValue,
        options: [
          { id: "1", name: "Option 1" },
          { id: "2", name: "Option 2" },
        ],
      },
    });

    expect(wrapper.find("select").element.value).toBe(initialModelValue);
  });

  it("emits update:modelValue event on input change", async () => {
    const wrapper = mount(SelectInput, {
      props: {
        modelValue: "",
        options: [{ id: "1", name: "Option 1" }],
      },
    });

    const selectElement = wrapper.find("select");
    await selectElement.setValue("1");

    const emittedValue = wrapper.emitted("update:modelValue");
    expect(emittedValue).toBeTruthy();
    if (emittedValue) {
      expect(emittedValue[0]).toEqual(["1"]);
    }
  });

  it("renders options based on the provided options prop", () => {
    const options = [
      { id: "1", name: "Option 1" },
      { id: "2", name: "Option 2" },
    ];

    const wrapper = mount(SelectInput, {
      props: {
        modelValue: "",
        options,
      },
    });

    const optionElements = wrapper.findAll("option");
    expect(optionElements.length).toBe(options.length + 1);
  });

  it("emits the correct value when selecting an option", async () => {
    const options = [
      { id: "1", name: "Option 1" },
      { id: "2", name: "Option 2" },
    ];

    const wrapper = mount(SelectInput, {
      props: {
        modelValue: "",
        options,
      },
    });

    const selectElement = wrapper.find("select");

    await selectElement.setValue("2");

    const emittedValue = wrapper.emitted("update:modelValue");
    expect(emittedValue).toBeTruthy();
    if (emittedValue) {
      expect(emittedValue[0]).toEqual(["2"]);
    }
  });
});
