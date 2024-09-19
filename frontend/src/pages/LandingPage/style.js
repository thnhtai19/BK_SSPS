import styled from "styled-components";

export const WrapperHeader = styled.div`
    height: 80px;
    background: #FFF;
    align-items: center;
    justify-content: center;
    display: flex;
    padding: 0 120px;
    position: relative;
    border-bottom: 1px solid #F3F3FF;

    .container{
        align-items: center;    
        max-width: 1200px;
        justify-content: space-between;
        display: flex;
        width: 100%;
    }

    @media (max-width: 950px) {
        padding: 0 20px;
    }
`;

export const WrapperLogo = styled.div`
    display: flex;
    align-items: center;
    gap: 3px;
`;

export const WrapperButton = styled.div`
    display: inline-block;
    padding: 10px 15px;
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    background-color: #0688B4; 
    border: none;
    border-radius: 15px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    &:hover {
        background-color: #01759b;
    }

    &:focus {
        outline: none;
    }
`;

export const WrapperButtonText = styled.div`
    cursor: pointer;
    transition: color 0.3s ease, transform 0.3s ease;

    &:hover {
        color: #0688B4;
    }
`

export const WrapperMainHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 14px;
    font-weight: 600;
    color: #444;

    @media (max-width: 720px) {
        display: none;
    }
`;

export const WrapperRightHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 14px;
    font-weight: 600;
    color: #444;
    width: 180px;
    justify-content: right;

    @media (max-width: 480px) {
        display: none;
    }
`;

export const WrapperMain = styled.div`
    background-color: #FFF;
    padding: 0 120px;
    justify-content: center;
    display: flex;
    padding-bottom: 100px;

    .container{
        max-width: 1200px;
        justify-content: space-between;
        align-items: center;
        display: flex;
        width: 100%;
    }

    @media (max-width: 950px) {
        padding: 0px 20px 100px 20px;
    }

    @media (max-width: 1500px) {
        height: 100vh;
    }
`;

export const WrapperMainIntro = styled.div`
    display: flex;
    align-items: center;

    @media (max-width: 720px) {
        display: block;
    }
`;

export const WrapperMainLeft = styled.div`
    width: 40%;

    .main-text{
        font-size: 28px;
        font-weight: bold;
        color: #111;
    }

    .title-text{
        font-size: 17px;
        font-weight: bold;
        color: transparent;
        background: linear-gradient(45deg, #007acc, #98d3ea );
        padding-top: 10px;
        background-clip: text;
    }

    .small-text{
        font-size: 14px;
        font-weight: 300;
        color: #444;
        padding-top: 10px;
    }

    .button-text{
        padding-top: 30px;
    }

    @media (max-width: 720px) {
         width: 100%;

         .main-text{
            font-size: 22px;
            padding-top: 40px;
        }
    }

`;
export const WrapperMainRight = styled.div`
    flex: 1;

    .img-print {
        width: 100%;
        padding-top: 30px; 
        display: flex; 
        justify-content: right;
        align-items: center;
    }

    .img-print img {
        width: 80%;
        height: auto;
        object-fit: contain;
    }

    @media (max-width: 720px) {
         width: 100%;
         padding-top: 20px;

        .img-print{
            justify-content: center;
        } 

        .img-print img{
            width: 70%;
            justify-content: center;
        }
    }
`;

export const WrapperFooter = styled.div`;
    background-color: #F9F9F9;
    font-size: 14px;
    padding: 20px;
    display: flex;
    justify-content: center;
    color: #444;
`;

export const HamburgerIcon = styled.div`
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    width: 30px;
    height: 25px;
    color: #444;

    div {
        background-color: #999;
        height: 3px;
        width: 100%;
        border-radius: 5px;
    }

    @media (max-width: 480px) {
        display: flex;
    }
`;

export const MobileMenu = styled.div`
    position: absolute;
    top: 70px;
    right: 20px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    padding: 10px;

    div {
        padding: 10px;
        cursor: pointer;
        text-align: center;
        font-size: 16px;
        &:hover {
            background-color: #f0f0f0;
        }
    }
`;

export const WrapperMain2 = styled.div`
    padding: 50px 120px 80px 120px;
    background-color: #d4f0f9;
    justify-content: center;
    display: flex;

    .container{
        max-width: 1200px;
        justify-content: space-between;
        display: flex;
        width: 100%;
    }


    .extend-title{
        text-align: center; 
        width: 100%;
        color: #444;
        font-size: 16px;
        font-weight: 600;
    }

    .extend-card-container{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
        padding: 16px; 
    }

    .extend-card{
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
        text-align: center;
    }

    .extend-card .title{
        font-size: 20px;
        color: #16215B;
        font-weight: bold;
        width: 100%;
    }

    .extend-card .content{
        font-size: 14px;
        color: #444;
        width: 90%;
    }

    @media (max-width: 950px) {
        padding: 80px 20px;
    }

    @media (max-width: 720px) {
        .extend-card-container{
            grid-template-columns: repeat(2, 1fr);
        }
        padding: 30px 20px;
    }
`

export const WrapperMain3 = styled.div`
    padding: 50px 120px;
    background: #fff;
    justify-content: center;
    display: flex;

    .maincontainer{
        max-width: 1200px;
        justify-content: space-between;
        display: flex;
        width: 100%;
    }

    .container{
        display: flex;
        gap: 20px;
        width: 100%
    }
    .container .left{
        width: 50%;
        padding-top: 50px;
    }

    .container .right{
        width: 50%;
        display: flex; 
        justify-content: right;
        align-items: center;
    }

    .title{
        width: 100%;
        color: #444;
        font-size: 40px;
    }
    
    .small-text{
        width: 100%;
        color: #444;
        font-size: 15px;
        padding-top: 10px;
    }

    .button-area{
        padding: 20px 0;
        gap: 10px;
        display: flex;
    }

    @media (max-width: 950px) {
        padding: 50px;

        .title{
            font-size: 30px;
        }
    }

    @media (max-width: 720px) {
        .title{
            font-size: 20px;
        }

        .container{
         display: block; 
        }  
         
        .container .left{
            width: 100%;
        }

        .container .right{
            width: 100%;
            justify-content: center;
            padding-top: 0px;
        }


    }
`