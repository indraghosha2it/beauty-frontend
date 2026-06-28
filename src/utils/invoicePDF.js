

// import jsPDF from 'jspdf';

// // Helper function to format currency
// const formatPrice = (price) => {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 2
//   }).format(price || 0);
// };

// // Helper function to get unit label
// const getUnitLabel = (orderUnit) => {
//   switch(orderUnit) {
//     case 'kg': return 'kg';
//     case 'ton': return 'MT';
//     default: return 'pcs';
//   }
// };

// // Helper function to format date
// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric'
//   });
// };

// // Helper function to convert image to base64
// const imageToBase64 = async (imageUrl) => {
//   try {
//     if (imageUrl?.startsWith('data:image')) {
//       return imageUrl;
//     }
//     if (!imageUrl) return null;
//     const response = await fetch(imageUrl);
//     const blob = await response.blob();
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result);
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });
//   } catch (error) {
//     console.error('Error converting image to base64:', error);
//     return null;
//   }
// };

// // Get company initials for logo fallback
// const getCompanyInitials = (companyName) => {
//   if (!companyName) return 'JC';
//   return companyName
//     .split(' ')
//     .map(word => word[0])
//     .join('')
//     .toUpperCase()
//     .substring(0, 2);
// };

// // Function to draw a color circle
// const drawColorCircle = (doc, x, y, radius, colorCode) => {
//   doc.setFillColor(colorCode);
//   doc.circle(x, y, radius, 'F');
//   doc.setDrawColor(100, 100, 100);
//   doc.setLineWidth(0.1);
//   doc.circle(x, y, radius, 'S');
// };

// // Jute Theme Colors
// const COLORS = {
//   primary: '#6B4F3A',
//   secondary: '#F5E6D3',
//   accent: '#3A7D44',
//   neutral: '#FFFFFF',
//   lightGray: '#F9F9FC',
//   border: '#E5E5E5',
//   text: '#333333',
//   textLight: '#666666',
//   paid: '#3A7D44',
//   unpaid: '#CD5C5C',
//   partial: '#E6A017'
// };

// export const generateInvoicePDF = async (invoice) => {
//   try {
//     const doc = new jsPDF({
//       orientation: 'portrait',
//       unit: 'mm',
//       format: 'a4'
//     });

//     const pageWidth = doc.internal.pageSize.getWidth();
//     const pageHeight = doc.internal.pageSize.getHeight();
//     const margin = 15;
//     const contentWidth = pageWidth - (2 * margin);
//     let yPos = margin;

//     // Load company logo
//     let companyLogoBase64 = null;
//     if (invoice.company?.logo) {
//       try {
//         companyLogoBase64 = await imageToBase64(invoice.company.logo);
//       } catch (error) {
//         console.error('Failed to load company logo:', error);
//       }
//     }

//     // ==================== HEADER ====================
//     doc.setFillColor(COLORS.primary);
//     doc.rect(0, 0, pageWidth, 32, 'F');
    
//     doc.setFillColor(COLORS.neutral);
//     doc.roundedRect(margin, yPos, contentWidth, 26, 2, 2, 'F');

//     const logoSize = 16;
//     const logoMaxWidth = 20;
//     const logoMaxHeight = 16;
//     const logoX = margin + 5;
//     const logoY = yPos + 5;

//     if (companyLogoBase64) {
//       try {
//         const img = new Image();
//         img.src = companyLogoBase64;
        
//         await new Promise((resolve) => {
//           img.onload = resolve;
//         });
        
//         let imgWidth = img.width;
//         let imgHeight = img.height;
//         let finalWidth = logoSize;
//         let finalHeight = logoSize;
        
//         const aspectRatio = imgWidth / imgHeight;
        
//         if (aspectRatio > 1) {
//           finalWidth = logoSize;
//           finalHeight = logoSize / aspectRatio;
//         } else {
//           finalHeight = logoSize;
//           finalWidth = logoSize * aspectRatio;
//         }
        
//         if (finalWidth > logoMaxWidth) {
//           finalWidth = logoMaxWidth;
//           finalHeight = finalWidth / aspectRatio;
//         }
//         if (finalHeight > logoMaxHeight) {
//           finalHeight = logoMaxHeight;
//           finalWidth = finalHeight * aspectRatio;
//         }
        
//         const offsetX = (logoSize - finalWidth) / 2;
//         const offsetY = (logoSize - finalHeight) / 2;
        
//         doc.addImage(companyLogoBase64, 'PNG', logoX + offsetX, logoY + offsetY, finalWidth, finalHeight);
//       } catch (error) {
//         const companyName = invoice.company?.companyName || 'Jute Craftify';
//         const initials = getCompanyInitials(companyName);
//         doc.setFillColor(COLORS.primary);
//         doc.roundedRect(logoX, logoY, logoSize, logoSize, 2, 2, 'F');
//         doc.setFontSize(9);
//         doc.setFont('helvetica', 'bold');
//         doc.setTextColor(COLORS.neutral);
//         doc.text(initials, logoX + logoSize/2, logoY + logoSize/2 + 1, { align: 'center' });
//       }
//     } else {
//       const companyName = invoice.company?.companyName || 'Jute Craftify';
//       const initials = getCompanyInitials(companyName);
//       doc.setFillColor(COLORS.primary);
//       doc.roundedRect(logoX, logoY, logoSize, logoSize, 2, 2, 'F');
//       doc.setFontSize(9);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(COLORS.neutral);
//       doc.text(initials, logoX + logoSize/2, logoY + logoSize/2 + 1, { align: 'center' });
//     }

//     const companyX = logoX + logoSize + 8;
    
//     doc.setFontSize(12);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.text);
//     doc.text(invoice.company?.companyName || 'Jute Craftify', companyX, logoY + 5);

//     doc.setFontSize(7);
//     doc.setFont('helvetica', 'normal');
//     doc.setTextColor(COLORS.textLight);
//     if (invoice.company?.contactPerson) {
//       doc.setFont('helvetica', 'bold');
//       doc.text('Contact: ', companyX, logoY + 10);
//       const contactLabelWidth = doc.getTextWidth('Contact: ');
//       doc.setFont('helvetica', 'normal');
//       doc.text(invoice.company.contactPerson, companyX + contactLabelWidth, logoY + 10);
//     } else {
//       doc.setFont('helvetica', 'bold');
//       doc.text('Contact: ', companyX, logoY + 10);
//       doc.setFont('helvetica', 'normal');
//       doc.text('N/A', companyX + doc.getTextWidth('Contact: '), logoY + 10);
//     }

//     doc.setFontSize(6.5);
//     const emailPhone = `${invoice.company?.email || 'info@jutecraftify.com'} | ${invoice.company?.phone || '+8801305-785685'}`;
//     doc.text(emailPhone, companyX, logoY + 14);

//     if (invoice.company?.address) {
//       doc.setFontSize(6);
//       const addressLines = doc.splitTextToSize(invoice.company.address, 70);
//       doc.text(addressLines, companyX, logoY + 18);
//     }

//     const rightAlignX = pageWidth - margin - 5;
    
//     doc.setFontSize(8);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.primary);
//     const invoiceNoText = `INVOICE NO: `;
//     doc.text(invoiceNoText, rightAlignX - doc.getTextWidth(invoiceNoText + (invoice.invoiceNumber || '')), yPos + 8);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.text);
//     doc.text(invoice.invoiceNumber || '', rightAlignX, yPos + 8, { align: 'right' });

