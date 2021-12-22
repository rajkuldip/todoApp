import { render, screen, fireEvent } from '@testing-library/react';
import { AddTodoItem, AddTodoItemTestId } from '..';

jest.mock('axios');
const todoTask = "test task";
describe("AddTodoItem component", () => {

    const setup = () => {
        const utils = render(<AddTodoItem />)
        const container = screen.getByTestId(`${AddTodoItemTestId}_CONTAINER`);
        const button = screen.getByTestId(`${AddTodoItemTestId}_BUTTON`);
        const description = screen.getByTestId(`${AddTodoItemTestId}_DESCRIPTION`);
        return {
          container,
          button,
          description,
          ...utils,
        }
    };
    it("loads the component correctly", () => {
        const { container } = setup();
        expect(container).toBeInTheDocument();
    });
    it("loads the disabled button", () => {
        const { button } = setup();
        expect(button).toHaveProperty('disabled', true);
    });
    it("enables button when description set", async () => {
        const { description } = setup();
        fireEvent.change(description, { target: { value: todoTask}});
        expect(description.value).toBe(todoTask);        
    });

})