import React, { Suspense, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
const AddProforma = React.lazy(() => import("./pages/proforma/AddProforma"));
const Proforma = React.lazy(() => import("./pages/proforma/Proforma"));
const Po = React.lazy(() => import("./pages/po/Po"));
const AddPo = React.lazy(() => import("./pages/po/AddPo"));
const PurchaseInvoice = React.lazy(() => import("./pages/purchaseinvoice/PurchaseInvoice"));
const AddPurchaseInvoice = React.lazy(() => import("./pages/purchaseinvoice/AddPurchaseInvoice"));
const PurchaseReturn = React.lazy(() => import("./pages/purchasereturn/PurchaseReturn"));
const AddPurchaseReturn = React.lazy(() => import("./pages/purchasereturn/AddPurchaseReturn"));
const DebitNote = React.lazy(() => import("./pages/debitnote/DebitNote"));
const AddDebitNote = React.lazy(() => import("./pages/debitnote/AddDebitNote"));
const SalesInvoice = React.lazy(() => import("./pages/salesinvoice/SalesInvoice"));
const AddSalesInvoice = React.lazy(() => import("./pages/salesinvoice/AddSalesInvoice"));
const SalesReturn = React.lazy(() => import("./pages/salesreturn/SalesReturn"));
const AddSalesReturn = React.lazy(() => import("./pages/salesreturn/AddSalesReturn"));
const CreditNote = React.lazy(() => import("./pages/creditnote/CreditNote"));
const AddCreditNote = React.lazy(() => import("./pages/creditnote/AddCreditNote"));
const DeliveryChalan = React.lazy(() => import("./pages/deliverychalan/DeliveryChalan"));
const AddDeliveryChalan = React.lazy(() => import("./pages/deliverychalan/AddDeliveryChalan"));
const Ladger = React.lazy(()=>import("./pages/party/Ladger"));




const App = () => {
  const navigate = useNavigate();


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        navigate(-1); 
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  

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

        {/* Print part */}
        <Route path="/admin/bill/details/:bill/:id" element={<ProtectRoute><Invoice /></ProtectRoute>} />


        <Route path="/admin/quotation-estimate" element={<ProtectRoute><Quotation /></ProtectRoute>} />
        <Route path="/admin/quotation-estimate/add" element={<ProtectRoute><AddQutation /></ProtectRoute>} />
        <Route path="/admin/quotation-estimate/edit/:id" element={<ProtectRoute><AddQutation mode={"edit"} /></ProtectRoute>} />


        {/* Proforma route */}
        <Route path="/admin/proforma-invoice" element={<ProtectRoute><Proforma /></ProtectRoute>} />
        <Route path="/admin/proforma-invoice/add" element={<ProtectRoute><AddProforma /></ProtectRoute>} />
        <Route path="/admin/proforma-invoice/edit/:id" element={<ProtectRoute><AddProforma mode={"edit"} /></ProtectRoute>} />


        {/* PO route */}
        <Route path="/admin/purchase-order" element={<ProtectRoute><Po /></ProtectRoute>} />
        <Route path="/admin/purchase-order/add" element={<ProtectRoute><AddPo /></ProtectRoute>} />
        <Route path="/admin/purchase-order/edit/:id" element={<ProtectRoute><AddPo mode={"edit"} /></ProtectRoute>} />


        {/* Purchase Invoice route */}
        <Route path="/admin/purchase-invoice" element={<ProtectRoute><PurchaseInvoice /></ProtectRoute>} />
        <Route path="/admin/purchase-invoice/add/" element={<ProtectRoute><AddPurchaseInvoice /></ProtectRoute>} />
        <Route path="/admin/purchase-invoice/add/:id" element={<ProtectRoute><AddPurchaseInvoice mode={"convert"} /></ProtectRoute>} />
        <Route path="/admin/purchase-invoice/edit/:id" element={<ProtectRoute><AddPurchaseInvoice mode={"edit"} /></ProtectRoute>} />


        {/* Purchase Return route */}
        <Route path="/admin/purchase-return" element={<ProtectRoute><PurchaseReturn /></ProtectRoute>} />
        <Route path="/admin/purchase-return/add" element={<ProtectRoute><AddPurchaseReturn /></ProtectRoute>} />
        <Route path="/admin/purchase-return/edit/:id" element={<ProtectRoute><AddPurchaseReturn mode={"edit"} /></ProtectRoute>} />


        {/* Debit Note route */}
        <Route path="/admin/debit-note" element={<ProtectRoute><DebitNote /></ProtectRoute>} />
        <Route path="/admin/debit-note/add" element={<ProtectRoute><AddDebitNote /></ProtectRoute>} />
        <Route path="/admin/debit-note/edit/:id" element={<ProtectRoute><AddDebitNote mode={"edit"} /></ProtectRoute>} />


        {/* Sales Invoice route */}
        <Route path="/admin/sales-invoice" element={<ProtectRoute><SalesInvoice /></ProtectRoute>} />
        <Route path="/admin/sales-invoice/add" element={<ProtectRoute><AddSalesInvoice /></ProtectRoute>} />
        <Route path="/admin/sales-invoice/add/:id" element={<ProtectRoute><AddSalesInvoice mode={"convert"} /></ProtectRoute>} />
        <Route path="/admin/sales-invoice/edit/:id" element={<ProtectRoute><AddSalesInvoice mode={"edit"} /></ProtectRoute>} />


        {/* Sales Return route */}
        <Route path="/admin/sales-return" element={<ProtectRoute><SalesReturn /></ProtectRoute>} />
        <Route path="/admin/sales-return/add" element={<ProtectRoute><AddSalesReturn /></ProtectRoute>} />
        <Route path="/admin/sales-return/edit/:id" element={<ProtectRoute><AddSalesReturn mode={"edit"} /></ProtectRoute>} />


        {/* Credit Note route */}
        <Route path="/admin/credit-note" element={<ProtectRoute><CreditNote /></ProtectRoute>} />
        <Route path="/admin/credit-note/add" element={<ProtectRoute><AddCreditNote /></ProtectRoute>} />
        <Route path="/admin/credit-note/edit/:id" element={<ProtectRoute><AddCreditNote mode={"edit"} /></ProtectRoute>} />


        {/* Delivery Chalan route */}
        <Route path="/admin/delivery-chalan" element={<ProtectRoute><DeliveryChalan /></ProtectRoute>} />
        <Route path="/admin/delivery-chalan/add" element={<ProtectRoute><AddDeliveryChalan /></ProtectRoute>} />
        <Route path="/admin/delivery-chalan/edit/:id" element={<ProtectRoute><AddDeliveryChalan mode={"edit"} /></ProtectRoute>} />



        <Route path="/admin/profile" element={<ProtectRoute><Profile /></ProtectRoute>} />

        {/* Account */}
        <Route path="/admin/account/add" element={<ProtectRoute><AddAccount /></ProtectRoute>} />
        <Route path="/admin/account/edit/:id" element={<ProtectRoute><AddAccount mode="edit" /></ProtectRoute>} />
        <Route path="admin/account" element={<ProtectRoute><Accounts /></ProtectRoute>} />


        <Route path="/admin/party" element={<ProtectRoute><Party /></ProtectRoute>} />
        <Route path="/admin/party/add" element={<ProtectRoute><AddParty /></ProtectRoute>} />
        <Route path="/admin/party/edit/:id" element={<ProtectRoute><AddParty mode={"edit"} /></ProtectRoute>} />
        <Route path="/admin/party/ladger/:id" element={<ProtectRoute><Ladger /></ProtectRoute>} />

        <Route path="admin/other-transaction/add" element={<ProtectRoute><TransactionAdd /></ProtectRoute>} />
        <Route path="admin/other-transaction/edit/:id" element={<ProtectRoute><TransactionAdd mode="edit"/></ProtectRoute>} />
        <Route path="admin/other-transaction" element={<ProtectRoute><Transaction /></ProtectRoute>} />

        <Route path="/admin/unit" element={<ProtectRoute>< Unit /></ProtectRoute>} />
        <Route path="admin/unit/add" element={<ProtectRoute>< UnitAdd /></ProtectRoute>} />
        <Route path="admin/unit/edit/:id" element={<ProtectRoute>< UnitAdd mode="edit" /></ProtectRoute>} />


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
