# BugZen - Simple Bug Tracking Application

A modern, lightweight bug tracking system built with **Next.js**, allowing developers to create and manage bug reports, and managers to review and approve bug closures.

---

## Features

- **Role-based Dashboards**: Separate interfaces for developers and managers  
- **Task/Bug Management**: Create, edit, delete, and filter tasks based on various criteria  
- **Approval Workflow**: Developers can mark bugs as complete; managers must approve or reopen  
- **Time Tracking**: Log time spent on individual tasks  
- **Analytics**: View bug trends and metrics  
- **Persistent Storage**: Tasks persist across page reloads using `localStorage`

---

## Technologies Used

- **Next.js 14** with App Router  
- **React** for component-based UI  
- **TypeScript** for type safety  
- **Zustand** for state management  
- **TailwindCSS** for styling  
- **Recharts** for data visualization  

---

## Getting Started

### Prerequisites

- Node.js 18.x or later  
- npm or yarn

### Installation

1. Clone the repository  
2. Install dependencies  
3. Start the development server  
4. Open [http://localhost:3000](http://localhost:3000) in your browser  

---

## Usage

### Authentication

The app uses a simple role-based authentication system:

- From the homepage, click **"Login"** or **"Get Started"**  
- Select either **"Login as Developer"** or **"Login as Manager"**  
- You'll be redirected to the appropriate dashboard  

### Developer Dashboard

- Create new bug reports/tasks  
- Edit and delete tasks you've created  
- Mark bugs as complete (status changes to **"Pending Approval"**)  
- Log time spent on tasks  
- Filter and sort tasks by status, priority, etc.  

### Manager Dashboard

- View all tasks created by developers  
- Approve bug closures or reopen tasks in **"Pending Approval"**  
- View analytics on task completion trends  

---

## Implementation Details

### State Management

- **Zustand Store**: Centralized state with `localStorage` persistence  
- **Authentication Store**: Manages user roles and access control  

### Project Structure

- Organized by feature with clear separation of concerns  
- Modular components for reusability  

---

## Assumptions and Limitations

- **Local Storage**: Data is stored in-browser (no backend)  
- **Simple Authentication**: Client-side only, for demo purposes  
- **Chart Data Limitation**: The task trend chart combines hardcoded data with live data, which may not accurately reflect historical trends.

---

## Areas of Interest

- **Role-based Authorization**: Protected routes based on roles  
- **Shared State Between Roles**: Same task data, different permissions  
- **Workflow Implementation**: Complete lifecycle from creation to approval  
- **Responsive Design**: Fully responsive on mobile and desktop  

---

## Future Improvements

- Backend integration with a real database  
- User accounts and secure authentication  
- Real-time updates using WebSockets  
- Advanced analytics and reporting  
- Email notifications for status changes  
