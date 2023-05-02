import styled from "styled-components";
import { generateMedia } from "styled-media-query";

const customMedia = generateMedia({
  desktop: "1200px",
  notebook: "991px",
  tablet: "768px",
  mobile: "576px",
});

export const ContainerTotal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;

  &.payment {
    margin-bottom: 20px;
  }
  ${customMedia.lessThan("notebook")`
    align-items: flex-start;
   position: unset;
   width:100%;
`}

  h4 {
    font-size: 18px;
    display: flex;
    width: 250px;
    justify-content: center;
    color: var(--font-color);
    font-weight: 700;

    ${customMedia.lessThan("notebook")`
  justify-content:flex-start;
`}

    ${customMedia.lessThan("mobile")`
  font-size:16px;
  
`}
  }

  .buttonVoltar {
    border: 0px;
    display: flex;
    width: 250px;
    padding: 20px;
    justify-content: center;
    padding: 10px;
    margin-top: 10px;
    transition: 0.3s;

    ${customMedia.lessThan("notebook")`
 display:none;
`}

    ${customMedia.lessThan("tablet")`
  
  margin-bottom:140px;
`}

${customMedia.lessThan("mobile")`
  
  margin-bottom:170px;
`}

    :hover {
      /* background: #b9cb96; */
    }
  }
`;

export const ContainerQRCode = styled.div`
  display: flex;
  width: 100%;
  max-width: 200px;
`;

export const Total = styled.div`
  background: #f4f4f5;
  box-shadow: rgb(134 133 133 / 16%) 3px 3px 80px,
    rgb(92 91 91 / 23%) 0px 0px 3px;
  width: 250px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 250px;

  svg {
    width: 50px;
    color: #ce171f;
  }

  .buttonChoose {
    padding: 10px;
    background-color: var(--default-color);
    transition: 0.3s;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    font-weight: bold;
    margin-top: 10px;
    border: 0px;
    cursor: pointer;

    :hover {
      background-color: var(--default-color-hover);
    }
  }

  img {
    width: 70px;
  }

  ${customMedia.lessThan("notebook")`
  width:100%;
`}

  .containerBoxDataPayment {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span {
      display: flex;
      align-items: center;
      font-size: 18px;
      justify-content: center;
      font-weight: bold;
    }
  }

  p {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    font-size: 16px;
    color: #000;
    margin: 15px 0;

    &.paymentError {
      color: #ce171f;

      &.pending {
        color: #c7b300;
      }

      &.strong {
        font-weight: bold;
      }
    }

    span {
      font-size: 18px;
      margin-top: 10px;
      font-weight: bold;
      position: relative;
    }
  }
`;

export const StatusPayment = styled.div`
  font-size: 16px !important;
  font-weight: bold;
  color: #ce171f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 25px;
  margin-top: 10px;

  &.accomplished {
    color: var(--bt-purchase-color);

    svg {
      width: 50px;
      color: var(--bt-purchase-color);
    }
  }
`;
