import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import Books from '../Assets/Books.jpg';
import styled from 'styled-components';

const Styles = styled.div`
    .jumbo {
        background: url(${Books});
        background: cover;
        color: #fff;
        height: '200px';
        padding-left: '100px';
        position: relative;
        border-radius: 0 !important;
    }
    .overlay {
        opacity: 0.96;
        padding-left: 15px;
    }
`;

export default function jumbotron() {
    return(
        <Styles>
            <Jumbotron fluid className="jumbo">
                <div className="overlay">
                    <h1>О сервисе</h1>
                    <p>
                        Этот сервис создан для того, чтобы ты никогда не забыл о фильме или книге
                        с которыми всегда хотел ознакомиться.
                    </p>   
                </div>
            </Jumbotron>
        </Styles>
    )
}
