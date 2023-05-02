import styled from "styled-components";
import { generateMedia } from "styled-media-query";

const customMedia = generateMedia({
  desktop: "1200px",
  notebook: "991px",
  tablet: "768px",
  mobile: "576px",
});

export const ContainerLoading = styled.div`
  display: flex;
  width: 100%;
  margin-top: 50px;
`;

export const ContainerCancel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  .canceled {
    background-color: transparent !important;
    font-size: 16px;
    font-weight: bold;
  }

  svg {
    width: 30px;
    color: #ce171f;
  }
`;

export const ContainerGeneral = styled.div`
  height: 100%;

  flex-direction: column;
  padding: 0px 12%;
  display: flex;
  width: 100%;
  position: relative;

  align-items: center;
  align-self: center;

  ${customMedia.lessThan("1366px")`
    padding: 0px 5%;
  `}

  ${customMedia.lessThan("tablet")`
    padding:0px 20px;
  `}

  .buttonVoltar {
    padding: 10px 50px;

    ${customMedia.greaterThan("notebook")`
    &.notebook{
    display:none
}
  `}
  }
`;

export const Breadcrumb = styled.div`
  width: 100%;
  height: 65px;
  margin-bottom: 40px;
  position: relative;
  max-width: 1920px;

  color: black;
  padding-top: 40px;

  span {
    font-weight: bold;
  }

  a {
    color: #292728;
    transition: 0.3s;
    cursor: pointer;
  }
`;

export const List = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 30px;
  justify-content: flex-start;

  ${customMedia.lessThan("notebook")`
    flex-direction:column;
    justify-content:center;
`}
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;

  ${customMedia.lessThan("notebook")`
  width:100%;
`}
`;

export const ContainerAddressPayment = styled.div`
  display: flex;
  justify-content: space-between;

  ${customMedia.lessThan("tablet")`
  
  flex-direction:column;

`}
`;

export const ContainerAddress = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 600;
  font-size: 18px;
  width: 60%;
  color: var(--font-color);

  ${customMedia.lessThan("mobile")`
  font-size:16px;
  
`}

  ${customMedia.lessThan("tablet")`
  width:100%;
  margin-bottom:30px;
  
`}

  div.addressBox {
    font-size: 14px;
    padding: 15px 25px;
    display: flex;
    color: black;
    background: #f4f4f5;
    box-shadow: rgb(134 133 133 / 16%) 1px 1px 5px,
      rgb(92 91 91 / 23%) 0px 0px 0px;
    margin-top: 10px !important;
    margin: 0px;
    min-height: 140px;
    font-weight: 500;
    ${customMedia.lessThan("tablet")`
      display:flex;
      align-items:center;
    `}

    .containerSvg {
      display: flex;
      align-items: center;
    }

    svg {
      width: 50px;
      margin-right: 20px;
    }
  }

  span {
    display: flex;
    width: 100%;
    font-size: 16px;

    align-items: center;
    flex-wrap: wrap;
  }
`;

export const ContainerStep = styled.div`
  display: flex;
  ${customMedia.lessThan("mobile")`
  display:none;
  
`}

  &.individual {
    ${customMedia.lessThan("notebook")`
  display:none;
  
`}
  }
`;

export const ContainerStepMobile = styled.div`
  display: none;

  &.individual {
    ${customMedia.lessThan("notebook")`
  justify-content:center;
 
  
  display:flex;
  flex-direction:column;

  .MuiMobileStepper-progress{
    width:100%;
  }
  

  
`}
  }
  ${customMedia.lessThan("mobile")`
  justify-content:center;
 
  
  display:flex;
  flex-direction:column;

  .MuiMobileStepper-progress{
    width:100%;
  }
  
`}
`;

export const CustomLabelSteps = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  font-weight: bold;

  &.desk {
    align-items: flex-start;
    justify-content: flex-start;
    padding: 5px 0px;
    ${customMedia.lessThan("mobile")`
  display:none
  
