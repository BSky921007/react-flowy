import { SelectTypes } from './types.d.ts';

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
        name: "Repeat timer", 
        desc: "Trigger care process at a set recurring period.", 
        lefticon: `${base_url}/assets/time_elapsed.svg`, 
        selectType: 'single', 
        targetResource: 'periods', 
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
        name: "Await result", 
        desc: "Trigger care process when new result is recorded.", 
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
    },
    {
        id: 18, 
        name: "Note", 
        desc: "Add a text field for the user to enter a note.", 
        lefticon: `${base_url}/assets/record.svg`, 
        selectType: '', 
    },
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
        name: "Include", 
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
        name: "Repeat timer", 
        lefticon: `${base_url}/assets/time_elapsed_blue.svg`, 
        desc: "Trigger care process at a set recurring period.", 
        templateTitle: '',
        template: "${period}", 
        begin: 'Every ', 
        isMulti: false, 
        hasSelectInput: true,
        hasTextInput: false,
        selectedOptions: [],
        selectedBranchPoint: [], 
        selectedBranches: [],  
        selectedFilters: [], 
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 2, 
        name: "New patient", 
        lefticon: `${base_url}/assets/new_patient_info_blue.svg`, 
        desc: "Trigger care process when a new patient is created.", 
        templateTitle: '',
        template: "When a new patient is created", 
        begin: "", 
        isMulti: false, 
        hasSelectInput: true,
        hasTextInput: false,
        selectedOptions: [], 
        selectedBranchPoint: [], 
        selectedBranches: [],  
        selectedFilters: [], 
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 3, 
        name: "New action", 
        lefticon: `${base_url}/assets/new_action_blue.svg`, 
        desc: "Trigger care process when a new action is performed.", 
        template: "When ${condition} is met", 
        templateTitle: '', 
        begin: "", 
        isMulti: false,
        hasTextInput: false,
        hasSelectInput: false,
    }, 
    {
        id: 4, 
        name: "Await result", 
        lefticon: `${base_url}/assets/new_data_blue.svg`, 
        desc: "Trigger care process when a new result is available.", 
        templateTitle: '', 
        template: "When ${condition} is met", 
        begin: "", 
        isMulti: false,
        hasTextInput: false,
        hasSelectInput: false,
    }, 
    {
        id: 5, 
        name: "Elicit", 
        lefticon: `${base_url}/assets/elicit_blue.svg`, 
        desc: "Elicit a set of clinical findings from a patient.", 
        templateTitle: 'Select one or more findings:', 
        template: "${findings}", 
        begin: "Elicit the following findings: ", 
        isMulti: true,
        hasTextInput: false,
        hasSelectInput: true,
    }, 
    {
        id: 6, 
        name: "Prescribe", 
        lefticon: `${base_url}/assets/prescribe_blue.svg`, 
        desc: "Prescribe one or more medications.", 
        templateTitle: 'Select one or more dosages:', 
        template: "${dosages}", 
        begin: "Write the following prescriptions: ", 
        isMulti: true,
        hasTextInput: false,
        hasSelectInput: true,
    }, 
    {
        id: 7, 
        name: "Order", 
        lefticon: `${base_url}/assets/order_blue.svg`, 
        desc: "Order a test for a patient.", 
        templateTitle: 'Select one or more tests:', 
        template: "${tests}", 
        begin: "Order the following tests: ", 
        isMulti: true,
        hasTextInput: false,
        hasSelectInput: true,
    }, 
    {
        id: 8, 
        name: "Record", 
        lefticon: `${base_url}/assets/record_blue.svg`, 
        desc: "Record one or more diagnoses.", 
        templateTitle: 'Select one or more diseases:', 
        template: "${diseases}", 
        begin: "Record the following diagnoses: ", 
        isMulti: true,
        hasTextInput: false,
        hasSelectInput: true,
    }, 
    {
        id: 9, 
        name: "Apply", 
        lefticon: `${base_url}/assets/apply_blue.svg`, 
        desc: "Apply a guideline recommendation.", 
        templateTitle: 'Select a keypoint:', 
        template: "${keypoints}",  
        begin: "Apply the following guidelines: ", 
        isMulti: false,
        hasTextInput: false,
        hasSelectInput: true,
    }, 
    {
        id: 10, 
        name: "Schedule", 
        lefticon: `${base_url}/assets/schedule_blue.svg`, 
        desc: "Schedule a follow-up visit.", 
        templateTitle: 'Select a specialty:', 
        template: "${visits}", 
        begin: "Schedule the following visits: ", 
        isMulti: false,
        hasTextInput: false,
        hasSelectInput: true,
    }, 
    {
        id: 11, 
        name: "Link", 
        lefticon: `${base_url}/assets/link_blue.svg`, 
        desc: "Link to another care bundle.", 
        templateTitle: 'Select a pathway:', 
        template: "${bundle}", 
        begin: "Link to this care bundle: ", 
        isMulti: false,
        hasTextInput: false,
        hasSelectInput: true,
    }, 
    {
        id: 12, 
        name: "Use", 
        lefticon: `${base_url}/assets/use_blue.svg`, 
        desc: "Use a clinical calculator.", 
        templateTitle: 'Select a calculator:', 
        template: "${calculator}", 
        begin: "Use this calculator: ", 
        isMulti: false,
        hasTextInput: false,
        hasSelectInput: true,
    }, 
    {
        id: 13, 
        name: "Custom", 
        lefticon: `${base_url}/assets/custom_blue.svg`, 
        desc: "Write a block with custom text.", 
        templateTitle: 'Custom text:', 
        template: "", 
        begin: "", 
        isMulti: true,
        hasTextInput: true,
        hasSelectInput: true,
    }, 
    {
        id: 14, 
        name: "Start", 
        lefticon: `${base_url}/assets/start_blue.svg`, 
        desc: "Begin care process.", 
        templateTitle: '', 
        template: "Begin care process", 
        begin: "", 
        isMulti: false,
        hasTextInput: false,
        hasSelectInput: false,
    }, 
    {
        id: 15, 
        name: "Include", 
        lefticon: `${base_url}/assets/filter_blue.svg`, 
        desc: "Continue only if a specific condition is met.", 
        templateTitle: '', 
        template: "${condition}",
        begin: "If ", 
        isMulti: false,
        hasTextInput: false,
        hasSelectInput: true,
    }, 
    {
        id: 16, 
        name: "Branch", 
        lefticon: `${base_url}/assets/branch_blue.svg`, 
        desc: "Continue only if a specific condition is met. ", 
        templateTitle: '', 
        template: 'Branch on ${expression}', 
        begin: "", 
        isMulti: false,
        hasSelectInput: true,
        hasTextInput: false,
    }, 
    {
        id: 17, 
        name: "End", 
        lefticon: `${base_url}/assets/end_blue.svg`, 
        desc: "End care process.", 
        templateTitle: '', 
        template: "End of care process", 
        begin: "", 
        isMulti: false,
        hasSelectInput: false,
        hasTextInput: false,
    },
    {
        id: 18, 
        name: "Note", 
        desc: "Enter a block with custom text.", 
        lefticon: `${base_url}/assets/custom.svg`, 
        templateTitle: '', 
        template: "", 
        begin: "Text input will be placed here: ",
        selectType: '', 
        targetResource: '', 
        isMulti: false,
        hasTextInput: true,
        hasSelectInput: false,
    },
];

