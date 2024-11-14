export const getVisualSupportConfig = (type, profileID) => {
  const configs = {
    "Task Analysis": { 
      title: "Create New Task Analyses",
      scratch: `/stepsupport/${profileID}`,
      temp: `/stepsupport/${profileID}`,
      exist: `/choosepremadetemplate/${profileID}`,
      type: "Task Analysis",
      defaultText: "Insert Task Name",
      errorMsg: "Please enter a task name",
      addMsg: "+ Add Step",
      stepTitle: "Step",
      showTime: true,
      label: "Task Step"
    },
    "Daily Schedule": { 
      title: "Create New Daily Schedule",
      scratch: `/dailyschedules/${profileID}`,
      temp: `/dailyschedules/${profileID}`,
      exist: `/choosepremadetemplate/${profileID}`,
			type: "Daily Schedule"
    },
    "Weekly Calendar": { 
      title: "Create New Weekly Calendar",
      scratch: `/weeklycalendars/${profileID}`,
      temp: `/weeklycalendars/${profileID}`,
      exist: `/choosepremadetemplate/${profileID}`,
			type: "Weekly Calendar"
    },
    "Social Story": { 
      title: "Create New Social Story",
      scratch: `/stepsupport/${profileID}`,
      temp: `/stepsupport/${profileID}`,
      exist: `/choosepremadetemplate/${profileID}`,
      type: "Social Story",
      defaultText: "Insert Social Story Name",
      errorMsg: "Please enter a name for this social story",
      addMsg: "+ Add Story Point",
      stepTitle: "Story Point",
      showTime: false,
      label: "Story Point Description",
    },
    "Environmental Support": { 
      title: "Create New Environment Support",
      scratch: `/stepsupport/${profileID}`,
      temp: `/stepsupport/${profileID}`,
      exist: `/choosepremadetemplate/${profileID}`,
      type: "Environmental Support",
      defaultText: "Insert Environmental Support Name",
      errorMsg: "Please enter a name for this environmental support",
      addMsg: "+ Add Environmental Support",
      stepTitle: "Environment Support",
      showTime: false,
      label: "Environmental Support Description",
    },
    "Choice Board": { 
      title: "Create New Choice Board",
      scratch: `/stepsupport/${profileID}`,
      temp: `/stepsupport/${profileID}`,
      exist: `/choosepremadetemplate/${profileID}`,
      type: "Choice Board",
      defaultText: "Insert Choice Board Name",
      errorMsg: "Please enter a name for this choice board",
      addMsg: "+ Add Choice",
      stepTitle: "Choice",
      showTime: false,
      label: "Choice Name",
    },
    "First-Then": { 
      title: "Create New First-Then",
      scratch: `/firstthen/${profileID}`,
      temp: `/firstthen/${profileID}`,
      exist: `/choosepremadetemplate/${profileID}`,
      type: `First-Then`
    }
  };
  
  return configs[type] || null;
};