export const base_url = window.location.origin;
export const paddingLeft = 363;
export const paddingTop = 73;
export const paddingX = 20;
export const paddingY = 0;
export const cardWidth = 318;
export const cardHeight = 122

export const CardList_Triggers = [
    {
        id: 1, 
        name: "Time elapsed", 
        desc: "Trigger care process at a set time after an event.", 
        lefticon: `${base_url}/assets/time_elapsed.svg`, 
        selectType: '', 
        targetResource: '', 
    }, 
    {
        id: 2, 
        name: "New patient", 
        desc: "Trigger care process when a new patient is created.", 
        lefticon: `${base_url}/assets/new_patient_info.svg`, 
        selectType: '', 
        targetResource: '', 
    }, 
    {
        id: 3, 
        name: "New action", 
        desc: "Trigger care process when a new action is performed.", 
        lefticon: `${base_url}/assets/new_action.svg`, 
        selectType: '', 
        targetResource: '', 
    }, 
    {
        id: 4, 
        name: "New Data", 
        desc: "Trigger care process when new data is recorded.", 
        lefticon: `${base_url}/assets/new_data.svg`, 
        selectType: '', 
        targetResource: '', 
    }
];

export const CardList_Actions = [
    {
        id: 5, 
        name: "Elicit", 
        desc: "Elicit a set of clinical findings from a patient.", 
        lefticon: `${base_url}/assets/elicit.svg`, 
        selectType: 'multi', 
        targetResource: 'findings', 
    }, 
    {
        id: 6, 
        name: "Prescribe", 
        desc: "Prescribe one or more medications.", 
        lefticon: `${base_url}/assets/prescribe.svg`, 
        selectType: 'multi', 
        targetResource: 'dosages', 
    }, 
    {
        id: 7, 
        name: "Order", 
        desc: "Order a test for a patient.", 
        lefticon: `${base_url}/assets/order.svg`, 
        selectType: 'multi', 
        targetResource: 'tests', 
    }, 
    {
        id: 8, 
        name: "Record", 
        desc: "Record one or more diagnoses.", 
        lefticon: `${base_url}/assets/record.svg`, 
        selectType: 'multi', 
        targetResource: 'diseases', 
    }, 
    {
        id: 9, 
        name: "Apply", 
        desc: "Apply a guideline recommendation.", 
        lefticon: `${base_url}/assets/apply.svg`, 
        selectType: 'single', 
        targetResource: 'keypoints', 
    }, 
    {
        id: 10, 
        name: "Schedule", 
        desc: "Schedule a follow-up visit.", 
        lefticon: `${base_url}/assets/schedule.svg`, 
        selectType: 'single', 
        targetResource: 'specialties', 
    }, 
    {
        id: 11, 
        name: "Link", 
        desc: "Link to another care bundle.", 
        lefticon: `${base_url}/assets/link.svg`, 
        selectType: 'single', 
        targetResource: 'pathways', 
    }, 
    {
        id: 12, 
        name: "Use", 
        desc: "Use a clinical calculator.", 
        lefticon: `${base_url}/assets/use.svg`, 
        selectType: 'single', 
        targetResource: 'calculators', 
    }, 
    {
        id: 13, 
        name: "Custom", 
        desc: "Write a block with custom text.", 
        lefticon: `${base_url}/assets/custom.svg`, 
        selectType: 'multi', 
        targetResource: 'references', 
    }
];

export const CardList_Structure = [
    {
        id: 14, 
        name: "Start", 
        desc: "Begin care process.", 
        lefticon: `${base_url}/assets/start.svg`, 
        selectType: '', 
        targetResource: '', 
    }, 
    {
        id: 15, 
        name: "Filter", 
        desc: "Continue only if a specific condition is met.", 
        lefticon: `${base_url}/assets/filter.svg`, 
        selectType: '', 
        targetResource: '', 
    }, 
    {
        id: 16, 
        name: "Branch", 
        desc: "Branch on a specific condition.", 
        lefticon: `${base_url}/assets/branch.svg`, 
        selectType: '', 
        targetResource: '', 
    }, 
    {
        id: 17, 
        name: "End", 
        desc: "End care process.", 
        lefticon: `${base_url}/assets/end.svg`, 
        selectType: '', 
        targetResource: '', 
    }
];

