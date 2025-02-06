import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectRoute, UnProtectRoute } from "./components/ProtectRoute";

const Login = React.lazy(() => import("./pages/Auth/Login"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const AddQutation = React.lazy(() => import("./pages/quotation/AddQuotation"));
const Quotation = React.lazy(() => import("./pages/quotation/Quotation"));
const Profile = React.lazy(() => import("./pages/Auth/Profile"));
const Signup = React.lazy(() => import("./pages/Auth/Signup"));
const Accounts = React.lazy(() => import("./pages/accounts/Accounts"));
const AddAccount = React.lazy(() => import("./pages/accounts/AddAccount"));
const Setting = React.lazy(() => import("./pages/Setting"));
const Party = React.lazy(() => import("./pages/party/Party"));
const AddParty = React.lazy(() => import('./pages/party/AddParty'));
const TransactionAdd = React.lazy(() => import("./pages/Transactions/TransactionAdd"));
const Transaction = React.lazy(() => import("./pages/Transactions/Transaction"));
const UnitAdd = React.lazy(() => import("./pages/Unit/UnitAdd"));
const Unit = React.lazy(() => import("./pages/Unit/Unit"));
const Tax = React.lazy(() => import("./pages/Tax/Tax"));
const TaxAdd = React.lazy(() => import("./pages/Tax/TaxAdd"));
const CategoryAdd = React.lazy(() => import("./pages/Item/CategoryAdd"));
const Category = React.lazy(() => import("./pages/Item/Category"));
const ItemAdd = React.lazy(() => import("./pages/Items/ItemAdd"));
const Item = React.lazy(() => import("./pages/Items/Item"));
const RoleAdd = React.lazy(() => import("./pages/Role/RoleAdd"));
const Role = React.lazy(() => import("./pages/Role/Role"));
const AddCompany = React.lazy(() => import("./pages/company/AddCompany"));
const UserProfileAdd = React.lazy(() => import("./pages/UserProfile/UserProfileAdd"));
const UserProfile = React.lazy(() => import("./pages/UserProfile/UserProfile"));
const Forgot = React.lazy(() => import("./pages/Auth/Forgot"));
const Otp = React.lazy(() => import("./pages/Auth/Otp"));
const ChangePassword = React.lazy(() => import("./pages/Auth/ChangePassword"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Invoice = React.lazy(() => import("./pages/details/Invoice"));
const AddPaymentOut = React.lazy(() => import("./pages/paymentout/AddPayment"));
const AddPaymentIn = React.lazy(() => import("./pages/paymentin/AddPayment"));
const PaymentIn = React.lazy(() => import("./pages/paymentin/PaymentIn"));
const PaymentOut = React.lazy(() => import("./pages/paymentout/PaymentOut"));



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
        <Route path="/admin" element={<UnProtectRoute login={true}><Login /></UnProtectRoute>} />
        <Route path="/" element={<UnProtectRoute login={true}><Login /></UnProtectRoute>} />
        <Route path="/admin/signup" element={<UnProtectRoute login={true}><Signup /></UnProtectRoute>} />
        <Route path="/admin/forget" element={<UnProtectRoute login={true}>< Forgot /></UnProtectRoute>} />
        <Route path="/admin/otp" element={<UnProtectRoute login={true}>< Otp /></UnProtectRoute>} />
        <Route path="/admin/change-password" element={<UnProtectRoute login={true}>< ChangePassword /></UnProtectRoute>} />
        <Route path="/admin/site" element={<ProtectRoute><Setting /></ProtectRoute>} />
        <Route path="/admin/company" element={<ProtectRoute><AddCompany /></ProtectRoute>} />
        <Route path="admin/dashboard" element={<ProtectRoute><Dashboard /></ProtectRoute>} />
        <Route path="admin/bill/details/:id" element={<ProtectRoute><Invoice /></ProtectRoute>} />

        <Route path="/admin/quotation-estimate" element={<ProtectRoute><Quotation /></ProtectRoute>} />
        <Route path="/admin/quotation-estimate/add" element={<ProtectRoute><AddQutation /></ProtectRoute>} />
        <Route path="/admin/quotation-estimate/edit/:id" element={<ProtectRoute><AddQutation mode={"edit"} /></ProtectRoute>} />

        <Route path="/admin/profile" element={<ProtectRoute><Profile /></ProtectRoute>} />
        <Route path="/admin/account/add" element={<ProtectRoute><AddAccount /></ProtectRoute>} />
        <Route path="/admin/account/edit" element={<ProtectRoute><AddAccount mode="edit" /></ProtectRoute>} />
        <Route path="admin/account" element={<ProtectRoute><Accounts /></ProtectRoute>} />

        <Route path="/admin/party" element={<ProtectRoute><Party /></ProtectRoute>} />
        <Route path="/admin/party/add" element={<ProtectRoute><AddParty /></ProtectRoute>} />
        <Route path="/admin/party/edit/:id" element={<ProtectRoute><AddParty mode={"edit"} /></ProtectRoute>} />

        <Route path="admin/other-transaction/add" element={<ProtectRoute><TransactionAdd /></ProtectRoute>} />
        <Route path="admin/other-transaction" element={<ProtectRoute><Transaction /></ProtectRoute>} />

        <Route path="/admin/unit" element={<ProtectRoute>< Unit /></ProtectRoute>} />
        <Route path="admin/unit/add" element={<ProtectRoute>< UnitAdd /></ProtectRoute>} />
        <Route path="admin/unit/edit/:id" element={<ProtectRoute>< UnitAdd mode="edit" /></ProtectRoute>} />

        <Route path="/admin/account" element={<ProtectRoute><Accounts /></ProtectRoute>} />
        <Route path="/admin/other-transaction/add" element={<ProtectRoute><TransactionAdd /></ProtectRoute>} />
        <Route path="/admin/other-transaction/edit" element={<ProtectRoute><TransactionAdd mode="edit" /></ProtectRoute>} />
        <Route path="/admin/other-transaction" element={<ProtectRoute><Transaction /></ProtectRoute>} />

        <Route path="/admin/tax/add" element={<ProtectRoute>< TaxAdd /></ProtectRoute>} />
        <Route path="/admin/tax/edit/:id" element={<ProtectRoute>< TaxAdd mode="edit" /></ProtectRoute>} />
        <Route path="/admin/tax" element={<ProtectRoute>< Tax /></ProtectRoute>} />

        <Route path="/admin/item-category/add" element={<ProtectRoute>< CategoryAdd /></ProtectRoute>} />
        <Route path="/admin/item-category/edit/:id" element={<ProtectRoute>< CategoryAdd mode="edit" /></ProtectRoute>} />
        <Route path="/admin/item-category" element={<ProtectRoute><Category /></ProtectRoute>} />

        <Route path="/admin/item/add" element={<ProtectRoute><ItemAdd /></ProtectRoute>} />
        <Route path="/admin/item/edit/:id" element={<ProtectRoute>< ItemAdd mode="edit" /></ProtectRoute>} />
        <Route path="/admin/item" element={<ProtectRoute>< Item /></ProtectRoute>} />

        <Route path="/admin/role/add" element={<ProtectRoute>< RoleAdd /></ProtectRoute>} />
        <Route path="/admin/role/edit" element={<ProtectRoute>< RoleAdd mode="edit" /></ProtectRoute>} />
        <Route path="/admin/role" element={<ProtectRoute> < Role /> </ProtectRoute>} />
        <Route path="/admin/user-profile/add" element={<ProtectRoute> < UserProfileAdd /></ProtectRoute>} />
        <Route path="/admin/user-profile/edit" element={<ProtectRoute> < UserProfileAdd mode="edit" /></ProtectRoute>} />
        <Route path="/admin/user-profile" element={<ProtectRoute>< UserProfile /></ProtectRoute>} />

        <Route path="/admin/payment-out/add" element={<ProtectRoute>< AddPaymentOut /></ProtectRoute>} />
        <Route path="/admin/payment-out/edit/:id" element={<ProtectRoute>< AddPaymentOut mode={"edit"} /></ProtectRoute>} />
        <Route path="/admin/payment-out" element={<ProtectRoute>< PaymentOut /></ProtectRoute>} />

        <Route path="/admin/payment-in/add" element={<ProtectRoute>< AddPaymentIn /></ProtectRoute>} />
        <Route path="/admin/payment-in/edit/:id" element={<ProtectRoute>< AddPaymentIn mode={"edit"} /></ProtectRoute>} />
        <Route path="/admin/payment-in" element={<ProtectRoute>< PaymentIn /></ProtectRoute>} />

        <Route path="*" element={< NotFound />} />
      </Routes>
    </Suspense>

  )
}

export default App;
