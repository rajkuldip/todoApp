import React from 'react';
import { Button, Container, Row, Col, Form, Stack } from 'react-bootstrap';
import { useTodoEvents } from '../hooks/useTodoEvents.jsx';
import { Notification } from './Notification';

export const AddTodoItemTestId = "ADD_TODO_ITEM";
export const AddTodoItem = () => {
    const {
        description,
        handleDescriptionChange,
        handleAdd,
        error,
        handleClear
    } = useTodoEvents();
    return (
      <Container data-testid={`${AddTodoItemTestId}_CONTAINER`}>
        { error && <Notification message={error} testid={`${AddTodoItemTestId}_NOTIFICATION`}/>}
        <h1>Add Item</h1>
        <Form.Group as={Row} className="mb-3" controlId="formAddTodoItem">
          <Form.Label column sm="2">
            Description
          </Form.Label>
          <Col md="6">
            <Form.Control
              type="text"
              value={description}
              placeholder="Enter description..."
              onChange={handleDescriptionChange}
              data-testid={`${AddTodoItemTestId}_DESCRIPTION`}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 offset-md-2" controlId="formAddTodoItem">
          <Stack direction="horizontal" gap={2}>
            <Button variant="primary" onClick={handleAdd} disabled={!description}  data-testid={`${AddTodoItemTestId}_BUTTON`}>
              Add Item
            </Button>
            <Button variant="secondary" onClick={handleClear} disabled={!description}>
              Clear
            </Button>
          </Stack>
        </Form.Group>
      </Container>
    )
  }
