import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cookies from 'js-cookie';
import { BrowserRouter as Router } from 'react-router-dom';
import Head from './Head.js';

jest.mock('js-cookie', () => ({
    remove: jest.fn(),
}));

// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
// import Head from './Head';

// describe("checking head component",()=>{
//     test ("check for rendering of components",()=>{
//          render(
//         < Router>
//         <Head/>
//         </Router> 
//     )

//     const home=screen.getAllByText(/Home/i)[0]
//     const contact=screen.getAllByText(/contact us/i)[0]
//   const log=screen.getAllByText(/Logout/i)[0]
//     expect (home).toBeInTheDocument();
//    expect(contact).toBeInTheDocument();
//    expect(log).toBeInTheDocument();


//     })
describe("checking head component", () => {
    test("check for rendering of components", () => {
        render(
            <Router>
                <Head setSubmittedValue={jest.fn()} />
            </Router>
        );

        const home = screen.getAllByText(/Home/i)[0];
        const contact = screen.getAllByText(/Contact us/i)[0];
        const logout = screen.getAllByText(/Logout/i)[0];
        expect(home).toBeInTheDocument();
        expect(contact).toBeInTheDocument();
        expect(logout).toBeInTheDocument();
    });

    test("check if logout button works", () => {
        render(
            <Router>
                <Head setSubmittedValue={jest.fn()} />
            </Router>
        );

        const logoutButton = screen.getAllByText(/Logout/i)[0];
        fireEvent.click(logoutButton);
        expect(Cookies.remove).toHaveBeenCalledWith("jwt_token");
        expect(Cookies.remove).toHaveBeenCalledWith("user");
    });

    // test("check if menu toggles on hamburger click", () => {
    //     render(
    //         <Router>
    //             <Head setSubmittedValue={jest.fn()} />
    //         </Router>
    //     );

    //     const hamburgerMenu = screen.getByRole('button', { name: /hamburger menu/i });
    //     fireEvent.click(hamburgerMenu);
    //     const mobileNavLinks = screen.getByRole('navigation', { name: /mobile nav links/i });
    //     expect(mobileNavLinks).toHaveClass('active');
    // });

    test("check if searchbar renders", () => {
        render(
            <Router>
                <Head setSubmittedValue={jest.fn()} />
            </Router>
        );

        const searchbar = screen.getAllByRole('textbox')[0];
        expect(searchbar).toBeInTheDocument();
    });
});
