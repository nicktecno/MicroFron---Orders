import QRCode from "react-qr-code";

import * as S from "./style";
import currencyFormat from "../../services/currencyFormat";
import notification from "../../services/notification";
import { useRouter } from "next/router";

import { Checkbox } from "@styled-icons/foundation/Checkbox";
import { Cancel } from "@styled-icons/material-outlined/Cancel";

function BoxOrderDataPayment({ status, order, tentatives }) {
  const history = useRouter();

  function copyText(link) {
    notification("Código copiado", "success");
    navigator.clipboard.writeText(link);
  }
  return (
    <>
      {order.status !== "canceled" && order.status !== "desisted" ? (
        <>
          <S.ContainerTotal className="payment">
            <h4>Pagamento</h4>

            {status.status === "400" ? (
              <>
                <S.Total>
                  <p className="paymentError">Erro ao processar pagamento</p>
                  <p className="paymentError strong">
                    {status.error.message === "invalid cpf" && "CPF inválido"}
                  </p>
                </S.Total>
              </>
            ) : status.status === "antifraud:declined" ? (
              <>
                <S.Total>
                  <p className="paymentError">Erro ao processar pagamento</p>
                  <p className="paymentError strong">
                    Recusado pelo sistema de antifraude
                  </p>
                </S.Total>
              </>
            ) : status.status === "antifraud:pending" ? (
              <>
                <S.Total>
                  <p className="paymentError pending">Pagamento em análise</p>
                  <p className="paymentError pending strong">
                    Pendente no sistema de antifraude
                  </p>
                </S.Total>
              </>
            ) : status.status === "waiting_payment" ? (
              <S.Total>
                {status.method === "pix" ? (
                  <>
                    <p>Escaneie o código e efetue o pagamento</p>
                    <S.ContainerQRCode>
                      <QRCode
                        size={256}
                        style={{
                          height: "auto",
                          maxWidth: "100%",
                          width: "100%",
                        }}
                        value={status.pix.qrcode}
                        viewBox={`0 0 256 256`}
                      />
                    </S.ContainerQRCode>
                    <button
                      className="buttonChoose"
                      onClick={() => copyText(status.pix.qrcode)}
                    >
                      Copiar Código
                    </button>
                    {status.status === "waiting_payment" && (
                      <S.StatusPayment>Aguardando pagamento</S.StatusPayment>
                    )}
                  </>
                ) : status.method === "boleto" ? (
                  <div className="containerBoxDataPayment">
                    <p>Copie o código e efetue o pagamento</p>
                    <span>{status.boleto.barcode}</span>
                    <button
                      className="buttonChoose"
                      onClick={() => copyText(status.boleto.barcode)}
                    >
                      Copiar Código
                    </button>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={status.boleto.url}
                      className="buttonChoose"
                    >
                      Ver Boleto
                    </a>

                    {status.status === "waiting_payment" && (
                      <S.StatusPayment>Aguardando pagamento</S.StatusPayment>
                    )}
                  </div>
                ) : (
                  <div className="containerBoxDataPayment">
                    <p>Pagamento feito com o cartão de final</p>
                    <span>{status.credit_card?.last_digits}</span>
                    <S.StatusPayment>Aguardando pagamento</S.StatusPayment>
                  </div>
                )}
              </S.Total>
            ) : status === false ? (
              <S.Total>
                <div className="containerBoxDataPayment">
                  <S.StatusPayment>
                    {tentatives <= 10
                      ? "Pagamento pendente em processamento!"
                      : "Error ao processar pagamento"}
                  </S.StatusPayment>
                  {tentatives <= 10 && (
                    <img src="/images/loadingIcon.svg" alt="Loading" />
                  )}
                </div>
              </S.Total>
            ) : (
              <S.Total>
                <div className="containerBoxDataPayment">
                  {status.method === "credit_card" && (
                    <>
                      <p>Pagamento feito com o cartão de final</p>
                      <span>{status.credit_card?.lastDigits}</span>
                    </>
                  )}
                  <S.StatusPayment className="accomplished">
                    <Checkbox width={50} />
                    Pagamento Efetuado!
                  </S.StatusPayment>
                </div>
              </S.Total>
            )}
          </S.ContainerTotal>
          <S.ContainerTotal>
            <h4>Resumo da Compra</h4>
            <S.Total>
              <p>
                Sub Total <span>{currencyFormat(order.sub_total)}</span>
              </p>
              {/* <p>
    Desconto <span>{currencyFormat(order.discount)}</span>
  </p> */}
              <p>
                Envio <span>{currencyFormat(order.shipping_amount)}</span>
              </p>
              <p>
                Total <span>{currencyFormat(order.grand_total)}</span>
              </p>
            </S.Total>
            <button
              className="buttonVoltar negativeButton"
              onClick={() => history.push("/profile/orders")}
            >
              Histórico de Pedidos
            </button>
          </S.ContainerTotal>
        </>
      ) : (
        <S.ContainerTotal className="payment">
          <h4>Pagamento</h4>

          <>
            <S.Total>
              <Cancel />
              <p className="paymentError">Pedido Cancelado</p>
            </S.Total>
          </>
        </S.ContainerTotal>
      )}
    </>
  );
}

export default BoxOrderDataPayment;
