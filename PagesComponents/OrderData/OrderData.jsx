import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import CurrencyFormat from "../../services/currencyFormat";
import Loading from "../../components/Loading";

import moment from "moment";

import * as S from "./style";

import { AddressBook } from "@styled-icons/fa-solid/AddressBook";
import { BarcodeBox } from "@styled-icons/remix-fill/BarcodeBox";
import { CreditCard } from "@styled-icons/icomoon/CreditCard";
import { Pix } from "@styled-icons/fa-brands/Pix";
import { Cancel } from "@styled-icons/material-outlined/Cancel";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { MobileStepper } from "@mui/material";

import BoxOrderDataPayment from "../../components/BoxOrderDataPayment";

function OrderDataComponent({
  api,
  msPaymentApi,
  mktName,
  headerUrl,
  routeTranslations,
}) {
  const stepsAll = [
    "Aguardando Pagamento",
    "Processando",
    "Entregue",
    "Completo",
  ];

  const individualStepsDeliver = [
    "Aguardando Pagamento",
    "Em Processo",
    "Faturado",

    "Enviado",
    "Em Transporte",
    "Entregue",
  ];

  const individualStepsNotDeliver = [
    "Aguardando Pagamento",
    "Em Processo",
    "Faturado",
    "Pronto para Retirada",
    "Entregue",
  ];

  const history = useRouter();

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(false);
  const [shipment, setShipment] = useState();
  const [shipmentCompany, setShipmentCompany] = useState();
  const [itens, setItens] = useState([]);
  const [atributos, setAtributos] = useState([]);
  const [status, setStatus] = useState(false);
  const [tentatives, setTentatives] = useState(0);

  useEffect(() => {
    if (history.isReady) {
      (async function () {
        setLoading(true);

        try {
          const { data: response } = await api.get(
            `customer/order/list/${history.query.id[0].toString()}`
          );

          const date = response.data[0].shipping_address.created_at.date;
          response.data[0].date = moment(date).format("DD/MM/YYYY");
          setOrder(response.data[0]);
          setItens(response.data[0].items);
          setShipment(response.data[0].shipments_info);
          setShipmentCompany(response.data[0].shipping_company);
          // const filteredItens = response.data[0].items?.map((item) => {
          //   const filterAttributes = item.product.attributes
          //     .map((atributo) => {
          //       if (atributo.configurable === true) {
          //         return atributo;
          //       }
          //     })
          //     .filter((filtrado) => filtrado !== undefined);

          //   return filterAttributes;
          // });

          // setAtributos(filteredItens);
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [history.isReady]);

  async function paymentLoad() {
    const token = localStorage.getItem(mktName);
    try {
      const { data: responsePayment } = await msPaymentApi.get(
        `customer/payment/order/${history.query.id[0].toString()}`,
        {
          headers: {
            Authorization: token,
            Type: "customer",
            "Url-Store": headerUrl,
          },
        }
      );
      setStatus(responsePayment.data);

      if (responsePayment.data.status === "waiting_payment") {
        setTimeout(async function () {
          await paymentLoad();
        }, 20000);
      }
    } catch (e) {
      setTentatives((prev) => prev + 1);
      if (tentatives <= 10) {
        setTimeout(async function () {
          await paymentLoad();
        }, 5000);
      } else {
        setLoading(false);
        console.log(e);
      }
    }
  }

  useEffect(() => {
    if (history.isReady) {
      paymentLoad();
    }
  }, [history.isReady]);

  return (
    <>
      {loading ? (
        <S.ContainerLoading>
          <Loading />
        </S.ContainerLoading>
      ) : (
        <>
          <S.ContainerGeneral>
            <S.Breadcrumb>
              <p>
                <Link href="/profile">Minha Conta &#62; </Link>
                <Link href="/profile/orders" passhref="true">
                  Histórico de Pedidos
                </Link>
                <span> &#62; #{order.id}</span>
              </p>
            </S.Breadcrumb>

            <S.Products>
              <S.List>
                {order && (
                  <S.LeftContainer>
                    {/* {order.status_label !== "Cancelado" &&
                    order.status !== "desisted" ? (
                      <>
                        <S.CustomLabelSteps className="title desk">
                          Status do Pedido
                        </S.CustomLabelSteps>
                        <S.ContainerStep>
                          <Box
                            sx={{
                              width: "100%",
                              marginTop: "20px",
                              marginBottom: "20px",
                            }}
                          >
                            <Stepper
                              activeStep={
                                order.status === "pending_payment"
                                  ? 0
                                  : order.status === "awaiting_confirmation"
                                  ? 1
                                  : order.status === "processing"
                                  ? 1
                                  : order.status === "billed"
                                  ? 1
                                  : order.status === "ready_to_delivery"
                                  ? 1
                                  : order.status === "shipped"
                                  ? 1
                                  : order.status === "transit"
                                  ? 1
                                  : order.status === "delivered"
                                  ? 2
                                  : 3
                              }
                              alternativeLabel
                            >
                              {stepsAll.map((label) => (
                                <Step key={label}>
                                  <StepLabel>{label}</StepLabel>
                                </Step>
                              ))}
                            </Stepper>
                          </Box>
                        </S.ContainerStep>
                        <S.ContainerStepMobile>
                          <S.CustomLabelSteps className="title">
                            Status do Pedido
                          </S.CustomLabelSteps>
                          <MobileStepper
                            variant="progress"
                            steps={4}
                            position="static"
                            activeStep={
                              order.status === "pending_payment"
                                ? 0
                                : order.status === "awaiting_confirmation"
                                ? 1
                                : order.status === "processing"
                                ? 1
                                : order.status === "billed"
                                ? 1
                                : order.status === "ready_to_delivery"
                                ? 1
                                : order.status === "shipped"
                                ? 1
                                : order.status === "transit"
                                ? 1
                                : order.status === "delivered"
                                ? 2
                                : 3
                            }
                            sx={{ flexGrow: 1 }}
                          />
                          <S.CustomLabelSteps>
                            {order.status === "pending_payment"
                              ? "Aguardando Pagamento"
                              : order.status === "awaiting_confirmation"
                              ? "Processando"
                              : order.status === "processing"
                              ? "Processando"
                              : order.status === "billed"
                              ? "Processando"
                              : order.status === "ready_to_delivery"
                              ? "Processando"
                              : order.status === "shipped"
                              ? "Processando"
                              : order.status === "transit"
                              ? "Processando"
                              : order.status === "delivered"
                              ? "Entregue"
                              : "Completo"}
                          </S.CustomLabelSteps>
                        </S.ContainerStepMobile>
                      </>
                    ) : (
                      <>
                        <S.CustomLabelSteps className="title desk">
                          Status do Pedido
                        </S.CustomLabelSteps>
                        <S.ContainerCancel>
                          <Cancel />
                          <div className="canceled">Cancelado</div>
                        </S.ContainerCancel>
                      </>
                    )} */}
                    <S.DataPaymentNotebook>
                      <BoxOrderDataPayment order={order} status={status} />
                    </S.DataPaymentNotebook>
                    <S.ContainerAddressPayment>
                      <S.ContainerAddress>
                        Endereço de entrega
                        <div className="addressBox">
                          <div className="containerSvg">
                            <AddressBook />
                          </div>
                          <br />
                          <span>
                            {order.billing_address.address} nº{" "}
                            {order.billing_address.number} -{" "}
                            {order.billing_address.complement}
                            <br />
                            {order.billing_address.neighborhood} -{" "}
                            {order.billing_address.city} -{" "}
                            {order.billing_address.state}
                            <br />
                            {order.billing_address.postcode}
                          </span>
                        </div>
                      </S.ContainerAddress>

                      <S.pagamento>
                        <p>Pagamento Escolhido</p>

                        <S.MethodChoosed>
                          {status.method === "boleto" ? (
                            <span>
                              <BarcodeBox />
                              <div>Boleto</div>
                            </span>
                          ) : status.method === "credit_card" ? (
                            <div className="containerCard">
                              <span>
                                <CreditCard />
                                <div>Cartão</div>
                              </span>
                              {status.credit_card?.installments_value !==
                                undefined &&
                                status.credit_card?.installments_value !==
                                  null && (
                                  <div className="portions">
                                    {status.credit_card?.installments}x{" "}
                                    {CurrencyFormat(
                                      status.credit_card?.installments_value
                                    )}
                                  </div>
                                )}
                            </div>
                          ) : (
                            <span>
                              <Pix />
                              <div>Pix</div>
                            </span>
                          )}
                        </S.MethodChoosed>
                      </S.pagamento>
                    </S.ContainerAddressPayment>

                    {shipment.map((ship, shipIndex) => (
                      <S.ContainerProduto key={shipIndex}>
                        <S.ContainerProdutoMap>
                          <S.remersa>
                            <h4>
                              Remessa {shipIndex + 1}/{shipmentCompany.length}{" "}
                            </h4>
                            <div className="sellerName">
                              Vendido e entregue por:
                              <strong>{ship.seller_name}</strong>
                            </div>
                          </S.remersa>

                          {ship.itens.map((item, itemIndex) => (
                            <S.ContainerCaixaItem key={itemIndex}>
                              <S.caixaItem key={item.id}>
                                <S.imgitemDescricao>
                                  <div
                                    className="containerImg"
                                    onClick={() =>
                                      history.push(
                                        `/sellerproduct/${item.seller_id}/${item.product?.url_key}`
                                      )
                                    }
                                  >
                                    <img
                                      alt="Imagem do Produto"
                                      src={item.image}
                                    />
                                  </div>
                                  <div className="blocoNome">
                                    <h3>{item.name}</h3>
                                    <div>
                                      {atributos.length > 0 &&
                                        atributos.length == itens.length && (
                                          <ul>
                                            {atributos[itemIndex]?.map(
                                              (atributo, atributoIndex) =>
                                                atributo.value !== null &&
                                                atributo.value !== 0 && (
                                                  <li key={atributoIndex}>
                                                    {atributo.label
                                                      .charAt(0)
                                                      .toUpperCase() +
                                                      atributo.label.substr(1)}
                                                    :
                                                    <b>
                                                      {atributo?.value
                                                        ?.charAt(0)
                                                        .toUpperCase() +
                                                        atributo.value.substr(
                                                          1
                                                        )}
                                                    </b>
                                                  </li>
                                                )
                                            )}
                                          </ul>
                                        )}
                                    </div>
                                  </div>
                                </S.imgitemDescricao>

                                <S.descritem>
                                  <p className="qtd">
                                    <span>{item.qty_ordered} </span>

                                    {item.qty_ordered > 1
                                      ? "unidades"
                                      : "unidade"}
                                  </p>

                                  <p className="preco">
                                    {CurrencyFormat(item.base_price)}
                                  </p>
                                </S.descritem>
                              </S.caixaItem>
                            </S.ContainerCaixaItem>
                          ))}

                          <div className="metodoEnvio">
                            <span className="spanMetodoEnvio">
                              Método de Envio:
                            </span>
                            <p>
                              {shipmentCompany.filter(
                                (company) => company.seller === ship.seller_name
                              )[0].shipping_company ===
                              "Correios - Sedex Contrato (03220)"
                                ? `Correios  R$ ${shipmentCompany
                                    .filter(
                                      (company) =>
                                        company.seller === ship.seller_name
                                    )[0]
                                    .price.toFixed(2)
                                    .toString()
                                    .replace(".", ",")}`
                                : shipmentCompany.filter(
                                    (company) =>
                                      company.seller === ship.seller_name
                                  )[0].shipping_company === "Correios - SEDEX"
                                ? `Correios  R$ ${shipmentCompany
                                    .filter(
                                      (company) =>
                                        company.seller === ship.seller_name
                                    )[0]
                                    .price.toFixed(2)
                                    .toString()
                                    .replace(".", ",")}`
                                : shipmentCompany.filter(
                                    (company) =>
                                      company.seller === ship.seller_name
                                  )[0].shipping_company +
                                  " " +
                                  `R$ ${shipmentCompany
                                    .filter(
                                      (company) =>
                                        company.seller === ship.seller_name
                                    )[0]
                                    .price.toFixed(2)
                                    .toString()
                                    .replace(".", ",")}`}
                            </p>
                          </div>
                        </S.ContainerProdutoMap>

                        {order.status_label !== "Cancelado" &&
                        ship.status !== "canceled" &&
                        ship.status !== "desisted" ? (
                          <>
                            <S.ContainerStep className="individual">
                              <Box
                                sx={{
                                  width: "100%",
                                  marginTop: "20px",
                                  marginBottom: "20px",
                                }}
                              >
                                <Stepper
                                  activeStep={
                                    ship.status === "pending_payment"
                                      ? 0
                                      : ship.status === "awaiting_confirmation"
                                      ? 1
                                      : ship.status === "processing"
                                      ? 1
                                      : ship.status === "billed"
                                      ? 2
                                      : ship.status === "ready_to_delivery"
                                      ? 3
                                      : ship.status === "shipped"
                                      ? 3
                                      : ship.status === "transit"
                                      ? 4
                                      : ship.status === "delivered"
                                      ? 5
                                      : 5
                                  }
                                  alternativeLabel
                                >
                                  {shipmentCompany.filter(
                                    (company) =>
                                      company.seller === ship.seller_name
                                  )[0].shipping_company === "Retira na loja"
                                    ? individualStepsNotDeliver.map((label) => (
                                        <Step key={label}>
                                          <StepLabel>{label}</StepLabel>
                                        </Step>
                                      ))
                                    : individualStepsDeliver.map((label) => (
                                        <Step key={label}>
                                          <StepLabel>{label}</StepLabel>
                                        </Step>
                                      ))}
                                </Stepper>
                              </Box>
                            </S.ContainerStep>
                            <S.ContainerStepMobile className="individual">
                              <S.CustomLabelSteps className="title">
                                Status da Remessa
                              </S.CustomLabelSteps>
                              <MobileStepper
                                variant="progress"
                                steps={7}
                                position="static"
                                activeStep={
                                  ship.status === "pending_payment"
                                    ? 0
                                    : ship.status === "awaiting_confirmation"
                                    ? 1
                                    : ship.status === "processing"
                                    ? 1
                                    : ship.status === "billed"
                                    ? 2
                                    : ship.status === "ready_to_delivery"
                                    ? 3
                                    : ship.status === "shipped"
                                    ? 4
                                    : ship.status === "transit"
                                    ? 5
                                    : ship.status === "delivered"
                                    ? 6
                                    : 6
                                }
                                sx={{ flexGrow: 1 }}
                              />

                              <S.CustomLabelSteps>
                                {ship.status === "pending_payment"
                                  ? "Aguardando Pagamento"
                                  : ship.status === "awaiting_confirmation"
                                  ? "Em Processo"
                                  : ship.status === "processing"
                                  ? "Em Processo"
                                  : ship.status === "billed"
                                  ? "Faturado"
                                  : ship.status === "ready_to_delivery"
                                  ? "Pronto para Retirada"
                                  : ship.status === "shipped"
                                  ? "Enviado"
                                  : ship.status === "transit"
                                  ? "Em Transporte"
                                  : ship.status === "delivered"
                                  ? "Entregue"
                                  : "Entregue"}
                              </S.CustomLabelSteps>
                            </S.ContainerStepMobile>
                          </>
                        ) : (
                          <>
                            <S.CustomLabelSteps className="title desk">
                              Status do Pedido
                            </S.CustomLabelSteps>
                            <S.ContainerCancel>
                              <Cancel />
                              <div className="canceled">Cancelado</div>
                            </S.ContainerCancel>
                          </>
                        )}

                        <S.History>
                          <h2>Histórico da remessa</h2>
                          <S.HistoryData>
                            {order.status_label !== "Cancelado" && (
                              <>
                                <strong>Código NF:</strong>{" "}
                                {ship.note_number
                                  ? ship.note_number
                                  : "Aguardando faturamento"}{" "}
                                <hr />
                                <strong>Chave NF:</strong>{" "}
                                {ship.note_key
                                  ? ship.note_key
                                  : "Aguardando faturamento"}{" "}
                                <hr />
                                <strong>Código de Rastreio:</strong>{" "}
                                {ship.code_tracking
                                  ? ship.code_tracking
                                  : "Aguardando despacho"}{" "}
                                <hr />
                                <strong> URL de Rastreio:</strong>{" "}
                                <a
                                  target="_new"
                                  href={
                                    ship.url_tracking ? ship.url_tracking : "#"
                                  }
                                >
                                  {ship.url_tracking
                                    ? ship.url_tracking
                                    : "Aguardando despacho"}
                                </a>
                                <hr />
                                <strong>Data do Despacho:</strong>{" "}
                                {ship.dispatch_date
                                  ? ship.dispatch_date
                                  : "Aguardando despacho"}{" "}
                                <hr />
                                <strong>Tempo de entrega:</strong>{" "}
                                {ship.delivery_time
                                  ? ship.delivery_time + " Dia(s) Úteis "
                                  : "Aguardando despacho"}{" "}
                                <hr />
                                <strong>Previsão de Entrega:</strong>{" "}
                                {ship.delivery_forecast
                                  ? ship.delivery_forecast
                                  : "Aguardando despacho"}{" "}
                              </>
                            )}
                          </S.HistoryData>
                        </S.History>
                      </S.ContainerProduto>
                    ))}
                  </S.LeftContainer>
                )}

                <S.RightContainer>
                  <BoxOrderDataPayment
                    order={order}
                    status={status}
                    tentatives={tentatives}
                  />
                </S.RightContainer>
              </S.List>
            </S.Products>
            <button
              className="buttonVoltar negativeButton notebook"
              onClick={() => history.push("/profile/orders")}
            >
              Histórico de Pedidos
            </button>
          </S.ContainerGeneral>
        </>
      )}
    </>
  );
}

export default OrderDataComponent;
