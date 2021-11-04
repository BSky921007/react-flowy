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
        lefticon: `${base_url}/assets/time.svg`
    }, 
    {
        id: 2, 
        name: "New patient info", 
        desc: "Trigger care process when a new patient is created.", 
        lefticon: `${base_url}/assets/arrow.svg`
    }, 
    {
        id: 3, 
        name: "New action", 
        desc: "Trigger care process when a new action is performed.", 
        lefticon: `${base_url}/assets/dropdown.svg`
    }, 
    {
        id: 4, 
        name: "New Data", 
        desc: "Trigger care process when new data is recorded.", 
        lefticon: `${base_url}/assets/arrow.svg`
    }
];

export const CardList_Actions = [
    {
        id: 5, 
        name: "Elicit", 
        desc: "Elicit a set of clinical findings from a patient.", 
        lefticon: `${base_url}/assets/error.svg`
    }, 
    {
        id: 6, 
        name: "Prescribe", 
        desc: "Prescribe one or more medications.", 
        lefticon: `${base_url}/assets/eye.svg`
    }, 
    {
        id: 7, 
        name: "Order", 
        desc: "Order a test for a patient.", 
        lefticon: `${base_url}/assets/log.svg`
    }, 
    {
        id: 8, 
        name: "Record", 
        desc: "Record one or more diagnoses.", 
        lefticon: `${base_url}/assets/dropdown.svg`
    }, 
    {
        id: 9, 
        name: "Apply", 
        desc: "Apply a guideline recommendation.", 
        lefticon: `${base_url}/assets/error.svg`
    }, 
    {
        id: 10, 
        name: "Schedule", 
        desc: "Schedule a follow-up visit.", 
        lefticon: `${base_url}/assets/eye.svg`
    }, 
    {
        id: 11, 
        name: "Link", 
        desc: "Link to another care bundle.", 
        lefticon: `${base_url}/assets/log.svg`
    }, 
    {
        id: 12, 
        name: "Use", 
        desc: "Use a clinical calculator.", 
        lefticon: `${base_url}/assets/time.svg`
    }, 
    {
        id: 13, 
        name: "Custom", 
        desc: "Write a block with custom text.", 
        lefticon: `${base_url}/assets/time.svg`
    }
];

export const CardList_Structure = [
    {
        id: 14, 
        name: "Start", 
        desc: "Begin care process.", 
        lefticon: `${base_url}/assets/eye.svg`
    }, 
    {
        id: 15, 
        name: "Filter", 
        desc: "Continue only if a specific condition is met.", 
        lefticon: `${base_url}/assets/eye.svg`
    }, 
    {
        id: 16, 
        name: "Branch", 
        desc: "Branch on a specific condition.", 
        lefticon: `${base_url}/assets/log.svg`
    }, 
    {
        id: 17, 
        name: "End", 
        desc: "End care process.", 
        lefticon: `${base_url}/assets/time.svg`
    }
];

