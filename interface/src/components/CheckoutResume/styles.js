import styled from "styled-components";

export const Container = styled.div`
  background-color: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  margin-right: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 20vw;
  * {
    color: #484848;
    font-weight: 500;
  }
  .container-top {
    width: 100%;
    border-radius: 20px;
    display: grid;
    color: #828282;
    grid-gap: 5px 20%;
    grid-template-areas:
    'title title'
    'items items-price'
    'delivery-tax delivery-tax-price';
  }
  .title {
    grid-area:title;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
    background-color: #484848;
    color: #fff;
    width: 100%;
    padding: 12px;
    text-align: center;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  .items { grid-area: items;
    padding: 5px 20px;
  }
  .items-price {
    grid-area: items-price;
    padding: 5px 20px;
    text-align: end;
  }
  .delivery-tax {
    grid-area: delivery-tax;
    padding: 5px 20px;
  }
  .delivery-tax-price {
    grid-area: delivery-tax-price;
    padding: 5px 20px;
    text-align: end;
  }
  .container-bottom {
    display: flex;
    justify-content: space-around;
    gap: 50%;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
    margin-top: 24px;
    width: 100%;
    padding: 20px;
    * {
    color: #484848;
    font-weight: 700;
    }
  }
`
