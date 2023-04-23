import { add} from '../App';
import { API } from 'aws-amplify';

import { createTodo as createMutation} from '../graphql/mutations';
//import { listTodos } from '../graphql/queries';

describe("your test suite", () => {
    window.URL.createObjectURL = jest.fn();
  
    afterEach(() => {
      window.URL.createObjectURL.mockReset();
    });


const mockGraphql = jest.fn();

beforeEach(() => {
    API.graphql = mockGraphql
});

afterEach(() => {
    jest.clearAllMocks()
});

it('should create a new todo', () => {
    const todo = {name: 'test name', email: 'testemail@gmail.com', phone: '1234567890', address: 'test address', dob: '01-01-1999', job_title: 'test job description', department_name: 'test department', department_id: 'test dept id' }

    add(todo)

    expect(mockGraphql.mock.calls.length).toBe(1);
    expect(mockGraphql.mock.calls[0][0]).toEqual(
        { query: createMutation, variables: { input: todo } }
    );
})


})