export const Filter_Conditions = [
    {
        'id': '1', 
        'name': 'and', 
    }, 
    {
        'id': '2', 
        'name': 'or', 
    }
];

export const Filter_Names = [
    {
        'id': '1', 
        'name': 'age', 
        'type': 'number', 
    }, 
    {
        'id': '2', 
        'name': 'sex', 
        'type': 'string', 
    }, 
    {
        'id': '3', 
        'name': 'suspected diagnoses', 
        'type': 'array', 
    }, 
    {
        'id': '4', 
        'name': 'last-follow up', 
        'type': 'datetime', 
    }
];

export const Filter_Age_Filters = [
    {
        'id': '1', 
        'name': '='
    }, 
    {
        'id': '2', 
        'name': '≠'
    }, 
    {
        'id': '3', 
        'name': '<'
    }, 
    {
        'id': '4', 
        'name': '>'
    }, 
    {
        'id': '5', 
        'name': '≤'
    }, 
    {
        'id': '6', 
        'name': '≥'
    }
];

export const Filter_Sex_Filters = [
    {
        'id': '1', 
        'name': 'is...'
    }, 
    {
        'id': '2', 
        'name': 'is not...'
    }, 
    {
        'id': '3', 
        'name': 'is empty'
    }, 
    {
        'id': '4', 
        'name': 'is not empty'
    }, 
];

export const Filter_LastFollowUp_Filters = [
    {
        'id': '1', 
        'name': 'is...'
    }, 
    {
        'id': '2', 
        'name': 'is within...'
    }, 
    {
        'id': '3', 
        'name': 'is before...'
    }, 
    {
        'id': '4', 
        'name': 'is after...'
    }, 
    {
        'id': '5', 
        'name': 'is on or before...'
    }, 
    {
        'id': '6', 
        'name': 'is on or after'
    }
];

export const Filter_PastMedicalHistory_Filters = [
    {
        'id': '1', 
        'name': 'contains...'
    }, 
    {
        'id': '2', 
        'name': 'does not contain...'
    }, 
    {
        'id': '3', 
        'name': 'is empty'
    }, 
    {
        'id': '4', 
        'name': 'is not empty'
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