//     doc.setFontSize(6.5);
//     doc.setFont('helvetica', 'normal');
//     doc.setTextColor(COLORS.textLight);
    
//     const invoiceDate = formatDate(invoice.invoiceDate);
//     const dueDate = formatDate(invoice.dueDate);
//     const status = invoice.paymentStatus?.toUpperCase() || 'UNPAID';
//     const inquiryRef = invoice.inquiryNumber || 'N/A';
    
//     doc.text(`Date: ${invoiceDate}`, rightAlignX, yPos + 11.5, { align: 'right' });
//     doc.text(`Due: ${dueDate}`, rightAlignX, yPos + 15.5, { align: 'right' });
    
//     let statusColor = COLORS.unpaid;
//     if (status === 'PAID') statusColor = COLORS.paid;
//     else if (status === 'PARTIAL') statusColor = COLORS.partial;
//     doc.setTextColor(statusColor);
//     doc.text(`Status: ${status}`, rightAlignX, yPos + 19.5, { align: 'right' });
//     doc.setTextColor(COLORS.textLight);
    
//     doc.text(`Ref: ${inquiryRef}`, rightAlignX, yPos + 23.5, { align: 'right' });

//     // ==================== CUSTOMER INFO SECTION ====================
//     yPos += 34;
    
//     const billingAddress = [
//       invoice.customer?.billingAddress,
//       invoice.customer?.billingCity,
//       invoice.customer?.billingZipCode,
//       invoice.customer?.billingCountry
//     ].filter(Boolean).join(', ');
    
//     const shippingAddress = [
//       invoice.customer?.shippingAddress,
//       invoice.customer?.shippingCity,
//       invoice.customer?.shippingZipCode,
//       invoice.customer?.shippingCountry
//     ].filter(Boolean).join(', ');
    
//     const addressesAreSame = billingAddress === shippingAddress && billingAddress !== '';

//     let leftColHeight = 20;
//     let rightColHeight = 20;
    
//     if (billingAddress) {
//       const billingLines = doc.splitTextToSize(billingAddress, (contentWidth / 2) - 10);
//       rightColHeight += 4 + (billingLines.length * 3.5);
//     }
    
//     if (!addressesAreSame && shippingAddress) {
//       const shippingLines = doc.splitTextToSize(shippingAddress, (contentWidth / 2) - 10);
//       rightColHeight += 4 + (shippingLines.length * 3.5);
//     } else if (addressesAreSame && billingAddress) {
//       rightColHeight += 4 + 3.5;
//     }
    
//     const colHeight = Math.max(leftColHeight, rightColHeight);
    
//     // Left Column - Customer Info
//     doc.setFillColor(COLORS.lightGray);
//     doc.roundedRect(margin, yPos, (contentWidth / 2) - 3, colHeight, 2, 2, 'F');
    
//     doc.setFontSize(8);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.primary);
//     doc.text('CUSTOMER INFO', margin + 5, yPos + 5);
    
//     let leftY = yPos + 10;
//     doc.setFontSize(7);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.text);
//     doc.text(invoice.customer?.companyName || 'N/A', margin + 5, leftY);
//     leftY += 4.5;
    
//     doc.setFont('helvetica', 'normal');
//     if (invoice.customer?.contactPerson) {
//       doc.text(invoice.customer.contactPerson, margin + 5, leftY);
//       leftY += 4.5;
//     }
    
//     if (invoice.customer?.email) {
//       doc.text(invoice.customer.email, margin + 5, leftY);
//       leftY += 4.5;
//     }
    
//     if (invoice.customer?.phone) {
//       doc.text(invoice.customer.phone, margin + 5, leftY);
//     }
    
//     // Right Column - Address
//     const addressColX = margin + (contentWidth / 2) + 3;
//     doc.setFillColor(COLORS.lightGray);
//     doc.roundedRect(addressColX, yPos, (contentWidth / 2) - 3, colHeight, 2, 2, 'F');
    
//     doc.setFontSize(8);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.primary);
//     doc.text('ADDRESS', addressColX + 5, yPos + 5);
    
//     let rightY = yPos + 10;
//     let lineSpacing = 3.5;
    
//     if (billingAddress) {
//       doc.setFontSize(6.5);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(COLORS.textLight);
//       doc.text('Billing Address:', addressColX + 5, rightY);
//       rightY += lineSpacing;
//       doc.setFont('helvetica', 'normal');
//       const billingLines = doc.splitTextToSize(billingAddress, (contentWidth / 2) - 15);
//       for (let i = 0; i < billingLines.length; i++) {
//         doc.text(billingLines[i], addressColX + 5, rightY + (i * lineSpacing));
//       }
//       rightY += (billingLines.length * lineSpacing);
//     }
    
//     if (!addressesAreSame && shippingAddress) {
//       rightY += 1.5;
//       doc.setFont('helvetica', 'bold');
//       doc.text('Shipping Address:', addressColX + 5, rightY);
//       rightY += lineSpacing;
//       doc.setFont('helvetica', 'normal');
//       const shippingLines = doc.splitTextToSize(shippingAddress, (contentWidth / 2) - 15);
//       for (let i = 0; i < shippingLines.length; i++) {
//         doc.text(shippingLines[i], addressColX + 5, rightY + (i * lineSpacing));
//       }
//     } else if (addressesAreSame && billingAddress) {
//       rightY += 1.5;
//       doc.setFont('helvetica', 'italic');
//       doc.setTextColor(COLORS.textLight);
//       doc.text('Shipping Address: Same as billing', addressColX + 5, rightY);
//     } else if (!billingAddress) {
//       doc.text('N/A', addressColX + 5, rightY);
//     }
    
//     yPos += colHeight + 10;

//     // ==================== ITEMS TABLE ====================
//     const colPositions = {
//       item: margin + 3,
//       product: margin + 10,
//       color: margin + 45,
//       details: margin + 60,
//       qty: margin + contentWidth - 52,
//       unitPrice: margin + contentWidth - 38,
//       total: margin + contentWidth - 10
//     };

//     // Table Header
//     doc.setFillColor(COLORS.primary);
//     doc.rect(margin, yPos, contentWidth, 7, 'F');

//     doc.setFontSize(7);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.neutral);

//     doc.text('#', colPositions.item, yPos + 4.5);
//     doc.text('Product', colPositions.product, yPos + 4.5);
//     doc.text('Color', colPositions.color, yPos + 4.5);
//     doc.text('Details', colPositions.details, yPos + 4.5);
//     doc.text('Qty', colPositions.qty, yPos + 4.5, { align: 'right' });
//     doc.text('Unit Price', colPositions.unitPrice, yPos + 4.5, { align: 'right' });
//     doc.text('Total', colPositions.total, yPos + 4.5, { align: 'right' });

//     yPos += 10;

//     let rowsUsed = 0;
//     let itemNumber = 1;
    
//     if (invoice.items && invoice.items.length > 0) {
//       for (const item of invoice.items) {
//         const isWeightBased = item.orderUnit === 'kg' || item.orderUnit === 'ton';
//         const unitLabel = getUnitLabel(item.orderUnit);
        
//         if (item.colors && item.colors.length > 0) {
//           const colorRows = [];
          
