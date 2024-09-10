import React from "react";
import { MyDocument } from "../Components/PdfDocument";
import jsPDF from "jspdf";
export function ThankYou(){
    const booking = JSON.parse(localStorage.getItem("booking"));
    const user = JSON.parse(localStorage.getItem("user"))
    const MyDocument = () => {
        let doc = new jsPDF("p", "pt");
        // Add invoice header
        doc.setFontSize(24);
        doc.text("Ebooking", 40, 60);
        doc.setFontSize(10);
        doc.text("Invoice Number: 123456", 40, 90);
        doc.text("Date: " + new Date().toDateString(), 40, 110);
        doc.text(`Customer Name: ${user.fullName}`, 40, 130);
        doc.text(`Customer Address: `, 40, 150);
        // Add items section
        doc.setFontSize(14);
        doc.text("Booking details:", 40, 200);
        doc.line(40, 210, 550, 210);
        // Add item details
        
        
        doc.setFontSize(12);
        let yOffset = 240;
        doc.text(`Booking id: ${2303}`,40,yOffset)
        doc.text(`Location: ${booking.destination.country.countryCode}, ${booking.destination.city.cityName}`,200,yOffset)
        
        // Add total
        doc.setFontSize(14);
        doc.text(`Total: $${booking.amount}`, 400, yOffset + 30);
        // Save the generated PDF as "invoice.pdf"
        doc.save("invoice.pdf");
      
    }
    return(
        <div className="row">
            <button className="btn btn-light" onClick={MyDocument}>Download booking</button>
        </div>
    )
}