export const Right_Card = [
    {
        id: 1, 
        name: "Time elapsed", 
        lefticon: `${base_url}/assets/timeblue.svg`, 
        desc: "Trigger care process at a set time after an event.", 
        desc1: "When ", 
        desc2: "${condition}", 
        desc3: " is met", 
        desc4: "",
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 2, 
        name: "New patient info", 
        lefticon: `${base_url}/assets/arrow.svg`, 
        desc: "Trigger care process when a new patient is created.", 
        desc1: "When ", 
        desc2: "a new patient", 
        desc3: " is created", 
        desc4: "",
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 3, 
        name: "New action", 
        lefticon: `${base_url}/assets/dropdown.svg`, 
        desc: "Trigger care process when a new action is performed.", 
        desc1: "When ", 
        desc2: "${condition}", 
        desc3: " is met", 
        desc4: "",
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 4, 
        name: "New data", 
        lefticon: `${base_url}/assets/arrow.svg`, 
        desc: "Trigger care process when new data is recorded.", 
        desc1: "When ", 
        desc2: "${condition}", 
        desc3: " is met", 
        desc4: "",
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 5, 
        name: "Elicit", 
        lefticon: `${base_url}/assets/errorred.svg`, 
        desc: "Elicit a set of clinical findings from a patient.", 
        desc1: "Elicit the following findings: ", 
        desc2: "${findings}", 
        desc3: "", 
        desc4: "",
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 6, 
        name: "Prescribe", 
        lefticon: `${base_url}/assets/eyeblue.svg`, 
        desc: "Prescribe one or more medications.", 
        desc1: "Write the following prescriptions: ", 
        desc2: "${dosages}", 
        desc3: "", 
        desc4: "",
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 7, 
        name: "Order", 
        lefticon: `${base_url}/assets/logred.svg`, 
        desc: "Order a test for a patient.", 
        desc1: "Order the following tests: ", 
        desc2: "${tests}", 
        desc3: "", 
        desc4: "",
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 8, 
        name: "Record", 
        lefticon: `${base_url}/assets/dropdown.svg`, 
        desc: "Record one or more diagnoses.", 
        desc1: "Record the following diagnoses: ", 
        desc2: "${diseases}", 
        desc3: "", 
        desc4: "",
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 9, 
        name: "Apply", 
        lefticon: `${base_url}/assets/errorred.svg`, 
        desc: "Apply a guideline recommendation.", 
        desc1: "Apply the following guidelines: ", 
        desc2: "${keypoints}", 
        desc3: "", 
        desc4: "",
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 10, 
        name: "Schedule", 
        lefticon: `${base_url}/assets/eyeblue.svg`, 
        desc: "Schedule a follow-up visit.", 
        desc1: "Schedule the following visits: ", 
        desc2: "${visits}", 
        desc3: "", 
        desc4: "",
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 11, 
        name: "Link", 
        lefticon: `${base_url}/assets/logred.svg`, 
        desc: "Link to another care bundle.", 
        desc1: "Link to this care bundle: ", 
        desc2: "${bundle}", 
        desc3: "", 
        desc4: "",
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 12, 
        name: "Use", 
        lefticon: `${base_url}/assets/timeblue.svg`, 
        desc: "Use a clinical calculator.", 
        desc1: "Use this calculator: ", 
        desc2: "${calculator}", 
        desc3: "", 
        desc4: "",
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 13, 
        name: "Custom", 
        lefticon: `${base_url}/assets/timeblue.svg`, 
        desc: "Write a block with custom text.", 
        desc1: "", 
        desc2: "${text}", 
        desc3: "", 
        desc4: "",
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 14, 
        name: "Start", 
        lefticon: `${base_url}/assets/eyeblue.svg`, 
        desc: "Begin care process.", 
        desc1: "Begin care process", 
        desc2: "", 
        desc3: "", 
        desc4: "",
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 15, 
        name: "Filter", 
        lefticon: `${base_url}/assets/eyeblue.svg`, 
        desc: "Continue only if a specific condition is met.", 
        desc1: "When ", 
        desc2: "${condition}", 
        desc3: " is met", 
        desc4: "",
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 16, 
        name: "Branch", 
        lefticon: `${base_url}/assets/logred.svg`, 
        desc: "Branch on a specific condition.", 
        desc1: "Branch on ", 
        desc2: "${condition}", 
        desc3: "", 
        desc4: "",
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: 17, 
        name: "End", 
        lefticon: `${base_url}/assets/timeblue.svg`, 
        desc: "End care process.", 
        desc1: "End of care process", 
        desc2: "", 
        desc3: "", 
        desc4: "",
        position: {
            x: 0,
            y: 0
        }
    }
];

export const Prescribe_Names = [
  'Prescribe A',
  'Prescribe B',
  'Prescribe C',
  'Prescribe D',
  'Prescribe E'
];

export const Order_Names = [
    'Order A', 
    'Order B', 
    'Order C', 
    'Order D', 
    'Order E', 
    'Order F', 
    'Order G', 
    'Order H', 
    'Order I'
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
    if (!names) return '$';
    let tempString = '';
    for (var i = 0; i < names.length; i ++) {
        tempString += names[i];
        if (i === (names.length-1)) break;
        tempString += ',';
    }
    return tempString;
}