`}
  }
  &.title {
    font-size: 18px;
    ${customMedia.lessThan("mobile")`
  font-size:16px;
  
`}
  }
`;

export const pagamento = styled.div`
  display: flex;
  flex-direction: column;

  width: 35%;

  ${customMedia.lessThan("tablet")`
  width:100%;
  margin-bottom:30px;
  
`}

  p {
    font-size: 18px;
    color: var(--font-color);
    font-weight: bold;
    margin: 0px;

    ${customMedia.lessThan("mobile")`
  font-size:16px;
  
`}
  }
`;

export const MethodChoosed = styled.div`
  padding: 15px 25px;
  display: flex;
  color: black;
  flex-direction: column;
  background: #f4f4f5;
  min-height: 140px;

  margin-top: 10px !important;
  margin: 0px;
  justify-content: center;
  box-shadow: rgb(134 133 133 / 16%) 1px 1px 5px,
    rgb(92 91 91 / 23%) 0px 0px 0px;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  svg {
    width: 50px;
    margin-right: 20px;
  }
  a {
    border: 0px;
    font-weight: bold;
    padding: 10px 20px;
    background: var(--default-color);
    color: var(--title-color);
    transition: 0.3s;
  }

  .containerCard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .portions {
      font-size: 16px;
    }
  }
  div {
    font-weight: bold;
    border: 0px;
    font-size: 20px;
    padding: 10px 20px;
  }
`;

export const History = styled.div`
  margin-top: 15px;
  h2 {
    color: #292728;
    font-size: 18px;
    font-weight: bold;

    ${customMedia.lessThan("mobile")`
  font-size:16px;
`}
  }
`;

export const HistoryData = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffff;
  box-shadow: rgb(134 133 133 / 16%) 1px 1px 5px,
    rgb(92 91 91 / 23%) 0px 0px 0px;
  padding: 20px 25px;
`;

export const ContainerProduto = styled.div`
  display: flex;
  margin-top: 10px;
  width: 100%;
  flex-direction: column;
  background: #f4f4f5;
  padding: 15px 15px;

  p {
    font-size: 18px;
    margin-top: 5px;

    ${customMedia.lessThan("mobile")`
  font-size:16px;
`}
  }
  .spanMetodoEnvio {
    align-self: flex-end;
    font-weight: bold;
    font-size: 18px;
    ${customMedia.lessThan("mobile")`
  font-size:16px;
`}
  }
`;

export const ContainerProdutoMap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const remersa = styled.div`
  margin: 10px 0px 10px 0px;

  h4 {
    display: flex;
    font-size: 18px;
    color: #292728;
    font-weight: bold;
    justify-content: space-between;
    ${customMedia.lessThan("mobile")`
  font-size:16px;
`}
  }
  .sellerName {
    display: flex;
    font-size: 18px;

    ${customMedia.lessThan("mobile")`
  font-size:16px;
  flex-direction:column;
`}

    strong {
      margin-left: 5px;

      ${customMedia.lessThan("mobile")`
  margin-top:5px;
  margin-left:0px;
`}
    }
  }
`;

export const ContainerCaixaItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const caixaItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  width: 100%;
  background: #ffff;
  box-shadow: rgb(134 133 133 / 16%) 1px 1px 5px,
    rgb(92 91 91 / 23%) 0px 0px 0px;

  padding: 20px 30px;
  align-items: center;
  justify-content: space-between;

  ${customMedia.lessThan("450px")`
  flex-direction:column;
  justify-content:center;
  gap:10px;
`}
`;

export const imgitemDescricao = styled.div`
  display: flex;
  height: auto;
  width: 700px;
  align-items: center;

  ${customMedia.lessThan("450px")`
  width: 300px;
 
`}
  ${customMedia.lessThan("360px")`
  width: 150px;
 