export const Right_Card = [
    {
        id: 1, 
        name: "Time elapsed", 
        lefticon: `${base_url}/assets/time_elapsed.svg`, 
        desc: "Trigger care process at a set time after an event.", 
        template: "When ${condition} is met", 
        begin: "", 
        selectedOptions: [], 
        selectedBranches: [], 
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 2, 
        name: "New patient", 
        lefticon: `${base_url}/assets/new_patient_info.svg`, 
        desc: "Trigger care process when a new patient is created.", 
        template: "When a new patient is created", 
        begin: "", 
        selectedOptions: [], 
        selectedBranches: [], 
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 3, 
        name: "New action", 
        lefticon: `${base_url}/assets/new_action.svg`, 
        desc: "Trigger care process when a new action is performed.", 
        template: "When ${condition} is met", 
        begin: "", 
        selectedOptions: [], 
        selectedBranches: [], 
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 4, 
        name: "New data", 
        lefticon: `${base_url}/assets/new_data.svg`, 
        desc: "Trigger care process when new data is recorded.", 
        template: "When ${condition} is met", 
        begin: "", 
        selectedOptions: [], 
        selectedBranches: [], 
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 5, 
        name: "Elicit", 
        lefticon: `${base_url}/assets/elicit.svg`, 
        desc: "Elicit a set of clinical findings from a patient.", 
        template: "${findings}", 
        begin: "Elicit the following findings: ", 
        selectedOptions: [], 
        selectedBranches: [], 
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 6, 
        name: "Prescribe", 
        lefticon: `${base_url}/assets/prescribe.svg`, 
        desc: "Prescribe one or more medications.", 
        template: "${dosages}", 
        begin: "Write the following prescriptions: ", 
        selectedOptions: [], 
        selectedBranches: [], 
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 7, 
        name: "Order", 
        lefticon: `${base_url}/assets/order.svg`, 
        desc: "Order a test for a patient.", 
        template: "${tests}", 
        begin: "Order the following tests: ", 
        selectedOptions: [], 
        selectedBranches: [], 
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 8, 
        name: "Record", 
        lefticon: `${base_url}/assets/record.svg`, 
        desc: "Record one or more diagnoses.", 
        template: "${diseases}", 
        begin: "Record the following diagnoses: ", 
        selectedOptions: [], 
        selectedBranches: [], 
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 9, 
        name: "Apply", 
        lefticon: `${base_url}/assets/apply.svg`, 
        desc: "Apply a guideline recommendation.", 
        template: "${keypoints}",  
        begin: "Apply the following guidelines: ", 
        selectedOptions: [], 
        selectedBranches: [], 
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 10, 
        name: "Schedule", 
        lefticon: `${base_url}/assets/schedule.svg`, 
        desc: "Schedule a follow-up visit.", 
        template: "${visits}", 
        begin: "Schedule the following visits: ", 
        selectedOptions: [], 
        selectedBranches: [], 
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 11, 
        name: "Link", 
        lefticon: `${base_url}/assets/link.svg`, 
        desc: "Link to another care bundle.", 
        template: "${bundle}", 
        begin: "Link to this care bundle: ", 
        selectedOptions: [], 
        selectedBranches: [], 
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 12, 
        name: "Use", 
        lefticon: `${base_url}/assets/use.svg`, 
        desc: "Use a clinical calculator.", 
        template: "${calculator}", 
        begin: "Use this calculator: ", 
        selectedOptions: [], 
        selectedBranches: [], 
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 13, 
        name: "Custom", 
        lefticon: `${base_url}/assets/custom.svg`, 
        desc: "Write a block with custom text.", 
        template: "${references}", 
        begin: "", 
        selectedOptions: [], 
        selectedBranches: [], 
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 14, 
        name: "Start", 
        lefticon: `${base_url}/assets/start.svg`, 
        desc: "Begin care process.", 
        template: "Begin care process", 
        begin: "", 
        selectedOptions: [], 
        selectedBranches: [], 
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 15, 
        name: "Filter", 
        lefticon: `${base_url}/assets/filter.svg`, 
        desc: "Continue only if a specific condition is met.", 
        template: "When ${condition} is met",
        begin: "", 
        selectedOptions: [], 
        selectedBranches: [], 
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 16, 
        name: "Branch", 
        lefticon: `${base_url}/assets/branch.svg`, 
        desc: "Branch on a specific condition.", 
        template: "Branch on ${condition}", 
        begin: "", 
        selectedOptions: [], 
        selectedBranches: [], 
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 17, 
        name: "End", 
        lefticon: `${base_url}/assets/end.svg`, 
        desc: "End care process.", 
        template: "End of care process", 
        begin: "", 
        selectedOptions: [], 
        selectedBranches: [], 
        position: {
            x: 0,
            y: 0
        }
    }
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export function getStyles(name, selectedName, theme) {
  return {
    fontWeight:
    selectedName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export function arrayToString(names) {
    if (!names) return 'No Select';
    let tempString = '';
    for (var i = 0; i < names.length; i ++) {
        tempString += names[i].name;
        if (i === (names.length-1)) break;
        tempString += ',';
    }
    return tempString;
}