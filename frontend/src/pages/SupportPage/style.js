import styled from "styled-components";


export const WrapperContainer = styled.div`
    padding: 0 20px;

    .wrap-text{
        color: #00000;
    }

    .wrap-text-bold{
        font-size: 18px;
        font-weight: bold;

    }

    .wrap-card-area{
        display: flex;
        gap: 20px;
        padding-top: 10px;
    }

    .wrap-card-container{
        background-color: #FFFFFF;
        width: 50%;
        height: 130px;
        border-radius: 15px;
        border: 1px solid #EFF1F3;
        display: flex;
        margin-bottom: 10px;
    }

    .wrap-left-card{
        width: 20%;
        margin: 20px 20px;
        align-items: center;
        justify-content: center;
        display: flex;
    }

    .wrap-right-card{
        width: 80%;
        margin: 10px 5px;
        justify-content: center;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    @media (max-width: 720px) {
         .wrap-card-area{
            display: block;
        }
            
        .wrap-card-container{
            width: 100%;
        }
    }
    
`