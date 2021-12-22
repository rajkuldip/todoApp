import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { useTodoEvents } from '../../hooks/useTodoEvents'
import axios from 'axios';

jest.mock("axios");

describe("Verify handlers", () => {

    const { result } = renderHook(() => useTodoEvents());

    it("Should make get call by getItems method", () => {
        axios.get.mockResolvedValueOnce({
            description: "Description list.",
        });

        act(() => {
          result.current.getItems();
        });

        expect(axios.get).toBeCalled();
    });

    it("Should make post call by handleAdd method", () => {
        axios.post.mockResolvedValueOnce({
            description: "Description added",
        });

        act(() => {
          result.current.handleAdd();
        });

        expect(axios.post).toBeCalled();
    });


});