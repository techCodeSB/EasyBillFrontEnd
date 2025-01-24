import { useSelector } from "react-redux";


const useBillPrefix = (type) => {
  const userData = useSelector((state) => state.userDetail);
  const activeCompany = userData.activeCompany;

  if (userData.companies) {
    for (let i of userData.companies) {
      if (i._id === activeCompany) {
        if (type === 'invoice') return i.invoiceInitial;
        else if (type === "po") return i.poInitial;
        else if (type === "proforma") return i.proformaInitial;
        else return null;
      }
    }
  }

}

export default useBillPrefix;
