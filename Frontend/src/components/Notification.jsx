import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

export const Notification = ({ message, testId }) => {
    const [show, setShow] = useState(true);

    return show && (
        <Alert variant="danger" dismissible onClose={() => setShow(false)} data-testId={testId}>
            { message }
        </Alert>
    );


}