import { useSelector } from "react-redux";


const useBillPrefix = () => {
  const userData = useSelector((state) => state.userDetail);
  const get = (type) => {
    const activeCompany = userData.activeCompany;

    userData.companies && userData.companies.forEach((company, _) => {
      console.log(type)
      if (company._id === activeCompany) {
        if (type === 'invoice') { console.log(company.invoiceInitial); return company.invoiceInitial }
        else if (type === "po") return company.poInitial;
        else if (type === "proforma") return company.proformaInitial;
        else return null;
      
      }
    })
  }

  return { get };

}

export default useBillPrefix;
