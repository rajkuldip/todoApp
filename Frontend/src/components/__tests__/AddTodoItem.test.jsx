import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { act } from 'react-dom/test-utils';
import { setupServer } from 'msw/node'
import { API_ENDPOINT } from '../../hooks/useTodoEvents';
import { AddTodoItem, AddTodoItemTestId } from '..'

const todoTask = "test task";
describe("AddTodoItem component", () => {

    const server = setupServer(
        rest.post(API_ENDPOINT, { description: todoTask}, (req, res, ctx) => {
            return res(
                ctx.status(201),
                ctx.json(
                   {
                       response: {
                           data: "Description already exists!"
                       }
                   },
                  ),
            );
        }),
    );

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
    beforeAll(() => {
        server.listen();
      })
      afterAll(() => {
        server.close();
      })
    it("loads the component correctly", () => {
        const { container } = setup();
        expect(container).toBeInTheDocument();
    });
    it("loads the disabled button", () => {
        const { button } = setup();
        expect(button).toHaveProperty('disabled', true);
    });
    it("enables button when description set", async () => {
        const { description, button } = setup();
        act (
            () => {
                fireEvent.change(description, { target: { value: todoTask}});
                fireEvent.click(button);
            }
        );
        
        expect(description.value).toBe(todoTask);
        expect(button).toHaveProperty('disabled', false);
    });

})