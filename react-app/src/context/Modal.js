import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import styled from "styled-components";

const ModalContext = createContext();

const ModalDiv = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Background = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
`

const Content = styled.div`
    position: absolute;
    background-color:white;
`

export const ModalProvider = ({ children }) => {
    const modalRef = useRef();
    const [value, setValue] = useState();


    useEffect(() => {
        setValue(modalRef.current);
    }, [])

    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    )
}

export const Modal = ({ onClose, children }) => {
    const modalNode = useContext(ModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <ModalDiv>
            <Background onClick={onClose} />
            <Content>
                {children}
            </Content>
        </ModalDiv>,
        modalNode
    );
}