//           for (const color of item.colors) {
//             let colorQty = 0;
//             let detailsLines = [];
            
//             if (isWeightBased) {
//               colorQty = color.quantity || color.totalQuantity || color.totalForColor || 0;
//               detailsLines = [`${colorQty} ${unitLabel}`];
//             } else {
//               const activeSizes = color.sizeQuantities?.filter(sq => sq.quantity > 0) || [];
//               colorQty = activeSizes.reduce((sum, sq) => sum + (sq.quantity || 0), 0);
              
//               if (activeSizes.length > 0) {
//                 const allSizesText = activeSizes.map(sq => `${sq.size}:${sq.quantity}`).join(', ');
//                 doc.setFontSize(5.0);
//                 const maxWidth = 55;
//                 const textWidth = doc.getTextWidth(allSizesText);
                
//                 if (textWidth <= maxWidth) {
//                   detailsLines = [allSizesText];
//                 } else {
//                   let currentLine = '';
//                   for (let i = 0; i < activeSizes.length; i++) {
//                     const sq = activeSizes[i];
//                     const sizeText = `${sq.size}:${sq.quantity}`;
//                     const testLine = currentLine ? `${currentLine}, ${sizeText}` : sizeText;
//                     const testWidth = doc.getTextWidth(testLine);
                    
//                     if (testWidth <= maxWidth) {
//                       currentLine = testLine;
//                     } else {
//                       if (currentLine) detailsLines.push(currentLine);
//                       currentLine = sizeText;
//                     }
//                   }
//                   if (currentLine) detailsLines.push(currentLine);
                  
//                   if (detailsLines.length > 2) {
//                     detailsLines = [];
//                     const sizesPerLine = Math.ceil(activeSizes.length / 2);
//                     for (let i = 0; i < activeSizes.length; i += sizesPerLine) {
//                       const lineSizes = activeSizes.slice(i, i + sizesPerLine);
//                       const lineText = lineSizes.map(sq => `${sq.size}:${sq.quantity}`).join(', ');
//                       detailsLines.push(lineText);
//                     }
//                   }
//                 }
//                 doc.setFontSize(6);
//               } else {
//                 detailsLines = ['-'];
//               }
//             }
            
//             const colorUnitPrice = color.unitPrice || item.unitPrice || 0;
//             const rowHeight = Math.max(4.5, detailsLines.length * 3.2);
            
//             colorRows.push({
//               color: color,
//               detailsLines: detailsLines,
//               rowHeight: rowHeight,
//               colorQty: colorQty,
//               colorUnitPrice: colorUnitPrice,
//               colorTotal: colorQty * colorUnitPrice
//             });
//           }
          
//           for (let colorIndex = 0; colorIndex < colorRows.length; colorIndex++) {
//             const row = colorRows[colorIndex];
//             const rowStartY = yPos;
//             const rowHeight = row.rowHeight;
            
//             if (yPos + rowHeight > pageHeight - 55) {
//               doc.addPage();
//               yPos = margin + 10;
//               rowsUsed = 0;
              
//               doc.setFillColor(COLORS.primary);
//               doc.rect(margin, yPos, contentWidth, 7, 'F');
//               doc.setFontSize(7);
//               doc.setFont('helvetica', 'bold');
//               doc.setTextColor(COLORS.neutral);
//               doc.text('#', colPositions.item, yPos + 4.5);
//               doc.text('Product', colPositions.product, yPos + 4.5);
//               doc.text('Color', colPositions.color, yPos + 4.5);
//               doc.text('Details', colPositions.details, yPos + 4.5);
//               doc.text('Qty', colPositions.qty, yPos + 4.5, { align: 'right' });
//               doc.text('Unit Price', colPositions.unitPrice, yPos + 4.5, { align: 'right' });
//               doc.text('Total', colPositions.total, yPos + 4.5, { align: 'right' });
//               yPos += 10;
//             }

//             if (rowsUsed % 2 === 0) {
//               doc.setFillColor(COLORS.lightGray);
//               doc.rect(margin, rowStartY - 2, contentWidth, rowHeight, 'F');
//             }

//             doc.setFontSize(6);
//             doc.setFont('helvetica', 'normal');
//             doc.setTextColor(COLORS.text);

//             const textY = rowStartY + 1.2;
//             const circleY = rowStartY + 1.5;
//             const circleRadius = 0.9;

//             if (colorIndex === 0) {
//               doc.text(itemNumber.toString(), colPositions.item, textY);
//             }

//             if (colorIndex === 0) {
//               let productName = item.productName || '';
//               const maxProductWidth = 30;
//               doc.setFontSize(5.5);
//               while (doc.getTextWidth(productName) > maxProductWidth && productName.length > 3) {
//                 productName = productName.substring(0, productName.length - 1);
//               }
//               if (productName !== (item.productName || '')) {
//                 productName = productName.substring(0, productName.length - 3) + '...';
//               }
//               doc.text(productName, colPositions.product, textY);
//               doc.setFontSize(6);
//             }

//             const colorCode = row.color.color?.code || '#CCCCCC';
//             drawColorCircle(doc, colPositions.color + 2, circleY, circleRadius, colorCode);
            
//             let colorName = row.color.color?.name || row.color.color?.code || 'Color';
//             if (colorName.startsWith('#')) colorName = '';
//             if (colorName.length > 10) colorName = colorName.substring(0, 8) + '..';
//             doc.setFontSize(5.5);
//             doc.text(colorName, colPositions.color + 6, textY);
//             doc.setFontSize(6);

//             if (row.detailsLines.length > 0 && row.detailsLines[0] !== '-') {
//               doc.setFontSize(5.0);
//               for (let i = 0; i < row.detailsLines.length; i++) {
//                 doc.text(row.detailsLines[i], colPositions.details, textY + (i * 3.2));
//               }
//               doc.setFontSize(6);
//             } else {
//               doc.text('-', colPositions.details, textY);
//             }

//             doc.setFontSize(5.5);
//             doc.text(`${row.colorQty} ${unitLabel}`, colPositions.qty, textY, { align: 'right' });
//             doc.text(formatPrice(row.colorUnitPrice), colPositions.unitPrice, textY, { align: 'right' });

//             doc.setFont('helvetica', 'bold');
//             doc.setFontSize(5.5);
//             doc.setTextColor(COLORS.primary);
//             doc.text(formatPrice(row.colorTotal), colPositions.total, textY, { align: 'right' });
//             doc.setFont('helvetica', 'normal');
//             doc.setFontSize(6);
//             doc.setTextColor(COLORS.text);

//             yPos += rowHeight;
//             rowsUsed++;
//           }
//         } else {
//           const rowHeight = 4.5;
          
//           if (yPos + rowHeight > pageHeight - 55) {
//             doc.addPage();
//             yPos = margin + 10;
//             rowsUsed = 0;
            
//             doc.setFillColor(COLORS.primary);
//             doc.rect(margin, yPos, contentWidth, 7, 'F');
//             doc.setFontSize(7);
//             doc.setFont('helvetica', 'bold');
//             doc.setTextColor(COLORS.neutral);
//             doc.text('#', colPositions.item, yPos + 4.5);
//             doc.text('Product', colPositions.product, yPos + 4.5);
//             doc.text('Color', colPositions.color, yPos + 4.5);
//             doc.text('Details', colPositions.details, yPos + 4.5);
//             doc.text('Qty', colPositions.qty, yPos + 4.5, { align: 'right' });
//             doc.text('Unit Price', colPositions.unitPrice, yPos + 4.5, { align: 'right' });
//             doc.text('Total', colPositions.total, yPos + 4.5, { align: 'right' });
//             yPos += 10;
//           }

