import React from "react";


export function Footer() {
    return (
        <footer className="bg-light text-center py-3 mt-4">
            <p>&copy; {new Date().getFullYear()} EBooking. All rights reserved.</p>
        </footer>
    );
}