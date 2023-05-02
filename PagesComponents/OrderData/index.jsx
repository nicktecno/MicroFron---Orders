import "react-toastify/dist/ReactToastify.min.css";

import { useLang } from "../../Context/LangContext";

import api from "../../services/api";
import msPaymentApi from "../../services/msPayment";

import OrderDataComponent from "./OrderData";

const OrderDataPage = () => {
  const { routeTranslations } = useLang();

  const mktName = process.env.NEXT_PUBLIC_REACT_APP_NAME;
  const headerUrl = process.env.NEXT_PUBLIC_REACT_APP_HEADER_URL;
  return (
    <>
      <meta name="kdt:page" content={`${mktName} - Dados do Pedido`} />
      <title>{`${mktName} - Dados do Pedido`}</title>
      <OrderDataComponent
        mktName={mktName}
        api={api}
        headerUrl={headerUrl}
        msPaymentApi={msPaymentApi}
        routeTranslations={routeTranslations}
      />
    </>
  );
};

export default OrderDataPage;