//           if (rowsUsed % 2 === 0) {
//             doc.setFillColor(COLORS.lightGray);
//             doc.rect(margin, yPos - 2, contentWidth, rowHeight, 'F');
//           }

//           doc.setFontSize(5.5);
//           doc.setFont('helvetica', 'normal');
          
//           const textY = yPos + 1.2;
//           const circleY = yPos + 1.5;
//           const circleRadius = 0.9;
          
//           doc.text(itemNumber.toString(), colPositions.item, textY);
          
//           let productName = item.productName || '';
//           const maxProductWidth = 30;
//           while (doc.getTextWidth(productName) > maxProductWidth && productName.length > 3) {
//             productName = productName.substring(0, productName.length - 1);
//           }
//           if (productName !== (item.productName || '')) {
//             productName = productName.substring(0, productName.length - 3) + '...';
//           }
//           doc.text(productName, colPositions.product, textY);
          
//           drawColorCircle(doc, colPositions.color + 2, circleY, circleRadius, '#CCCCCC');
//           doc.text('-', colPositions.details, textY);
          
//           const totalQty = item.totalQuantity || 0;
//           const unitLabel = getUnitLabel(item.orderUnit || 'piece');
//           doc.text(`${totalQty} ${unitLabel}`, colPositions.qty, textY, { align: 'right' });
//           doc.text(formatPrice(item.unitPrice || 0), colPositions.unitPrice, textY, { align: 'right' });
          
//           doc.setFont('helvetica', 'bold');
//           doc.setTextColor(COLORS.primary);
//           doc.text(formatPrice(item.total || 0), colPositions.total, textY, { align: 'right' });

//           yPos += rowHeight;
//           rowsUsed++;
//         }
//         itemNumber++;
//       }
//     }

//     // ==================== SUMMARY SECTION ====================
//     const summaryWidth = 85;
//     const summaryX = pageWidth - margin - summaryWidth;
    
//     doc.setFillColor(COLORS.lightGray);
//     doc.roundedRect(summaryX, yPos, summaryWidth, 38, 2, 2, 'F');

//     doc.setFontSize(8);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.primary);
//     doc.text('SUMMARY', summaryX + 3, yPos + 5);

//     let summaryY = yPos + 9;
//     doc.setFontSize(6.5);
//     doc.setFont('helvetica', 'normal');
//     doc.setTextColor(COLORS.text);

//     const subtotal = invoice.subtotal || 0;
//     const vatPercentage = invoice.vatPercentage || 0;
//     const vatAmount = invoice.vatAmount || 0;
//     const discountPercentage = invoice.discountPercentage || 0;
//     const discountAmount = invoice.discountAmount || 0;
//     const shippingCost = invoice.shippingCost || 0;
//     const finalTotal = invoice.finalTotal || 0;
//     const amountPaid = invoice.amountPaid || 0;
//     const dueAmount = invoice.dueAmount || 0;

//     doc.text('Subtotal:', summaryX + 3, summaryY);
//     doc.text(formatPrice(subtotal), summaryX + summaryWidth - 3, summaryY, { align: 'right' });
//     summaryY += 3.5;

//     if (vatPercentage > 0) {
//       doc.text(`VAT ${vatPercentage}%:`, summaryX + 3, summaryY);
//       doc.text(formatPrice(vatAmount), summaryX + summaryWidth - 3, summaryY, { align: 'right' });
//       summaryY += 3.5;
//     }

//     if (discountPercentage > 0) {
//       doc.text(`Discount ${discountPercentage}%:`, summaryX + 3, summaryY);
//       doc.text(`-${formatPrice(discountAmount)}`, summaryX + summaryWidth - 3, summaryY, { align: 'right' });
//       summaryY += 3.5;
//     }

//     if (shippingCost > 0) {
//       doc.text('Shipping:', summaryX + 3, summaryY);
//       doc.text(formatPrice(shippingCost), summaryX + summaryWidth - 3, summaryY, { align: 'right' });
//       summaryY += 3.5;
//     }

//     doc.setDrawColor(COLORS.border);
//     doc.line(summaryX + 3, summaryY - 1, summaryX + summaryWidth - 3, summaryY - 1);
    
//     summaryY += 2;
    
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.primary);
//     doc.text('TOTAL:', summaryX + 3, summaryY);
//     doc.text(formatPrice(finalTotal), summaryX + summaryWidth - 3, summaryY, { align: 'right' });

//     const paymentY = summaryY + 4;
    
//     doc.setFontSize(5.5);
//     doc.setFont('helvetica', 'normal');
    
//     doc.setTextColor(COLORS.paid);
//     doc.text(`Paid: ${formatPrice(amountPaid)} (${finalTotal > 0 ? ((amountPaid / finalTotal) * 100).toFixed(1) : '0'}%)`, summaryX + 3, paymentY);
    
//     doc.setTextColor(COLORS.unpaid);
//     doc.text(`Due: ${formatPrice(dueAmount)} (${finalTotal > 0 ? ((dueAmount / finalTotal) * 100).toFixed(1) : '0'}%)`, summaryX + 3, paymentY + 3.5);

//     // ==================== REDESIGNED BANK DETAILS & BANKING TERMS SECTION ====================
//     yPos += 48;
    
//     if (yPos > pageHeight - 65) {
//       doc.addPage();
//       yPos = margin + 10;
//     }
    
//     const hasBankDetails = invoice.bankDetails && Object.values(invoice.bankDetails).some(v => v && v.toString().trim());
//     const hasBankingTerms = invoice.bankingTerms && invoice.bankingTerms.length > 0 && 
//                             invoice.bankingTerms.some(term => term.title?.trim() || term.value?.trim());
    
//     if (hasBankDetails || hasBankingTerms) {
//       const bankingBoxX = margin;
//       const bankingBoxY = yPos;
//       const bankingBoxWidth = contentWidth;
      
//       let leftColumnHeight = 25;
//       let rightColumnHeight = 25;
      
//       if (hasBankDetails) {
//         const bankDetails = invoice.bankDetails;
//         let lineCount = 0;
//         if (bankDetails.bankName && bankDetails.bankName.toString().trim()) lineCount++;
//         if (bankDetails.accountName && bankDetails.accountName.toString().trim()) lineCount++;
//         if (bankDetails.accountNumber && bankDetails.accountNumber.toString().trim()) lineCount++;
//         if (bankDetails.accountType && bankDetails.accountType.toString().trim()) lineCount++;
//         if (bankDetails.routingNumber && bankDetails.routingNumber.toString().trim()) lineCount++;
//         if (bankDetails.swiftCode && bankDetails.swiftCode.toString().trim()) lineCount++;
//         if (bankDetails.iban && bankDetails.iban.toString().trim()) lineCount++;
//         if (bankDetails.bankAddress && bankDetails.bankAddress.toString().trim()) lineCount++;
//         leftColumnHeight = Math.max(leftColumnHeight, (lineCount * 4) + 20);
//       }
      
