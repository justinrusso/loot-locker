import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);
    const [formToggle, setFormToggle] = useState(true)

    return (
        <>
            <button id="login-button" onClick={() => setShowModal(true)}>Log In</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    {formToggle ? <LoginForm toSignUp={() => setFormToggle(false)} /> : <SignUpForm toLogin={() => setFormToggle(true)} />}
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
