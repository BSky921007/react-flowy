export const base_url = window.location.origin;
export const paddingLeft = 363;
export const paddingTop = 73;
export const paddingX = 20;
export const paddingY = 0;
export const cardWidth = 318;
export const cardHeight = 122

export const CardList_Triggers = [
    {
        id: "1", 
        name: "Time elapsed", 
        desc: "When ${condition} is met", 
        lefticon1: `${base_url}/assets/grabme.svg`, 
        lefticon2: `${base_url}/assets/eye.svg`
    }, 
    {
        id: "2", 
        name: "New patient info", 
        desc: "When ${condition} is met", 
        lefticon1: `${base_url}/assets/grabme.svg`, 
        lefticon2: `${base_url}/assets/action.svg`
    }, 
    {
        id: "3", 
        name: "New action", 
        desc: "When ${condition} is met", 
        lefticon1: `${base_url}/assets/grabme.svg`, 
        lefticon2: `${base_url}/assets/time.svg`
    }
];

export const CardList_Actions = [
    {
        id: "4", 
        name: "Elicit", 
        desc: "Elicit the following findings: ${findings}", 
        lefticon1: `${base_url}/assets/grabme.svg`, 
        lefticon2: `${base_url}/assets/database.svg`
    }, 
    {
        id: "5", 
        name: "Write", 
        desc: "Write the following prescriptions: ${dosages}", 
        lefticon1: `${base_url}/assets/grabme.svg`, 
        lefticon2: `${base_url}/assets/database.svg`
    }, 
    {
        id: "6", 
        name: "Order", 
        desc: "Order the following tests: ${tests}", 
        lefticon1: `${base_url}/assets/grabme.svg`, 
        lefticon2: `${base_url}/assets/action.svg`
    }, 
    {
        id: "7", 
        name: "Record", 
        desc: "Record the following diagnoses: ${diseases}", 
        lefticon1: `${base_url}/assets/grabme.svg`, 
        lefticon2: `${base_url}/assets/twitter.svg`
    }, 
    {
        id: "8", 
        name: "Apply", 
        desc: "Apply the following guidelines: ${keypoints}", 
        lefticon1: `${base_url}/assets/grabme.svg`, 
        lefticon2: `${base_url}/assets/database.svg`
    }, 
    {
        id: "9", 
        name: "Schedule", 
        desc: "Schedule the following appointments: ${appointments}", 
        lefticon1: `${base_url}/assets/grabme.svg`, 
        lefticon2: `${base_url}/assets/database.svg`
    }, 
    {
        id: "10", 
        name: "Follow", 
        desc: "Follow this pathway: ${pathway}", 
        lefticon1: `${base_url}/assets/grabme.svg`, 
        lefticon2: `${base_url}/assets/action.svg`
    }, 
    {
        id: "11", 
        name: "Use", 
        desc: "Use this calculator: ${calculator}", 
        lefticon1: `${base_url}/assets/grabme.svg`, 
        lefticon2: `${base_url}/assets/twitter.svg`
    }
];

export const CardList_Structure = [
    {
        id: "12", 
        name: "Start", 
        desc: "Begin care process", 
        lefticon1: `${base_url}/assets/grabme.svg`, 
        lefticon2: `${base_url}/assets/log.svg`
    }, 
    {
        id: "13", 
        name: "Filter", 
        desc: "When ${condition} is met", 
        lefticon1: `${base_url}/assets/grabme.svg`, 
        lefticon2: `${base_url}/assets/log.svg`
    }, 
    {
        id: "14", 
        name: "Switch", 
        desc: "Branch on ${condition}", 
        lefticon1: `${base_url}/assets/grabme.svg`, 
        lefticon2: `${base_url}/assets/error.svg`
    }, 
    {
        id: "15", 
        name: "End", 
        desc: "End of care process", 
        lefticon1: `${base_url}/assets/grabme.svg`, 
        lefticon2: `${base_url}/assets/error.svg`
    }
];

export const Right_Card = [
    {
        id: "1", 
        name: "Time elapsed", 
        lefticon: `${base_url}/assets/eyeblue.svg`, 
        righticon: `${base_url}/assets/more.svg`, 
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
        id: "2", 
        name: "New patient info", 
        lefticon: `${base_url}/assets/actionblue.svg`, 
        righticon: `${base_url}/assets/more.svg`, 
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
        id: "3", 
        name: "New action", 
        lefticon: `${base_url}/assets/timeblue.svg`, 
        righticon: `${base_url}/assets/more.svg`, 
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
        id: "4", 
        name: "Elicit", 
        lefticon: `${base_url}/assets/databaseorange.svg`, 
        righticon: `${base_url}/assets/more.svg`, 
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
        id: "5", 
        name: "Write", 
        lefticon: `${base_url}/assets/databaseorange.svg`, 
        righticon: `${base_url}/assets/more.svg`, 
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
        id: "6", 
        name: "Order", 
        lefticon: `${base_url}/assets/actionorange.svg`, 
        righticon: `${base_url}/assets/more.svg`, 
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
        id: "7", 
        name: "Record", 
        lefticon: `${base_url}/assets/twitterorange.svg`, 
        righticon: `${base_url}/assets/more.svg`, 
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
        id: "8", 
        name: "Apply", 
        lefticon: `${base_url}/assets/databaseorange.svg`, 
        righticon: `${base_url}/assets/more.svg`, 
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
        id: "9", 
        name: "Schedule", 
        lefticon: `${base_url}/assets/databaseorange.svg`, 
        righticon: `${base_url}/assets/more.svg`, 
        desc1: "Schedule the following appointments: ", 
        desc2: "${appointments}", 
        desc3: "", 
        desc4: "",
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: "10", 
        name: "Follow", 
        lefticon: `${base_url}/assets/actionorange.svg`, 
        righticon: `${base_url}/assets/more.svg`, 
        desc1: "Follow this pathway: ", 
        desc2: "${pathway}", 
        desc3: "", 
        desc4: "",
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: "11", 
        name: "Use", 
        lefticon: `${base_url}/assets/twitterorange.svg`, 
        righticon: `${base_url}/assets/more.svg`, 
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
        id: "12", 
        name: "Start", 
        lefticon: `${base_url}/assets/logred.svg`, 
        righticon: `${base_url}/assets/more.svg`, 
        desc1: "Begin ", 
        desc2: "care ", 
        desc3: "process", 
        desc4: "@alyssaxuu",
        position: {
            x: 0,
            y: 0
        }
    }, 
    {
        id: "13", 
        name: "Filter", 
        lefticon: `${base_url}/assets/logred.svg`, 
        righticon: `${base_url}/assets/more.svg`, 
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
        id: "14", 
        name: "Switch", 
        lefticon: `${base_url}/assets/errorred.svg`, 
        righticon: `${base_url}/assets/more.svg`, 
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
        id: "15", 
        name: "End", 
        lefticon: `${base_url}/assets/errorred.svg`, 
        righticon: `${base_url}/assets/more.svg`, 
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