# Task Management App

This project is a task management application developed with React and integrated with Firebase for authentication and real-time data handling. The application stores data in localStorage for efficient and persistent task management. Users can manage, categorize, and organize tasks with ease, benefiting from a rich set of features designed to enhance productivity.

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run the following scripts:

#### `npm start`

Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) in your browser to view it.  
The page will reload if you make changes. You will also see any lint errors in the console.

---

## Overview of Features

This application provides users with a comprehensive task management system, offering the following key features:

### 1. **Authentication and User Profiles**

- **Google Sign-In Integration**: Users can sign in using their Google account through **Firebase Authentication**, ensuring a secure and seamless login experience.
- **Profile Management**: Once logged in, users can manage and personalize their profiles.

### 2. **Task Management**

- **Create, Edit, and Delete Tasks**: Users can easily add new tasks, modify existing ones, or remove unnecessary tasks.
- **Task Categorization**: Tasks can be organized into categories like **work** or **personal**, enabling users to manage different types of tasks effectively.
- **Tagging System**: Tasks can be tagged with relevant keywords for better categorization and easier searchability.
- **Due Dates**: Tasks can have due dates assigned, allowing users to track deadlines and stay on top of their schedules.
- **Drag-and-Drop Sorting**: Tasks can be rearranged within lists using an intuitive drag-and-drop interface.
- **Sorting by Date**: Users can sort tasks by due date in ascending or descending order to prioritize tasks efficiently.

### 3. **Batch Operations**

- **Mass Action Capabilities**: Users can perform actions on multiple tasks at once, such as deleting or marking them as complete, saving time and effort in managing tasks.

### 4. **Task Activity Tracking**

- **History Log**: Every modification (creation, editing, or deletion) to a task is logged and accessible, allowing users to track task history and changes.

### 5. **File Attachments**

- **File Uploads**: Users can attach relevant files or documents to tasks, providing extra context and information for better task management.
- **Task Detail View**: Attached files are displayed in the task details for easy reference.

### 6. **Advanced Search and Filters**

- **Customizable Filters**: Users can filter tasks by tags, categories, or date range to quickly locate specific tasks.
- **Search by Task Title**: A built-in search bar enables users to find tasks by title, helping them access tasks faster.

### 7. **Flexible Views**

- **Kanban Board**: Users can view tasks in a Kanban-style board for a visual, intuitive overview of their tasks.
- **List View**: A classic list view is available for users who prefer a more linear, detailed task representation.

---

## Challenges and Solutions

### Challenge: **Drag-and-Drop Functionality**

- **Issue**: Implementing a smooth and user-friendly drag-and-drop experience for reordering tasks within lists or boards.
- **Solution**: Integrated the **React DnD** (React Drag-and-Drop) library to provide a flexible API for handling drag-and-drop interactions. This solution allows users to reorder tasks efficiently while ensuring the order is preserved even after tasks are moved.

---

## Deployment URL

You can view the live application at the following URL:  
[Task Management App](https://task-management-self-mu.vercel.app/)
