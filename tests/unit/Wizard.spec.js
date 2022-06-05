import { mount } from "@vue/test-utils";
import Wizard from "@/components/Wizard.vue";

const mountWizard = (steps, message, currentStep) => {
  return mount(Wizard, {
    props: {
      steps
    },
    data() {
      return {
        currentStepIndex: currentStep ?? 0
      };
    },
    stubs: {
      MainComponent: "<span>Main Component</span>",
      SideComponent: "<span>Side Component</span>"
    },
    global: {
      mocks: {
        $t: () => message
      }
    }
  });
};
const step = (code, split, valid) => {
  const step = {
    code: code ?? 1,
    mainComponent: "MainComponent",
    validator: () => (valid ? [] : [{}])
  };

  if (split) {
    step.sideComponent = "SideComponent";
  }

  return step;
};

describe("Wizard.vue", () => {
  it("Should have no button when only one step", () => {
    const wrapper = mountWizard([step()]);

    const button = wrapper.find("button");

    expect(button.exists()).toBeFalsy();
  });

  it("Should have start button in first step when not split", () => {
    const wrapper = mountWizard([step(1), step(2)], "Start");

    const startButton = wrapper.get("button");

    expect(startButton.text()).toEqual("Start");
  });

  it("Should have only one button in first step when split", () => {
    const wrapper = mountWizard([step(1, true), step(2)]);

    const buttons = wrapper.findAll("button");

    expect(buttons.length).toEqual(1);
  });

  it("Should have disabled button in first step if invalid and not split", () => {
    const wrapper = mountWizard([step(1, false, false), step(2)]);

    const button = wrapper.get("button");

    expect(button.isDisabled()).toBeTruthy();
  });

  it("Should have disabled next button in first step if invalid and split", () => {
    const wrapper = mountWizard([step(1, true, false), step(2)]);

    const button = wrapper.get("button");

    expect(button.isDisabled()).toBeTruthy();
  });

  it("Should have enabled button in first step if valid and not split", () => {
    const wrapper = mountWizard([step(1, false, true), step(2)]);

    const button = wrapper.get("button");

    expect(button.isDisabled()).toBeFalsy();
  });

  it("Should have enabled next button in first step if valid and split", () => {
    const wrapper = mountWizard([step(1, true, true), step(2)]);

    const button = wrapper.get("button");

    expect(button.isDisabled()).toBeFalsy();
  });

  it("Should have two buttons in in-between steps when not split", () => {
    const wrapper = mountWizard([step(1), step(2), step(3)], null, 1);

    const buttons = wrapper.findAll("button");

    expect(buttons.length).toEqual(2);
  });

  it("Should have two buttons in in-between steps when split", () => {
    const wrapper = mountWizard([step(1), step(2, true), step(3)], null, 1);

    const buttons = wrapper.findAll("button");

    expect(buttons.length).toEqual(2);
  });

  it("Should have no buttons in last step when not split", () => {
    const wrapper = mountWizard([step(1), step(2)], null, 1);

    const button = wrapper.find("button");

    expect(button.exists()).toBeFalsy();
  });

  it("Should have no buttons in last step when split", () => {
    const wrapper = mountWizard([step(1), step(2, true)], null, 1);

    const button = wrapper.find("button");

    expect(button.exists()).toBeFalsy();
  });

  it("Should have disabled next button in in-between step when invalid and not split", () => {
    const wrapper = mountWizard([step(1), step(2), step(3)], null, 1);

    const button = wrapper.get("[data-test='next-button']");

    expect(button.isDisabled()).toBeTruthy();
  });

  it("Should have enabled next button in in-between step when invalid and not split", () => {
    const wrapper = mountWizard([step(1), step(2, false, true), step(3)], null, 1);

    const button = wrapper.get("[data-test='next-button']");

    expect(button.isDisabled()).toBeFalsy();
  });

  it("Should have disabled next button in in-between step when invalid and split", () => {
    const wrapper = mountWizard([step(1), step(2, true), step(3)], null, 1);

    const button = wrapper.get("[data-test='next-button']");

    expect(button.isDisabled()).toBeTruthy();
  });

  it("Should have enabled next button in in-between step when invalid and split", () => {
    const wrapper = mountWizard([step(1), step(2, true, true), step(3)], null, 1);

    const button = wrapper.get("[data-test='next-button']");

    expect(button.isDisabled()).toBeFalsy();
  });
});
