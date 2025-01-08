import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AddAccount from "./pages/accounts/AddAccount";
import Setting from "./pages/Setting";

const Login = React.lazy(() => import("./pages/Login"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const AddQutation = React.lazy(() => import("./pages/quotation/AddQuotation"));
const Quotation = React.lazy(() => import("./pages/quotation/Quotation"));
const Profile = React.lazy(() => import("./pages/Profile"));
// const AddAccount = React.lazy(() => import("./pages/accounts/AddAccount"));

const App = () => {
  return (

    <Suspense fallback={<div className="grid place-items-center w-full min-h-[100vh]">
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
      </div>
    </div>}>
      <Routes>
        <Route path="/admin" element={<Login />} />
        <Route path="admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/quotation-estimate" element={<Quotation />} />
        <Route path="/admin/quotation-estimate/add" element={<AddQutation />} />
        <Route path="/admin/site" element={<Setting />} />
        <Route path="/admin/quotation-estimate/add" element={<AddQutation/>}/>
        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/admin/account/add" element={<AddAccount />} />
      </Routes>
    </Suspense>

  )
}

export default App;
