
import React from "react";
import { render, screen, fireEvent,waitFor } from "@testing-library/react";
import Login from "./Logincomponent.js";
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";

 describe("login ",()=>{
    
  test("renders login form", () => {
    render(
     
        <BrowserRouter>
        <Login />
       
        </BrowserRouter>
      
    );
  
    expect(screen.getByLabelText(/email id/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/submit/i)).toBeInTheDocument();
  }
);
test("displays 'user not found' if API returns 400", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 400,
    })
  );

  render(
   
    <BrowserRouter>
    <Login />
   
    </BrowserRouter>
   
  );

  fireEvent.change(screen.getByLabelText(/email id:/i), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/password:/i), {
    target: { value: "wrongpassword" },
  });

  fireEvent.click(screen.getByText(/submit/i));

  const errorMessage = await screen.findByText(/user not found/i);
  expect(errorMessage).toBeInTheDocument();
});

test("displays 'Password Error' if API returns any other error", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 401,
    })
  );

  render(
    <BrowserRouter>
    <Login />
   
    </BrowserRouter>
  )

  fireEvent.change(screen.getByLabelText(/email id:/i), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/password:/i), {
    target: { value: "wrongpassword" },
  });

  fireEvent.click(screen.getByText(/submit/i));

  const errorMessage = await screen.findByText(/password error/i);
  expect(errorMessage).toBeInTheDocument();
});



// test("redirects to '/' and sets token on successful login", async () => {
//   global.fetch = jest.fn(() =>
//     Promise.resolve({
//       status: 200,
//       json: () =>
//         Promise.resolve({
//           token: "mocked-token",
//           user: { id: 1, name: "Test User" },
//         }),
//     })
//   );

//   render(
//     <BrowserRouter>
//       <Login />
//       </BrowserRouter>
//   );

//   fireEvent.change(screen.getByLabelText(/email id:/i), {
//     target: { value: "test@example.com" },
//   });
//   fireEvent.change(screen.getByLabelText(/password:/i), {
//     target: { value: "password123" },
//   });

//   fireEvent.click(screen.getByText(/submit/i));

//   await waitFor(() => {
//     expect(Cookies.set).toHaveBeenCalledWith("jwt_token", "mocked-token");
//     expect(Cookies.set).toHaveBeenCalledWith(
//       "user",
//       JSON.stringify({ id: 1, name: "Test User" })
//     );
//     expect(navigate).toHaveBeenCalledWith("/");
//   });
// });
});

     
 


