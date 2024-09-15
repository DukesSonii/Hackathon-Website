import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const enrolledClasses = [
  { id: 1, subject: "Cloud Computing", section: "A" },
  { id: 2, subject: "HIP & AI", section: "IV-A" },
  { id: 3, subject: "Neural Lab", section: "5A_2022_23" },
  { id: 4, subject: "HCI", section: "A1" },
  { id: 5, subject: "TOC", section: "A3" },
  { id: 6, subject: "Cognitive Psychology", section: "A3" },
];

// Define class details including assignments for each class
const classDetails = {
  1: {
    subject: "Cloud Computing",
    section: "A",
    assignments: [
      {
        id: 1,
        title: "Assignment 1",
        dueDate: "2024-10-01",
        completedDate: null,
      },
      {
        id: 2,
        title: "Project Proposal",
        dueDate: "2024-10-15",
        completedDate: null,
      },
    ],
    comments: [],
  },
  2: {
    subject: "HIP & AI",
    section: "IV-A",
    assignments: [
      {
        id: 3,
        title: "AI Ethics Essay",
        dueDate: "2024-10-10",
        completedDate: null,
      },
      {
        id: 4,
        title: "Machine Learning Project",
        dueDate: "2024-11-05",
        completedDate: null,
      },
    ],
    comments: [],
  },
  3: {
    subject: "Neural Lab",
    section: "5A_2022_23",
    assignments: [
      {
        id: 5,
        title: "Lab Report 1",
        dueDate: "2024-10-12",
        completedDate: null,
      },
      {
        id: 6,
        title: "Neural Network Simulation",
        dueDate: "2024-11-01",
        completedDate: null,
      },
    ],
    comments: [],
  },
  4: {
    subject: "HCI",
    section: "A1",
    assignments: [
      {
        id: 7,
        title: "User Interface Design",
        dueDate: "2024-10-20",
        completedDate: null,
      },
      {
        id: 8,
        title: "Usability Testing",
        dueDate: "2024-11-10",
        completedDate: null,
      },
    ],
    comments: [],
  },
  5: {
    subject: "TOC",
    section: "A3",
    assignments: [
      {
        id: 9,
        title: "Theory of Computation Quiz",
        dueDate: "2024-10-05",
        completedDate: null,
      },
      {
        id: 10,
        title: "Automata Theory Assignment",
        dueDate: "2024-11-01",
        completedDate: null,
      },
    ],
    comments: [],
  },
  6: {
    subject: "Cognitive Psychology",
    section: "A3",
    assignments: [
      {
        id: 11,
        title: "Cognitive Processes Paper",
        dueDate: "2024-10-08",
        completedDate: null,
      },
      {
        id: 12,
        title: "Behavioral Study",
        dueDate: "2024-11-15",
        completedDate: null,
      },
    ],
    comments: [],
  },
  7: {
    subject: "Database Systems",
    section: "B1",
    assignments: [
      {
        id: 13,
        title: "SQL Query Assignment",
        dueDate: "2024-10-25",
        completedDate: null,
      },
      {
        id: 14,
        title: "Database Design Project",
        dueDate: "2024-11-20",
        completedDate: null,
      },
    ],
    comments: [],
  },
  8: {
    subject: "Software Engineering",
    section: "C2",
    assignments: [
      {
        id: 15,
        title: "Software Design Document",
        dueDate: "2024-10-30",
        completedDate: null,
      },
      {
        id: 16,
        title: "Agile Methodologies Quiz",
        dueDate: "2024-11-10",
        completedDate: null,
      },
    ],
    comments: [],
  },
  9: {
    subject: "Computer Networks",
    section: "D4",
    assignments: [
      {
        id: 17,
        title: "Network Protocols Assignment",
        dueDate: "2024-10-15",
        completedDate: null,
      },
      {
        id: 18,
        title: "Network Security Project",
        dueDate: "2024-11-25",
        completedDate: null,
      },
    ],
    comments: [],
  },
  10: {
    subject: "Human-Computer Interaction",
    section: "E5",
    assignments: [
      {
        id: 19,
        title: "HCI Case Study",
        dueDate: "2024-10-12",
        completedDate: null,
      },
      {
        id: 20,
        title: "Interaction Design Project",
        dueDate: "2024-11-20",
        completedDate: null,
      },
    ],
    comments: [],
  },
};

