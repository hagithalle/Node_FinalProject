import { Routes, Route, Navigate } from 'react-router-dom';
import MainEmployee from './Components/employees/MainEmployee';
import EditDepartment from "./Components/department/EditDepartment";
import NewDepartment from './Components/department/NewDepartment';
import MainDepartment from './Components/department/MainDepartment';
import EditShift from './Components/EditShift';
import ErrorBoundary from './Components/ErrorBoundary';
import Employees from './Pages/Employees';
import Departments from './Pages/Departments';
import Shifts from './Pages/shifts';
import Login from './Pages/Login';
import MainPage from './Pages/MainPage';
import EditEmployee from './Components/employees/EditEmployee';
import NewEmployee from './Components/employees/NewEmployee';
import Users from './Pages/Users';
import UserDashboard from "./Pages/UserDashboard";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Login />} />

        {/* Main Page after Login */}
        <Route path="/main-page" element={<MainPage />}>
          {/* Redirect to dashboard by default */}
          <Route index element={<Navigate to="dashboard" replace />} />

          {/* Dashboard Route */}
          <Route path="dashboard" element={<UserDashboard />} />

          {/* Employees Section with Nested Routes */}
          <Route path="employees" element={<Employees />}>
            <Route index element={<MainEmployee />} />
            <Route path="edit-employee" element={<EditEmployee />} />
            <Route path="new-employee" element={<NewEmployee />} />
       </Route>

          {/* Departments Section */}
          <Route path="departments" element={<Departments />}>
            <Route index element={<MainDepartment />} />
            <Route path="edit-department" element={<EditDepartment />} />
            <Route path="new-department" element={<NewDepartment />} />
          </Route>

          {/* Shifts Section */}
          <Route path="shifts" element={<Shifts />} />
          <Route path="shifts/edit-shift/:shiftId" element={<ErrorBoundary><EditShift /></ErrorBoundary>} />

          {/* Users Section */}
          <Route path="users" element={<Users />} />
        </Route>

        {/* Fallback redirect to Login if no route matches */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;