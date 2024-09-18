import React, { useState } from "react";
import jsPDF from "jspdf";
import QRCode from 'qrcode'; 
import { Header } from "../Components/Header";
import { ToastContainer, toast } from 'react-toastify'; // For notification
import 'react-toastify/dist/ReactToastify.css';
 // Toast CSS

export function ThankYou() {
    const booking = JSON.parse(localStorage.getItem("booking"));
    const user = JSON.parse(localStorage.getItem("user"));
    const [loading, setLoading] = useState(false);

    const MyDocument = () => {
        setLoading(true);
        let doc = new jsPDF("p", "pt");

        // Add invoice header
        doc.setFontSize(24);
        doc.text("Ebooking", 40, 60);
        doc.setFontSize(10);
        doc.text("Invoice Number: 123456", 40, 90);
        doc.text("Date: " + new Date().toDateString(), 40, 110);
        doc.text(`Customer Name: ${user.fullName}`, 40, 130);
        // Add items section
        doc.setFontSize(14);
        doc.text("Booking details:", 40, 200);
        doc.line(40, 210, 550, 210);

        // Add item details
        doc.setFontSize(12);
        let yOffset = 240;
        doc.text(`Reference id: ${booking.id}`, 40, yOffset);
        doc.text(`Location: ${booking.listing?.location?.city?.cityName}, ${booking.listing?.location?.country?.countryCode}`, 200, yOffset);
        doc.setFontSize(12);

        doc.text(`Check-in: ${booking.checkInDate}`, 350, yOffset);
        doc.text(`Check-out: ${booking.checkOutDate}`, 40, yOffset+20);

        // Add total
        doc.setFontSize(14);
        doc.text(`Total: $${booking.amount}`, 400, yOffset + 70);

        // Generate QR code and add it to the PDF
        const qrCodeValue = "https://www.github.com"; 
        QRCode.toDataURL(qrCodeValue, { width: 100 }, (err, url) => {
            if (err) {
                console.error(err);
                toast.error("Error generating QR code!");
                setLoading(false);
            } else {
                doc.addImage(url, "PNG", 400, 600, 100, 100);
                doc.save("invoice.pdf");
                toast.success("PDF Downloaded!");
                setLoading(false);
            }
        });
    };


    return (
        <div className="row">
            <Header />
            <div className="row justify-content-center mt-4">
                <div className="col-xl-4">
                  <button className="btn btn-primary" onClick={MyDocument} disabled={loading}>
                    {loading ? 'Generating...' : 'Download Booking'}
                  </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