//       if (hasBankingTerms) {
//         const validTerms = invoice.bankingTerms.filter(term => term.title?.trim() || term.value?.trim());
//         let totalHeight = 0;
        
//         const measureTextHeight = (text, width, fontSize = 5.5) => {
//           const charsPerLine = Math.floor(width / 3.5);
//           const lines = Math.ceil(text.length / charsPerLine);
//           return lines * 3.5;
//         };
        
//         validTerms.forEach(term => {
//           if (term.title && term.value) {
//             const titleText = `${term.title}: `;
//             const fullText = titleText + term.value;
//             const textHeight = measureTextHeight(fullText, (contentWidth / 2) - 15, 5.5);
//             totalHeight += Math.max(textHeight, 5);
//           } else if (term.title) {
//             const textHeight = measureTextHeight(term.title, (contentWidth / 2) - 15, 5.5);
//             totalHeight += Math.max(textHeight, 5);
//           } else if (term.value) {
//             const textHeight = measureTextHeight(term.value, (contentWidth / 2) - 15, 5.5);
//             totalHeight += Math.max(textHeight, 5);
//           }
//           totalHeight += 3;
//         });
        
//         rightColumnHeight = Math.max(rightColumnHeight, totalHeight + 20);
//       }
      
//       const boxHeight = Math.max(leftColumnHeight, rightColumnHeight, 50) + 10;
      
//       doc.setFillColor(COLORS.lightGray);
//       doc.roundedRect(bankingBoxX, bankingBoxY, bankingBoxWidth, boxHeight, 2, 2, 'F');
      
//       // doc.setDrawColor(COLORS.primary);
//       // doc.setLineWidth(0.3);
//       // doc.roundedRect(bankingBoxX, bankingBoxY, bankingBoxWidth, boxHeight, 2, 2, 'S');
      
//       const separatorX = bankingBoxX + (contentWidth / 2);
//       doc.setDrawColor(COLORS.border);
//       doc.setLineWidth(0.2);
//       doc.line(separatorX, bankingBoxY + 8, separatorX, bankingBoxY + boxHeight - 8);
      
//       const leftX = bankingBoxX + 8;
//       let leftY = bankingBoxY + 8;
      
//       doc.setFontSize(8);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(COLORS.primary);
//       doc.text('BANK DETAILS', leftX, leftY);
      
//       leftY += 6;
      
//       if (hasBankDetails) {
//         doc.setFontSize(6);
//         doc.setFont('helvetica', 'normal');
//         doc.setTextColor(COLORS.text);
        
//         const bankDetails = invoice.bankDetails;
//         const maxWidth = (contentWidth / 2) - 15;
        
//         const drawBankLine = (label, value, y) => {
//           if (value && value.toString().trim()) {
//             const labelText = `${label}: `;
//             doc.setFont('helvetica', 'bold');
//             doc.text(labelText, leftX, y);
            
//             const labelWidth = doc.getTextWidth(labelText);
//             doc.setFont('helvetica', 'normal');
            
//             const remainingWidth = maxWidth - labelWidth;
//             const valueStr = value.toString();
//             const valueWidth = doc.getTextWidth(valueStr);
            
//             if (valueWidth <= remainingWidth) {
//               doc.text(valueStr, leftX + labelWidth, y);
//               return 4.5;
//             } else {
//               const wrappedLines = doc.splitTextToSize(valueStr, maxWidth);
//               for (let i = 0; i < wrappedLines.length; i++) {
//                 const lineX = i === 0 ? leftX + labelWidth : leftX + 3;
//                 doc.text(wrappedLines[i], lineX, y + (i * 3.2));
//               }
//               return 4.5 + ((wrappedLines.length - 1) * 3.2);
//             }
//           }
//           return 0;
//         };
        
//         if (bankDetails.bankName && bankDetails.bankName.toString().trim()) {
//           const height = drawBankLine('Bank Name', bankDetails.bankName, leftY);
//           leftY += height;
//         }
//         if (bankDetails.accountName && bankDetails.accountName.toString().trim()) {
//           const height = drawBankLine('Account Name', bankDetails.accountName, leftY);
//           leftY += height;
//         }
//         if (bankDetails.accountNumber && bankDetails.accountNumber.toString().trim()) {
//           const height = drawBankLine('Account Number', bankDetails.accountNumber, leftY);
//           leftY += height;
//         }
//         if (bankDetails.accountType && bankDetails.accountType.toString().trim()) {
//           const height = drawBankLine('Account Type', bankDetails.accountType, leftY);
//           leftY += height;
//         }
//         if (bankDetails.routingNumber && bankDetails.routingNumber.toString().trim()) {
//           const height = drawBankLine('Routing Number', bankDetails.routingNumber, leftY);
//           leftY += height;
//         }
//         if (bankDetails.swiftCode && bankDetails.swiftCode.toString().trim()) {
//           const height = drawBankLine('SWIFT Code', bankDetails.swiftCode, leftY);
//           leftY += height;
//         }
//         if (bankDetails.iban && bankDetails.iban.toString().trim()) {
//           const height = drawBankLine('IBAN', bankDetails.iban, leftY);
//           leftY += height;
//         }
//         if (bankDetails.bankAddress && bankDetails.bankAddress.toString().trim()) {
//           const height = drawBankLine('Bank Address', bankDetails.bankAddress, leftY);
//           leftY += height;
//         }
//       } else {
//         doc.setFontSize(6);
//         doc.setFont('helvetica', 'italic');
//         doc.setTextColor(COLORS.textLight);
//         doc.text('No bank details provided', leftX, leftY);
//       }
      
//       const rightX = separatorX + 8;
//       let rightY = bankingBoxY + 8;
      
//       doc.setFontSize(8);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(COLORS.primary);
//       doc.text('BANKING TERMS', rightX, rightY);
      
//       rightY += 6;
      
//       if (hasBankingTerms) {
//         doc.setFontSize(5.5);
//         doc.setFont('helvetica', 'normal');
//         doc.setTextColor(COLORS.text);
        
//         const validTerms = invoice.bankingTerms.filter(term => term.title?.trim() || term.value?.trim());
//         const termWidth = (contentWidth / 2) - 20;
//         const bulletPoint = '• ';
        
//         for (const term of validTerms) {
//           if (term.title && term.value) {
//             const titleText = `${term.title}: `;
//             doc.setFont('helvetica', 'bold');
//             doc.text(titleText, rightX, rightY);
            
//             const titleWidth = doc.getTextWidth(titleText);
//             doc.setFont('helvetica', 'normal');
            
//             const valueLines = doc.splitTextToSize(term.value, termWidth - titleWidth);
//             for (let i = 0; i < valueLines.length; i++) {
//               const lineX = i === 0 ? rightX + titleWidth : rightX + 3;
//               doc.text(valueLines[i], lineX, rightY + (i * 3.2));
//             }
//             rightY += 3.2 * Math.max(1, valueLines.length) + 2;
//           } else if (term.title) {
//             doc.setFont('helvetica', 'bold');
//             doc.setTextColor(COLORS.primary);
//             doc.text(bulletPoint + term.title, rightX, rightY);
//             doc.setFont('helvetica', 'normal');
//             doc.setTextColor(COLORS.text);
//             rightY += 5;
//           } else if (term.value) {
//             const valueLines = doc.splitTextToSize(term.value, termWidth);
//             for (const line of valueLines) {
//               doc.text(bulletPoint + line, rightX, rightY);
//               rightY += 3.5;
//             }
//             rightY += 1.5;
//           }
//         }
//       } else {
//         doc.setFontSize(6);
//         doc.setFont('helvetica', 'italic');
//         doc.setTextColor(COLORS.textLight);
//         doc.text('No banking terms provided', rightX, rightY);
//       }
      
