import { useSelector } from "react-redux";


const useBillPrefix = (type) => {
  const userData = useSelector((state) => state.userDetail);
  const activeCompany = userData.activeCompany;

  if (userData.companies) {
    for (let i of userData.companies) {
      if (i._id === activeCompany) {
        if (type === 'invoice') return [i.invoiceInitial, i.invoiceNextCount];
        else if (type === "po") return i.poInitial + i.poNextCount;
        else if (type === "proforma") return i.proformaInitial + i.proformaNextCount;
        else return null;
      }
    }
  }

}

export default useBillPrefix;