const sidebarItems = {
  admin: [
    { id: 1, name: "Dashboard", route: "/admin/dashboard" },
    { id: 2, name: "Create Class", route: "/admin/create-class" },
    { id: 4, name: "Announcements", route: "/admin/announcements" },
    { id: 5, name: "Enrolled Classes", classes: enrolledClasses },
  ],
  user: [
    { id: 1, name: "Dashboard", route: "/user/dashboard" },
    { id: 2, name: "Announcements", route: "/user/announcements" },
    { id: 3, name: "Updates", route: "/user/updates" },
    { id: 4, name: "Enrolled Classes", classes: enrolledClasses },
  ],
};

// Get sidebar items based on role
app.get("/sidebar/:role", (req, res) => {
  const role = req.params.role;
  if (sidebarItems[role]) {
    res.json(sidebarItems[role]);
  } else {
    res.status(404).json({ message: "Role not found" });
  }
});

// Edit class for admin
app.put("/classes/:id", (req, res) => {
  const { id } = req.params;
  const updatedClass = req.body;
  const classIndex = enrolledClasses.findIndex(
    (cls) => cls.id === parseInt(id)
  );

  if (classIndex !== -1) {
    enrolledClasses[classIndex] = {
      ...enrolledClasses[classIndex],
      ...updatedClass,
    };
    res.json(enrolledClasses[classIndex]);
  } else {
    res.status(404).json({ message: "Class not found" });
  }
});

// Get details for a specific class
app.get("/class/:id", (req, res) => {
  const { id } = req.params;
  const details = classDetails[id];

  if (details) {
    res.json(details);
  } else {
    res.status(404).json({ message: "Class not found" });
  }
});

// Add an assignment to a class
app.post("/class/:id/assignment", (req, res) => {
  const { id } = req.params;
  const { title, date, completionDate } = req.body;

  const classDetail = classDetails[id];

  if (classDetail) {
    const newAssignment = {
      id: Date.now(),
      title,
      date,
      completionDate,
    };
    classDetail.assignments.push(newAssignment);
    res.status(201).json(newAssignment);
  } else {
    res.status(404).json({ message: "Class not found" });
  }
});

// Delete class for admin
app.delete("/classes/:id", (req, res) => {
  const { id } = req.params;
  const classIndex = enrolledClasses.findIndex(
    (cls) => cls.id === parseInt(id)
  );

  if (classIndex !== -1) {
    enrolledClasses.splice(classIndex, 1);
    res.json({ message: "Class deleted" });
  } else {
    res.status(404).json({ message: "Class not found" });
  }
});

app.post("/class/:id/comment", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  const classDetail = classDetails[id];

  if (classDetail) {
    const newComment = {
      id: Date.now(),
      text,
    };
    if (!classDetail.comments) {
      classDetail.comments = []; // Initialize if not present
    }
    classDetail.comments.push(newComment);
    res.status(201).json(newComment);
  } else {
    res.status(404).json({ message: "Class not found" });
  }
});

// Add discussion for users
// Fetch discussions (users)
app.get("/class/:id/discussions", async (req, res) => {
  const { id } = req.params;
  const discussions = await Discussion.find({ classId: id });
  res.json(discussions);
});

// Add a new discussion (users)
app.post("/class/:id/discussion", async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const discussion = new Discussion({ classId: id, text });
  await discussion.save();
  res.json(discussion);
});

// Fetch questions (admins)
app.get("/class/:id/questions", async (req, res) => {
  const { id } = req.params;
  const questions = await Question.find({ classId: id });
  res.json(questions);
});

// Add a new question (admins)
app.post("/class/:id/question", async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const question = new Question({ classId: id, text });
  await question.save();
  res.json(question);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
