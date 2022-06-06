import { mount } from "@vue/test-utils";
import Wizard from "@/components/Wizard.vue";
import StepIndicator from "@/components/StepIndicator.vue";

const mountWizard = (steps, message, currentStep) => {
  return mount(Wizard, {
    props: {
      steps,
      step: currentStep?.toString() ?? null
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
    code: code?.toString() ?? "1",
    mainComponent: "MainComponent",
    validator: () => (valid ? [] : [{}])
  };

  if (split) {
    step.sideComponent = "SideComponent";
  }

  return step;
};
const validStep = (code) => step(code, false, true);
const invalidStep = (code) => step(code);

const expectToHaveCommitted = (wrapper) => {
  expect(wrapper.emitted("commit:step")).toBeTruthy();
  expect(wrapper.emitted("rollback:step")).toBeFalsy();
};

const expectToHaveRolledBack = (wrapper) => {
  expect(wrapper.emitted("commit:step")).toBeFalsy();
  expect(wrapper.emitted("rollback:step")).toBeTruthy();
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

  it("Should have only one button in first step", () => {
    const wrapper = mountWizard([step(1), step(2)]);

    const buttons = wrapper.findAll("button");

    expect(buttons.length).toEqual(1);
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
    const wrapper = mountWizard([step(1), step(2), step(3)], null, 2);

    const buttons = wrapper.findAll("button");

    expect(buttons.length).toEqual(2);
  });

  it("Should have two buttons in in-between steps when split", () => {
    const wrapper = mountWizard([step(1), step(2, true), step(3)], null, 2);

    const buttons = wrapper.findAll("button");

    expect(buttons.length).toEqual(2);
  });

  it("Should have no buttons in last step when not split", () => {
    const wrapper = mountWizard([step(1), step(2)], null, 2);

    const button = wrapper.find("button");

    expect(button.exists()).toBeFalsy();
  });

  it("Should have no buttons in last step when split", () => {
    const wrapper = mountWizard([step(1), step(2, true)], null, 2);

    const button = wrapper.find("button");

    expect(button.exists()).toBeFalsy();
  });

  it("Should have disabled next button in in-between step when invalid and not split", () => {
    const wrapper = mountWizard([step(1), step(2), step(3)], null, 2);

    const button = wrapper.get("[data-test='next-button']");

    expect(button.isDisabled()).toBeTruthy();
  });

  it("Should have enabled next button in in-between step when invalid and not split", () => {
    const wrapper = mountWizard([step(1), step(2, false, true), step(3)], null, 2);

    const button = wrapper.get("[data-test='next-button']");

    expect(button.isDisabled()).toBeFalsy();
  });

  it("Should have disabled next button in in-between step when invalid and split", () => {
    const wrapper = mountWizard([step(1), step(2, true), step(3)], null, 2);

    const button = wrapper.get("[data-test='next-button']");

    expect(button.isDisabled()).toBeTruthy();
  });

  it("Should have enabled next button in in-between step when valid and split", () => {
    const wrapper = mountWizard([step(1), step(2, true, true), step(3)], null, 2);

    const button = wrapper.get("[data-test='next-button']");

    expect(button.isDisabled()).toBeFalsy();
  });

  it("Should not contain Step Indicator when not split", () => {
    const wrapper = mountWizard([step(1)]);

    const stepIndicator = wrapper.findComponent(StepIndicator);

    expect(stepIndicator.exists()).toBeFalsy();
  });

  it("Should contain Step Indicator when split", () => {
    const wrapper = mountWizard([step(1, true)]);

    const stepIndicator = wrapper.findComponent(StepIndicator);

    expect(stepIndicator.exists()).toBeTruthy();
  });

  it("Should commit first step when invalid step code is passed", () => {
    const wrapper = mountWizard([step(1), step(2)], null, "invalidCode");
    const { code } = wrapper.emitted("commit:step")[0][0];

    expect(code).toEqual("1");
  });

  it("Should commit step when only one step is present", () => {
    const wrapper = mountWizard([step(1)], null, 1);

    expectToHaveCommitted(wrapper);
  });

  it("Should commit step when all prior steps are valid", () => {
    const wrapper = mountWizard([validStep(1), validStep(2), validStep(3)], null, 3);

    expectToHaveCommitted(wrapper);
  });

  it("Should commit step when all prior steps are valid but current is invalid", () => {
    const wrapper = mountWizard([validStep(1), validStep(2), invalidStep(3)], null, 3);

    expectToHaveCommitted(wrapper);
  });

  it("Should rollback step when at least one prior step is invalid", () => {
    const wrapper = mountWizard([validStep(1), invalidStep(2), validStep(3), validStep(4)], null, 4);

    expectToHaveRolledBack(wrapper);
  });

  it("Should rollback to first invalid prior step when at least one prior step is invalid", () => {
    const wrapper = mountWizard([validStep(1), invalidStep(2), validStep(3), validStep(4)], null, 4);
    const { code } = wrapper.emitted("rollback:step")[0][0];

    expect(code).toEqual("2");
  });
});
