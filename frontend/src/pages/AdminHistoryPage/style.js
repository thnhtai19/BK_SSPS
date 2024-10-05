import styled from "styled-components";

export const WrapContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0 20px;
    width: 100%;

    .wrap-filler{
        display: flex;
        font-size: 15px;
        padding: 15px 0;
        gap: 8px;
        align-items: center;
        width: 100%;
    }

    .wrap-text{
        padding-top: 10px;
        color: #00000;
        font-size: 14px;
    }

    .wrap-ttt{
        font-size:15px;
    }

    .wrap-title{
        padding-top: 20px;
        padding-bottom: 20px;
        font-size: 23px;
        color: #0888B4;
        font-weight: bold;
    }

    .wrap-title-container{
        display: flex;
        justify-content: center;
    }

    .inner-box {
      width: 100%; 
      overflow-x: auto; 
      overflow-y: auto;
      background-color: #ffffff;
      padding: 10px;
      box-sizing: border-box;
    }


    @media(max-width: 600px){
        .wrap-title{
            font-size: 19px;
        }
    }

    @media(max-width: 550px){
        .wrap-ttt{
            font-size: 11px;
        }
    }

    @media(max-width: 450px){
        .wrap-title{
            font-size: 14px;
        }
    }
`