//       yPos += boxHeight + 10;
//     } else {
//       yPos += 15;
//     }

//     // ==================== NOTES & TERMS ====================
//     yPos += 5;
    
//     if (yPos > pageHeight - 35) {
//       doc.addPage();
//       yPos = margin + 10;
//     }

//     doc.setDrawColor(COLORS.border);
//     doc.line(margin, yPos, pageWidth - margin, yPos);
//     yPos += 5;

//     if (invoice.notes) {
//       doc.setFontSize(7);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(COLORS.primary);
//       doc.text('NOTES:', margin, yPos);
      
//       doc.setFontSize(6);
//       doc.setFont('helvetica', 'normal');
//       doc.setTextColor(COLORS.textLight);
      
//       const noteLines = doc.splitTextToSize(invoice.notes, contentWidth);
//       doc.text(noteLines, margin, yPos + 3.5);
//       yPos += (noteLines.length * 3.5) + 5;
//     }

//     if (invoice.terms) {
//       doc.setFontSize(7);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(COLORS.primary);
//       doc.text('TERMS & CONDITIONS:', margin, yPos);
      
//       doc.setFontSize(6);
//       doc.setFont('helvetica', 'normal');
//       doc.setTextColor(COLORS.textLight);
      
//       const termsLines = doc.splitTextToSize(invoice.terms, contentWidth);
//       doc.text(termsLines, margin, yPos + 3.5);
//     }

//     // ==================== FOOTER ====================
//     const footerY = pageHeight - 5;
    
//     doc.setDrawColor(COLORS.border);
//     doc.setLineWidth(0.2);
//     doc.line(margin, footerY - 2, pageWidth - margin, footerY - 2);
    
//     doc.setFontSize(5);
//     doc.setFont('helvetica', 'normal');
//     doc.setTextColor(COLORS.textLight);
    
//     const today = new Date();
//     const dateString = today.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     }).replace(/,/g, '');
    
//     doc.text(`Invoice #${invoice.invoiceNumber} | Generated ${dateString}`, margin, footerY);
//     doc.text(invoice.company?.companyName || 'Jute Craftify', pageWidth - margin, footerY, { align: 'right' });

//     const pdfBlob = doc.output('blob');
//     const url = URL.createObjectURL(pdfBlob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `Invoice_${invoice.invoiceNumber}.pdf`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);

//     return { success: true, fileName: `Invoice_${invoice.invoiceNumber}.pdf` };
    
//   } catch (error) {
//     console.error('PDF Generation Error:', error);
//     throw error;
//   }
// };


// utils/pdfGenerator.js
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Helper function to format currency (BDT)
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price || 0);
};

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-BD', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Helper function to convert image to base64
const imageToBase64 = async (imageUrl) => {
  try {
    if (imageUrl?.startsWith('data:image')) {
      return imageUrl;
    }
    if (!imageUrl) return null;
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting image to base64:', error);
    return null;
  }
};