`}
  ${customMedia.lessThan("360px")`
  
  flex-direction:column;
  justify-content:center;
`}

  .containerImg {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;

    ${customMedia.lessThan("360px")`
    margin-bottom:20px;
    width:70px;
    height:70px;
`}

    img {
      width: 100px;
      height: 100px;
      ${customMedia.lessThan("360px")`
  width:70px;
  height:70px;
`}
    }
  }

  .blocoNome {
    margin: 0 10px 0 20px;
    max-width: 200px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;

    ${customMedia.lessThan("tablet")`
    margin: 0 20px 0 20px;
`}
    ${customMedia.lessThan("450px")`
    margin: 0 0px 0 20px;
`}
 ${customMedia.lessThan("360px")`
      
      margin:0px;
     `}
 

    

    h3 {
      display: flex;
      width: 100%;
      height: auto;
      font-size: 15px;
      min-height: 50px;
      font-weight: bold;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      ${customMedia.lessThan("360px")`
      
  justify-content: center;
  align-items:center;
  text-align:center;
`}

      ::-webkit-scrollbar {
        width: 7px;
        height: 6px;
      }

      /* Track */
      ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 10px;
      }

      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 5px;
        transition: 0.3s;
      }

      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: #ccc;
      }
    }

    ul {
      display: flex;
      width: 100%;
      height: auto;
      font-size: 15px;
      flex-direction: column;
      overflow: auto;
      padding: 0px;
      li {
        margin-bottom: 5px;
        display: flex;
        flex-wrap: wrap;
        ${customMedia.lessThan("360px")`
      
      justify-content: center;
      align-items:center;
      text-align:center;
    `}
      }
    }
    h4 {
      display: flex;
      font-size: 12px;
      color: black;
    }
    p {
      display: flex;
      font-size: 18px;
      color: black;
    }
    .circulo {
      margin: initial;
      margin-top: 5px;
    }
    .circulo img {
      margin-right: 5px;
    }
    .circulo span {
      position: relative;
      bottom: 3px;
    }
    span {
      font-size: 12px;
      color: black;
      font-weight: bold;
    }
  }

  b {
    margin-left: 2px;
  }
`;

export const descritem = styled.div`
  display: flex;
  margin-left: 10px;
  padding-top: 5px;
  margin-bottom: 20px;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  align-items: center;

  ${customMedia.lessThan("mobile")`
  flex-direction:column;
  justify-content:center;
`}

  ${customMedia.lessThan("450px")`
  margin-bottom:0px;
`}



  .qtd {
    margin-bottom: 0px !important;
    span {
      font-weight: bold;
    }
  }

  .preco {
    font-weight: bold;
    margin: 0px;
  }
`;

export const Products = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  max-width: 1920px;
`;
export const ContainerTotal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;

  &.payment {
    margin-bottom: 20px;
  }
  ${customMedia.lessThan("notebook")`
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
  margin-top:20px;
  margin-bottom:20px;
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

export const RightContainer = styled.div`
  display: flex;
  flex: 1;
  align-content: flex-end;
  flex-direction: column;
  ${customMedia.lessThan("notebook")`
  display:none;
`}
`;

export const DataPaymentNotebook = styled.div`
  display: none;

  ${customMedia.lessThan("notebook")`
  display: flex;
  flex: 1;
  justify-content:center;
  align-items: center;
  flex-direction: column;
  margin-top:30px;
  margin-bottom:20px;
  width:100%;
`}
`;

export const bts = styled.div`
  display: none;
  .cinza {
    background-color: #7f7f7f;
  }
`;

export const bt = styled.div`
  width: 200px;
  height: 50px;
  background-color: #ce171f;
  color: #fff;
  font-size: 14px;
  padding-top: 15px;
  border-radius: 50px;
  text-align: center;
  margin: 15px 0;
  ${customMedia.lessThan("tablet")`
    position: relative;
    margin: 15px auto;  
    `}
`;
