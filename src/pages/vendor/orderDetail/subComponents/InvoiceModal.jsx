import React, { useState } from 'react';
import { Modal, Box } from '@mui/material';
import { Check } from 'lucide-react';
import Logo from '../../../../assets/auth/appLogo.png';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const InvoiceModal = ({ isOpen, onClose, order }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleProductSelect = (productId) => {
        setSelectedProducts(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const handleClose = () => {
        setSelectedProducts([]);
        onClose();
    };

    const generateInvoice = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;
        const margin = 10;
        const usableWidth = pageWidth - (2 * margin);

        // Set font to a default available font
        doc.setFont('helvetica');

        // Add logo
        doc.addImage(Logo, 'PNG', 5, 3, 30, 28);

        doc.setFontSize(14); // Larger font size for company name
        doc.setTextColor(0, 0, 0); // Black color
        doc.text('OneApp', margin + 3, margin + 20); // Position text below logo

        // Header section
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text('Invoice Number:', 155, 10);

        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`INV-${order?._id?.slice(-5).toUpperCase()}`, 155, 16);

        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text('Invoice Date:', 155, 22);

        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`${new Date().toLocaleDateString()}`, 155, 28);

        // Add divider
        doc.setDrawColor(200, 200, 200);  // Light gray color
        doc.setLineWidth(0.05);           // Thin line to match others
        doc.line(margin, 35, pageWidth - margin, 35);


        // Order details section
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);

        // Left column
        doc.text('Order ID:', margin, 50);
        doc.text('Order Date:', margin, 67);

        doc.setTextColor(100, 100, 100);
        doc.text(`${order?._id.toUpperCase()}`, margin, 57);
        doc.text(`${order?.shippingAddress?.createdAt?.split("T")[0]}`, margin, 74);

        // Vertical separators
        const firstSeparator = margin + 60;
        const secondSeparator = firstSeparator + 60;

        doc.setLineWidth(0.1);
        doc.line(firstSeparator, 45, firstSeparator, 75);
        doc.line(secondSeparator, 45, secondSeparator, 75);

        // Middle column
        doc.setTextColor(0, 0, 0);
        doc.text('Sold By:', firstSeparator + 5, 50);
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(order?.vendor?.companyName, firstSeparator + 5, 57);
        doc.text(order?.vendor?.companyAddress, firstSeparator + 5, 62);
        doc.text(order?.vendor?.companyType, firstSeparator + 5, 67);

        // Right column
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text('Shipping Address:', secondSeparator + 5, 50);
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(order?.shippingAddress?.name || '', secondSeparator + 5, 57);
        doc.text(order?.shippingAddress?.address || '', secondSeparator + 5, 62);
        doc.text(`${order?.shippingAddress?.city}, ${order?.shippingAddress?.state}`, secondSeparator + 5, 67);
        doc.text(order?.shippingAddress?.pinCode || '', secondSeparator + 5, 72);

        // Add divider
        doc.setDrawColor(200, 200, 200);  // Light gray color
        doc.setLineWidth(0.05);           // Thin line to match others
        doc.line(margin, 85, pageWidth - margin, 85);

        // Prepare table data
        const tableData = selectedProducts.map(productId => {
            const product = order?.products.find(p => p._id === productId);
            // if (!product || product.taxPercentage === undefined) {
            //     return ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A"];  // or any default values you prefer
            // }
            return [
                product.productName,
                product.quantity.toString(),
                // product.taxPercentage,
                `${product.taxPercentage}%`,
                (product.couponDiscount || 0).toString(),
                product.offerPrice.toString(),
                (product.total).toString()
            ];
        });

        // Calculate column widths that fit the page
        const columnWidths = {
            0: usableWidth * 0.35,  // Product name (35%)
            1: usableWidth * 0.13,  // Quantity (13%)
            2: usableWidth * 0.13,  // GST (13%)
            3: usableWidth * 0.13,  // Discount (13%)
            4: usableWidth * 0.13,  // Price (13%)
            5: usableWidth * 0.13   // Total (13%)
        };

        // Configure and draw table
        doc.autoTable({
            startY: 95,
            head: [['Product', 'Quantity', 'GST', 'Discount', 'Price', 'Total']],
            body: tableData,
            theme: 'plain',
            styles: {
                fontSize: 9,
                textColor: [100, 100, 100],
                cellPadding: 5,
                overflow: 'linebreak'
            },
            headStyles: {
                textColor: [0, 0, 0],
                fillColor: false,
                fontStyle: 'bold'
            },
            columnStyles: columnWidths,
            margin: { left: margin },
            tableWidth: usableWidth,
            didParseCell: function (data) {
                if (data.column.index !== 0) {
                    data.cell.styles.halign = 'left';
                }
            },
            didDrawCell: function (data) {
                // Draw border below header
                if (data.row.index === 0 && data.section === 'head') {
                    const headerBorderY = data.cell.y + data.cell.height;
                    doc.setDrawColor(200, 200, 200);
                    doc.setLineWidth(0.05);
                    doc.line(margin, headerBorderY, pageWidth - margin, headerBorderY);
                }

                // Draw border after the last row
                if (data.row.index === data.table.body.length - 1 &&
                    data.section === 'body' &&
                    data.column.index === data.table.columns.length - 1) {
                    const footerBorderY = data.cell.y + data.cell.height;
                    doc.setDrawColor(200, 200, 200);
                    doc.setLineWidth(0.05);
                    doc.line(margin, footerBorderY, pageWidth - margin, footerBorderY);
                }
            }
        });

        // Calculate totals
        const subTotal = selectedProducts.reduce((total, productId) => {
            const product = order?.products.find(p => p._id === productId);
            // return total + (product.quantity * product.offerPrice);
            return total + (product.offerPrice);
        }, 0);

        // const totalGst = subTotal * 0.18;
        const totalGst = selectedProducts.reduce((total, productId) => {
            const product = order?.products.find(p => p._id === productId);
            // return total + (product.quantity * product.offerPrice);
            return total + (product.tax);
        }, 0);

        // const totalPrice = subTotal + totalGst;
        const totalPrice = selectedProducts.reduce((total, productId) => {
            const product = order?.products.find(p => p._id === productId);
            // return total + (product.quantity * product.offerPrice);
            return total + (product.total);
        }, 0);

        // Add totals section
        const finalY = doc.previousAutoTable.finalY + 10;
        const totalsWidth = 95;
        const totalsX = pageWidth - margin - totalsWidth;

        // Add totals box
        doc.setFillColor(240, 240, 240);
        doc.rect(totalsX, finalY, totalsWidth, 30, 'F');

        // Add totals content
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('Sub Total:', totalsX + 5, finalY + 7);
        doc.text(`${subTotal.toFixed(2)}`, totalsX + totalsWidth - 5, finalY + 7, { align: 'right' });

        doc.text('Total GST Amount:', totalsX + 5, finalY + 15);
        doc.text(`${totalGst.toFixed(2)}`, totalsX + totalsWidth - 5, finalY + 15, { align: 'right' });

        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text('TOTAL PRICE:', totalsX + 5, finalY + 23);
        doc.setTextColor(100, 100, 100);
        doc.text(`${totalPrice.toFixed(2)}`, totalsX + totalsWidth - 5, finalY + 23, { align: 'right' });

        // Add footer
        const pageHeight = doc.internal.pageSize.height;
        doc.setFillColor(245, 245, 245);
        doc.rect(0, pageHeight - 20, pageWidth, 20, 'F');

        doc.setFontSize(9);
        doc.setTextColor(100);
        // doc.text('www.website.com', pageWidth * 0.10, pageHeight - 10, { align: 'center' });
        // doc.text('67898268279', pageWidth * 0.5, pageHeight - 10, { align: 'center' });
        // doc.text('hello@gmail.com', pageWidth * 0.90, pageHeight - 10, { align: 'center' });

        // Use the environment variables here
        // const websiteUrl = import.meta.env.REACT_APP_WEBSITE_URL || 'www.defaultwebsite.com';
        // const contactEmail = import.meta.env.REACT_APP_CONTACT_EMAIL || 'default@example.com';

        const websiteUrl = import.meta.env.VITE_WEBSITE_URL || 'www.defaultwebsite.com';
        const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'default@example.com';

        doc.text(websiteUrl, pageWidth * 0.10, pageHeight - 10, { align: 'center' });
        doc.text(contactEmail, pageWidth * 0.90, pageHeight - 10, { align: 'center' });

        // Save the PDF
        doc.save(`Invoice-${Date.now()}.pdf`);
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="invoice-modal"
        >
            <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-full max-w-lg outline-none">
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-left mb-4">Generate Invoice</h3>

                    <div className="h-px bg-gray-200 -mx-6" />

                    <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto">
                        {order?.products?.map((product) => (
                            <div key={product._id} className="flex items-center gap-4 p-2">
                                <div
                                    onClick={() => handleProductSelect(product._id)}
                                    className={`w-5 h-5 rounded cursor-pointer flex items-center justify-center border
                    ${selectedProducts.includes(product._id)
                                            ? 'bg-buttonColor border-buttonColor'
                                            : 'border-gray-300'
                                        }`}
                                >
                                    {selectedProducts.includes(product._id) && (
                                        <Check className="w-4 h-4 text-white" />
                                    )}
                                </div>

                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                                    <img
                                        src={product?.images[0]}
                                        alt={product.productName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex-1">
                                    <h4 className="text-[16px] font-[500] mb-1">{product.productName}</h4>
                                    <div className="inline-flex items-center bg-[#F5F6F7] px-2 py-1 rounded-md gap-1">
                                        <svg
                                            width="14"
                                            height="13"
                                            viewBox="0 0 14 13"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M7 0L9.32866 3.79487L13.6574 4.83688L10.7679 8.22425L11.1145 12.6631L7 10.9618L2.8855 12.6631L3.23214 8.22425L0.342604 4.83688L4.67133 3.79487L7 0Z"
                                                fill="#FFC833"
                                            />
                                        </svg>
                                        <span className="text-[10px] text-[#8391A1]">{product.rating}</span>
                                    </div>
                                </div>

                                <div className="text-sm font-[300]">
                                    Status: <span className="text-green-600">{product.orderStatus}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 mt-2">
                        <button
                            // onClick={() => {
                            //     console.log('Selected products:', selectedProducts);
                            // }}
                            onClick={generateInvoice}
                            className="w-full px-4 py-2 bg-buttonColor text-white rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
                            disabled={selectedProducts.length === 0}
                        >
                            Generate Invoice
                        </button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default InvoiceModal;