// Get company initials for logo fallback
const getCompanyInitials = (companyName) => {
  if (!companyName) return 'BB';
  return companyName
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Beauty Theme Colors (matching your checkout page)
const COLORS = {
  primary: '#EE4275',
  secondary: '#FFF5F6',
  accent: '#FF6B9D',
  neutral: '#FFFFFF',
  lightGray: '#FFF5F6',
  border: '#FFD2DB',
  text: '#2D1B2E',
  textLight: '#8B7A8C',
  paid: '#4CAF50',
  unpaid: '#F44336',
  partial: '#FFC107'
};

export const generateInvoicePDF = async (order) => {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - (2 * margin);
    let yPos = margin;

    // Load company logo from /logo.png
    let companyLogoBase64 = null;
    try {
      companyLogoBase64 = await imageToBase64('/images/logo2.png');
      
    } catch (error) {
      console.error('Failed to load logo:', error);
    }

    // ==================== HEADER ====================
    // Colored header bar
    doc.setFillColor(238, 66, 117);
    doc.rect(0, 0, pageWidth, 32, 'F');
    
    // White rounded rectangle for content
    doc.setFillColor(COLORS.neutral);
    doc.roundedRect(margin, yPos, contentWidth, 26, 2, 2, 'F');

    const logoSize = 18;
    const logoMaxWidth = 22;
    const logoMaxHeight = 18;
    const logoX = margin + 5;
    const logoY = yPos + 4;

    // Logo or initials
    if (companyLogoBase64) {
      try {
        const img = new Image();
        img.src = companyLogoBase64;
        
        await new Promise((resolve) => {
          img.onload = resolve;
        });
        
        let imgWidth = img.width;
        let imgHeight = img.height;
        let finalWidth = logoSize;
        let finalHeight = logoSize;
        
        const aspectRatio = imgWidth / imgHeight;
        
        if (aspectRatio > 1) {
          finalWidth = logoSize;
          finalHeight = logoSize / aspectRatio;
        } else {
          finalHeight = logoSize;
          finalWidth = logoSize * aspectRatio;
        }
        
        if (finalWidth > logoMaxWidth) {
          finalWidth = logoMaxWidth;
          finalHeight = finalWidth / aspectRatio;
        }
        if (finalHeight > logoMaxHeight) {
          finalHeight = logoMaxHeight;
          finalWidth = finalHeight * aspectRatio;
        }
        
        const offsetX = (logoSize - finalWidth) / 2;
        const offsetY = (logoSize - finalHeight) / 2;
        
        doc.addImage(companyLogoBase64, 'PNG', logoX + offsetX, logoY + offsetY, finalWidth, finalHeight);
      } catch (error) {
        const initials = getCompanyInitials('BeautyBucket');
        doc.setFillColor(238, 66, 117);
        doc.roundedRect(logoX, logoY, logoSize, logoSize, 2, 2, 'F');
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(COLORS.neutral);
        doc.text(initials, logoX + logoSize/2, logoY + logoSize/2 + 1, { align: 'center' });
      }
    } else {
      const initials = getCompanyInitials('BeautyBucket');
      doc.setFillColor(238, 66, 117);
      doc.roundedRect(logoX, logoY, logoSize, logoSize, 2, 2, 'F');
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(COLORS.neutral);
      doc.text(initials, logoX + logoSize/2, logoY + logoSize/2 + 1, { align: 'center' });
    }

    // const companyX = logoX + logoSize + 8;
    
    // doc.setFontSize(12);
    // doc.setFont('helvetica', 'bold');
    // doc.setTextColor(COLORS.text);
    // doc.text('BeautyBucket', companyX, logoY + 4);

    const companyX = logoX + logoSize + 8;

// Split "BeautyBucket" into two parts with different colors
const beautyText = 'Beauty';
const bucketText = 'Bucket';
const textX = companyX;
const textY = logoY + 4;

// Draw "Beauty" in pink
doc.setFontSize(12);
doc.setFont('helvetica', 'bold');
doc.setTextColor(238, 66, 117); // Pink color (#EE4275)
doc.text(beautyText, textX, textY);

// Calculate width of "Beauty" to position "Bucket" next to it
const beautyWidth = doc.getTextWidth(beautyText);

// Draw "Bucket" in default text color
doc.setTextColor(COLORS.text); // Your default dark color
doc.text(bucketText, textX + beautyWidth, textY);

    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.textLight);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Contact: ', companyX, logoY + 9);
    const contactLabelWidth = doc.getTextWidth('Contact: ');
    doc.setFont('helvetica', 'normal');
    doc.text('+8801XXXXXXXXX', companyX + contactLabelWidth, logoY + 9);

    doc.setFontSize(6.5);
    doc.text('info@beautybucket.com', companyX, logoY + 13);

    doc.setFontSize(6);
    const companyAddressLines = doc.splitTextToSize('House #470, Avenue 6, Road 6, Mirpur DOHS, Dhaka', 70);
    doc.text(companyAddressLines, companyX, logoY + 17);

    const rightAlignX = pageWidth - margin - 5;
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(238, 66, 117);
    const invoiceNoText = `INVOICE NO: `;
    const orderNumber = order.orderNumber || order._id.slice(-8).toUpperCase();
    doc.text(invoiceNoText, rightAlignX - doc.getTextWidth(invoiceNoText + orderNumber), yPos + 8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.text);
    doc.text(orderNumber, rightAlignX, yPos + 8, { align: 'right' });

    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.textLight);
    
    const orderDate = formatDate(order.createdAt);
    const status = order.orderStatus?.toUpperCase() || 'PLACED';
    const paymentMethod = order.paymentMethod?.toUpperCase() || 'COD';
    
    doc.text(`Date: ${orderDate}`, rightAlignX, yPos + 11.5, { align: 'right' });
    
    let statusColor = COLORS.unpaid;
    if (status === 'DELIVERED') statusColor = COLORS.paid;
    else if (status === 'CANCELLED') statusColor = COLORS.unpaid;
    doc.setTextColor(statusColor);
    doc.text(`Status: ${status}`, rightAlignX, yPos + 15.5, { align: 'right' });
    doc.setTextColor(COLORS.textLight);
    
    doc.text(`Payment: ${paymentMethod}`, rightAlignX, yPos + 19.5, { align: 'right' });

    // ==================== CUSTOMER & DELIVERY INFO SECTION ====================
    yPos += 34;
    
    // Customer Info (Left Column)
    const customerColWidth = (contentWidth / 2) - 3;
    const addressColWidth = (contentWidth / 2) - 3;
    
    let leftColHeight = 25;
    let rightColHeight = 25;
    
    // Calculate heights for customer info
    const customerInfoLines = [
      `Name: ${order.customerInfo.fullName || 'N/A'}`,
      order.customerInfo.email ? `Email: ${order.customerInfo.email}` : null,
      `Phone: ${order.customerInfo.phone || 'N/A'}`,
      `Address: ${order.customerInfo.address || 'N/A'}`
    ].filter(Boolean);
    leftColHeight = Math.max(leftColHeight, 10 + (customerInfoLines.length * 4.5));
    
    // Calculate heights for delivery address
    const deliveryAddressLines = [
      order.customerInfo.area ? `Area/Union: ${order.customerInfo.area}` : null,
      order.customerInfo.zone ? `Upazila/Thana: ${order.customerInfo.zone}` : null,
      order.customerInfo.city ? `District/City: ${order.customerInfo.city}` : null,
      order.customerInfo.division ? `Division: ${order.customerInfo.division}` : null,

    ].filter(Boolean);
    rightColHeight = Math.max(rightColHeight, 10 + (deliveryAddressLines.length * 4.5));
    
    const colHeight = Math.max(leftColHeight, rightColHeight, 35);
    
    // Left Column - Customer Info
    doc.setFillColor(245, 245, 250);
    doc.roundedRect(margin, yPos, customerColWidth, colHeight, 2, 2, 'F');
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(238, 66, 117);
    doc.text('CUSTOMER INFO', margin + 5, yPos + 5);
    
    let leftY = yPos + 10;
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.text);
    
    // Name
    doc.setFont('helvetica', 'bold');
    doc.text('Name:', margin + 5, leftY);
    doc.setFont('helvetica', 'normal');
    doc.text(order.customerInfo.fullName || 'N/A', margin + 30, leftY);
    leftY += 4.5;
    
    // Email (if exists)
    if (order.customerInfo.email) {
      doc.setFont('helvetica', 'bold');
      doc.text('Email:', margin + 5, leftY);
      doc.setFont('helvetica', 'normal');
      doc.text(order.customerInfo.email, margin + 30, leftY);
      leftY += 4.5;
    }
    
    // Phone
    doc.setFont('helvetica', 'bold');
    doc.text('Phone:', margin + 5, leftY);
    doc.setFont('helvetica', 'normal');
    doc.text(order.customerInfo.phone || 'N/A', margin + 30, leftY);
    leftY += 4.5;
    
    // Address
    doc.setFont('helvetica', 'bold');
    doc.text('Address:', margin + 5, leftY);
    doc.setFont('helvetica', 'normal');
    const addressValue = order.customerInfo.address || 'N/A';
    const addressLines = doc.splitTextToSize(addressValue, customerColWidth - 35);
    for (let i = 0; i < addressLines.length; i++) {
      const xPos = i === 0 ? margin + 30 : margin + 5 + 5;
      doc.text(addressLines[i], xPos, leftY + (i * 4));
    }
    
    // Right Column - Delivery Address
    const addressColX = margin + customerColWidth + 6;
    doc.setFillColor(245, 245, 250);
    doc.roundedRect(addressColX, yPos, addressColWidth, colHeight, 2, 2, 'F');
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(238, 66, 117);
    doc.text('DELIVERY ADDRESS', addressColX + 5, yPos + 5);
    
    let rightY = yPos + 10;
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.text);
    
    // Area/Union
    if (order.customerInfo.area) {
      doc.setFont('helvetica', 'bold');
      doc.text('Area/Union:', addressColX + 5, rightY);
      doc.setFont('helvetica', 'normal');
      doc.text(order.customerInfo.area, addressColX + 40, rightY);
      rightY += 4.5;
    }
    
    // Upazila/Thana
    if (order.customerInfo.zone) {
      doc.setFont('helvetica', 'bold');
      doc.text('Upazila/Thana:', addressColX + 5, rightY);
      doc.setFont('helvetica', 'normal');
      doc.text(order.customerInfo.zone, addressColX + 40, rightY);
      rightY += 4.5;
    }
    
    // District/City
    if (order.customerInfo.city) {
      doc.setFont('helvetica', 'bold');
      doc.text('District/City:', addressColX + 5, rightY);
      doc.setFont('helvetica', 'normal');
      doc.text(order.customerInfo.city, addressColX + 40, rightY);
      rightY += 4.5;
    }
    
    // Division
    if (order.customerInfo.division) {
      doc.setFont('helvetica', 'bold');
      doc.text('Division:', addressColX + 5, rightY);
      doc.setFont('helvetica', 'normal');
      doc.text(order.customerInfo.division, addressColX + 40, rightY);
      rightY += 4.5;
    }
    
   
    yPos += colHeight + 10;

    // ==================== ITEMS TABLE ====================
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.text);
    doc.text('ORDER ITEMS', margin, yPos);
    yPos += 5;

    // Table Column Positions
    const colPositions = {
      item: margin + 3,
      product: margin + 10,
      unit: margin + contentWidth - 95,
      qty: margin + contentWidth - 70,
      price: margin + contentWidth - 45,
      total: margin + contentWidth - 10
    };

    // Table Header
    doc.setFillColor(238, 66, 117);
    doc.rect(margin, yPos, contentWidth, 7, 'F');

    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.neutral);

    doc.text('#', colPositions.item, yPos + 4.5);
    doc.text('Product', colPositions.product, yPos + 4.5);
    doc.text('Unit', colPositions.unit, yPos + 4.5);
    doc.text('Qty', colPositions.qty, yPos + 4.5, { align: 'right' });
    doc.text('Price', colPositions.price, yPos + 4.5, { align: 'right' });
    doc.text('Total', colPositions.total, yPos + 4.5, { align: 'right' });

    yPos += 10;

    let rowCount = 0;
    const orderItems = order.items || [];
    
    orderItems.forEach((item, index) => {
      const price = item.discountPrice || item.regularPrice || 0;
      const totalPrice = price * (item.quantity || 0);
      const isEven = rowCount % 2 === 0;
      
      const rowHeight = 7;
      
      // Check if we need a new page
      if (yPos + rowHeight > pageHeight - 55) {
        doc.addPage();
        yPos = margin + 10;
        rowCount = 0;
        
        // Re-draw header on new page
        doc.setFillColor(238, 66, 117);
        doc.rect(margin, yPos, contentWidth, 7, 'F');
        doc.setFontSize(7);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(COLORS.neutral);
        doc.text('#', colPositions.item, yPos + 4.5);
        doc.text('Product', colPositions.product, yPos + 4.5);
        doc.text('Unit', colPositions.unit, yPos + 4.5);
        doc.text('Qty', colPositions.qty, yPos + 4.5, { align: 'right' });
        doc.text('Price', colPositions.price, yPos + 4.5, { align: 'right' });
        doc.text('Total', colPositions.total, yPos + 4.5, { align: 'right' });
        yPos += 10;
      }

      // Row background
      if (isEven) {
        doc.setFillColor(255, 245, 246);
        doc.rect(margin, yPos - 2, contentWidth, rowHeight, 'F');
      }

      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(COLORS.text);

      const textY = yPos + 4;
      
      doc.text((index + 1).toString(), colPositions.item, textY);
      
      // Product name with truncation
      let productName = item.productName || '';
      const maxWidth = 60;
      while (doc.getTextWidth(productName) > maxWidth && productName.length > 3) {
        productName = productName.substring(0, productName.length - 1);
      }
      if (productName !== (item.productName || '')) {
        productName = productName.substring(0, productName.length - 3) + '...';
      }
      doc.text(productName, colPositions.product, textY);
      
      doc.text(item.unit || 'pcs', colPositions.unit, textY);
      doc.text((item.quantity || 0).toString(), colPositions.qty, textY, { align: 'right' });
      doc.text(formatPrice(price), colPositions.price, textY, { align: 'right' });
      
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(238, 66, 117);
      doc.text(formatPrice(totalPrice), colPositions.total, textY, { align: 'right' });
      
      yPos += rowHeight;
      rowCount++;
    });

    yPos += 5;

    // ==================== SUMMARY SECTION ====================
    const summaryWidth = 85;
    const summaryX = pageWidth - margin - summaryWidth;
    
    doc.setFillColor(255, 245, 246);
    doc.setDrawColor(238, 66, 117);
    doc.setLineWidth(0.3);
    doc.roundedRect(summaryX, yPos, summaryWidth, 45, 2, 2, 'FD');

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(238, 66, 117);
    doc.text('SUMMARY', summaryX + 3, yPos + 5);

    let summaryY = yPos + 9;
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.text);

    const subtotal = order.subtotal || 0;
    const shippingCost = order.shippingCost || 0;
    const discount = order.discount || 0;
    const total = order.total || 0;

    doc.text('Subtotal:', summaryX + 3, summaryY);
    doc.text(formatPrice(subtotal), summaryX + summaryWidth - 3, summaryY, { align: 'right' });
    summaryY += 4.5;

    doc.text('Shipping:', summaryX + 3, summaryY);
    doc.text(formatPrice(shippingCost), summaryX + summaryWidth - 3, summaryY, { align: 'right' });
    summaryY += 4.5;

    if (discount > 0) {
      doc.setTextColor(COLORS.paid);
      doc.text('Discount:', summaryX + 3, summaryY);
      doc.text(`-${formatPrice(discount)}`, summaryX + summaryWidth - 3, summaryY, { align: 'right' });
      doc.setTextColor(COLORS.text);
      summaryY += 4.5;
    }

    doc.setDrawColor(238, 66, 117);
    doc.setLineWidth(0.3);
    doc.line(summaryX + 3, summaryY - 1, summaryX + summaryWidth - 3, summaryY - 1);
    
    summaryY += 2;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(238, 66, 117);
    doc.text('TOTAL:', summaryX + 3, summaryY);
    doc.text(formatPrice(total), summaryX + summaryWidth - 3, summaryY, { align: 'right' });

    // Payment status
    summaryY += 5;
    doc.setFontSize(5.5);
    doc.setFont('helvetica', 'normal');
    
    const paymentStatus = order.paymentStatus?.toUpperCase() || 'PENDING';
    if (paymentStatus === 'PAID') {
      doc.setTextColor(COLORS.paid);
      doc.text(`✓ Payment Status: ${paymentStatus}`, summaryX + 3, summaryY);
    } else if (paymentStatus === 'PENDING') {
      doc.setTextColor(COLORS.unpaid);
      doc.text(` Payment Status: ${paymentStatus}`, summaryX + 3, summaryY);
    } else {
      doc.setTextColor(COLORS.textLight);
      doc.text(`Payment Status: ${paymentStatus}`, summaryX + 3, summaryY);
    }

    yPos += 55;

    // ==================== ORDER NOTES ====================
    if (order.customerInfo?.note) {
      if (yPos > pageHeight - 35) {
        doc.addPage();
        yPos = margin + 10;
      }
      
      doc.setDrawColor(238, 66, 117);
      doc.setLineWidth(0.3);
      doc.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 5;
      
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(238, 66, 117);
      doc.text('ORDER NOTES:', margin, yPos);
      
      doc.setFontSize(6);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(COLORS.textLight);
      
      const noteLines = doc.splitTextToSize(order.customerInfo.note, contentWidth);
      doc.text(noteLines, margin, yPos + 4);
      yPos += (noteLines.length * 4) + 10;
    }

    // ==================== FOOTER ====================
    const footerY = pageHeight - 8;
    
    doc.setDrawColor(238, 66, 117);
    doc.setLineWidth(0.3);
    doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4);
    
    doc.setFontSize(5.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(139, 122, 140);
    
    doc.text('Thank you for shopping with BeautyBucket! ✨', pageWidth / 2, footerY, { align: 'center' });
    doc.text('For any queries, contact us at support@beautybucket.com', pageWidth / 2, footerY + 4, { align: 'center' });


    // ==================== SAVE PDF ====================
    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice_${orderNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return { success: true, fileName: `Invoice_${orderNumber}.pdf` };
    
  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw error;
  }
};