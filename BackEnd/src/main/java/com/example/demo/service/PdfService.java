package com.example.demo.service;

import com.example.demo.dto.response.OrderItemResponse;
import com.example.demo.dto.response.OrderResponse;
import com.example.demo.util.NumberToWordsVN;
import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.pdf.*;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

import java.awt.Color;
import java.io.IOException;
import java.text.NumberFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@Service
public class PdfService {

    // --- THÔNG TIN CỬA HÀNG ---
    private final String SHOP_NAME = "CONG TY TNHH CONG NGHE TQUAD";
    private final String SHOP_TAX_CODE = "0109123456";
    private final String SHOP_ADDRESS = "So 123 Duong ABC, Quan Cau Giay, Ha Noi, Viet Nam";
    private final String SHOP_PHONE = "0123.456.789";
    private final String SHOP_EMAIL = "contact@tquad.vn";
    private final String SHOP_WEBSITE = "http://tquad.vn";

    public void exportOrderInvoice(OrderResponse order, HttpServletResponse response) throws IOException {
        Document document = new Document(PageSize.A4, 20, 20, 20, 20);
        PdfWriter writer = PdfWriter.getInstance(document, response.getOutputStream());
        document.open();

        // Sử dụng font Unicode để hiển thị tiếng Việt (Arial trên Windows)
        BaseFont baseFont;
        try {
            baseFont = BaseFont.createFont("C:/Windows/Fonts/arial.ttf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
        } catch (Exception e) {
            baseFont = BaseFont.createFont(BaseFont.HELVETICA, BaseFont.WINANSI, BaseFont.EMBEDDED);
        }

        Font fontTitle = new Font(baseFont, 18, Font.BOLD, Color.BLACK);
        Font fontBold = new Font(baseFont, 10, Font.BOLD, Color.BLACK);
        Font fontNormal = new Font(baseFont, 10, Font.NORMAL, Color.BLACK);
        Font fontItalic = new Font(baseFont, 9, Font.ITALIC, Color.BLACK);
        Font fontSmall = new Font(baseFont, 8, Font.NORMAL, Color.DARK_GRAY);

        // --- HEADER ---
        PdfPTable headerTable = new PdfPTable(3);
        headerTable.setWidthPercentage(100);
        headerTable.setWidths(new float[]{3, 4, 3});

        PdfPCell logoCell = new PdfPCell();
        logoCell.setBorder(Rectangle.NO_BORDER);
        logoCell.addElement(new Paragraph("TQuad", new Font(baseFont, 22, Font.BOLD, new Color(0, 86, 179))));
        logoCell.addElement(new Paragraph("Laptop Hi-End", fontSmall));
        headerTable.addCell(logoCell);

        PdfPCell titleCell = new PdfPCell();
        titleCell.setBorder(Rectangle.NO_BORDER);
        titleCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        Paragraph pTitle = new Paragraph("HÓA ĐƠN GIÁ TRỊ GIA TĂNG", fontTitle);
        pTitle.setAlignment(Element.ALIGN_CENTER);
        titleCell.addElement(pTitle);
        Paragraph pSubtitle = new Paragraph("(VAT INVOICE)", fontBold);
        pSubtitle.setAlignment(Element.ALIGN_CENTER);
        titleCell.addElement(pSubtitle);
        headerTable.addCell(titleCell);

        PdfPCell serialCell = new PdfPCell();
        serialCell.setBorder(Rectangle.NO_BORDER);
        serialCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
        Paragraph pSerial = new Paragraph("Ký hiệu (Serial): 1C23TQD", fontNormal);
        pSerial.setAlignment(Element.ALIGN_RIGHT);
        serialCell.addElement(pSerial);
        Paragraph pNo = new Paragraph("Số (No.): " + String.format("%06d", order.getId()), fontBold);
        pNo.getFont().setColor(Color.RED);
        pNo.setAlignment(Element.ALIGN_RIGHT);
        serialCell.addElement(pNo);
        headerTable.addCell(serialCell);
        document.add(headerTable);

        // Date
        LocalDateTime now = LocalDateTime.now();
        Paragraph pDate = new Paragraph("Ngày " + now.getDayOfMonth() + " tháng " + now.getMonthValue() + " năm " + now.getYear(), fontItalic);
        pDate.setAlignment(Element.ALIGN_CENTER);
        document.add(pDate);
        document.add(new Paragraph("\n"));

        // --- SELLER & BUYER INFO ---
        PdfPTable infoTable = new PdfPTable(1);
        infoTable.setWidthPercentage(100);
        
        addInfoRow(infoTable, "Đơn vị bán hàng (Seller):", SHOP_NAME, fontBold);
        addInfoRow(infoTable, "Mã số thuế (Tax code):", SHOP_TAX_CODE, fontNormal);
        addInfoRow(infoTable, "Địa chỉ (Address):", SHOP_ADDRESS, fontNormal);
        addInfoRow(infoTable, "Điện thoại (Tel): " + SHOP_PHONE, "Email: " + SHOP_EMAIL + "   Website: " + SHOP_WEBSITE, fontNormal);
        document.add(infoTable);
        
        document.add(new Paragraph("----------------------------------------------------------------------------------------------------------------------------------", fontSmall));
        
        PdfPTable buyerTable = new PdfPTable(1);
        buyerTable.setWidthPercentage(100);
        addInfoRow(buyerTable, "Họ tên người mua hàng:", order.getFullName(), fontNormal);
        addInfoRow(buyerTable, "Địa chỉ (Address):", order.getAddress(), fontNormal);
        addInfoRow(buyerTable, "Hình thức thanh toán:", order.getPaymentMethod().equals("BANK_TRANSFER") ? "Chuyển khoản" : "Tiền mặt", fontNormal);
        addInfoRow(buyerTable, "Ghi chú (Note):", order.getNote(), fontNormal);
        document.add(buyerTable);
        document.add(new Paragraph("\n"));

        // --- PRODUCTS TABLE ---
        PdfPTable table = new PdfPTable(6);
        table.setWidthPercentage(100);
        table.setWidths(new float[]{1, 5, 2, 1.5f, 2.5f, 3});

        String[] headers = {"STT", "Tên hàng hóa, dịch vụ", "Đơn vị", "SL", "Đơn giá", "Thành tiền"};
        for (String h : headers) {
            PdfPCell cell = new PdfPCell(new Phrase(h, fontBold));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setPadding(5);
            table.addCell(cell);
        }

        int stt = 1;
        double subtotal = 0;
        for (OrderItemResponse item : order.getItems()) {
            table.addCell(new PdfPCell(new Phrase(String.valueOf(stt++), fontNormal)));
            table.addCell(new PdfPCell(new Phrase(item.getProductName() + "\n(RAM: " + item.getRam() + " | SSD: " + item.getStorage() + ")", fontSmall)));
            table.addCell(new PdfPCell(new Phrase("Chiếc", fontNormal)));
            table.addCell(new PdfPCell(new Phrase(String.valueOf(item.getQuantity()), fontNormal)));
            
            PdfPCell pCell = new PdfPCell(new Phrase(formatCurrency(item.getPrice()), fontNormal));
            pCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            table.addCell(pCell);

            double totalItem = item.getPrice() * item.getQuantity();
            PdfPCell tCell = new PdfPCell(new Phrase(formatCurrency(totalItem), fontNormal));
            tCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            table.addCell(tCell);
            subtotal += totalItem;
        }

        for (int i = stt; i <= 8; i++) {
            for (int j = 0; j < 6; j++) table.addCell(new PdfPCell(new Phrase(" ", fontNormal)));
        }
        document.add(table);

        // --- SUMMARY ---
        double vat = subtotal * 0.1;
        double total = subtotal + vat;

        PdfPTable sumTable = new PdfPTable(2);
        sumTable.setWidthPercentage(100);
        sumTable.setWidths(new float[]{8, 2});
        
        addSumRow(sumTable, "Cộng tiền hàng (Total amount):", formatCurrency(subtotal), fontBold);
        addSumRow(sumTable, "Thuế suất GTGT: 10%    Tiền thuế GTGT:", formatCurrency(vat), fontBold);
        addSumRow(sumTable, "TỔNG CỘNG TIỀN THANH TOÁN:", formatCurrency(total), fontBold);
        document.add(sumTable);

        Paragraph pWords = new Paragraph("Số tiền viết bằng chữ: " + NumberToWordsVN.convert(total), fontItalic);
        document.add(pWords);
        document.add(new Paragraph("\n"));

        // --- SIGNATURES ---
        PdfPTable signTable = new PdfPTable(2);
        signTable.setWidthPercentage(100);
        
        PdfPCell buyerSign = new PdfPCell(new Phrase("Người mua hàng (Buyer)\n(Ký, ghi rõ họ tên)", fontBold));
        buyerSign.setBorder(Rectangle.NO_BORDER);
        buyerSign.setHorizontalAlignment(Element.ALIGN_CENTER);
        signTable.addCell(buyerSign);

        PdfPCell sellerSign = new PdfPCell();
        sellerSign.setBorder(Rectangle.NO_BORDER);
        sellerSign.setHorizontalAlignment(Element.ALIGN_CENTER);
        sellerSign.addElement(new Paragraph("Người bán hàng (Seller)\n(Ký, ghi rõ họ tên)", fontBold));
        
        Paragraph pDigi = new Paragraph("\nChữ ký hợp lệ\nKý bởi: " + SHOP_NAME + "\nKý ngày: " + now.format(DateTimeFormatter.ofPattern("dd/MM/yyyy")), fontSmall);
        pDigi.getFont().setColor(Color.RED);
        sellerSign.addElement(pDigi);
        
        signTable.addCell(sellerSign);
        document.add(signTable);

        document.close();
    }

    private void addInfoRow(PdfPTable table, String label, String value, Font font) {
        Paragraph p = new Paragraph();
        p.add(new Chunk(label + " ", font));
        p.add(new Chunk(value != null ? value : "", font));
        PdfPCell cell = new PdfPCell(p);
        cell.setBorder(Rectangle.NO_BORDER);
        table.addCell(cell);
    }

    private void addSumRow(PdfPTable table, String label, String value, Font font) {
        PdfPCell c1 = new PdfPCell(new Phrase(label, font));
        c1.setHorizontalAlignment(Element.ALIGN_RIGHT);
        table.addCell(c1);
        PdfPCell c2 = new PdfPCell(new Phrase(value, font));
        c2.setHorizontalAlignment(Element.ALIGN_RIGHT);
        table.addCell(c2);
    }

    private String formatCurrency(Double amount) {
        if (amount == null) return "0";
        return String.format("%,.0f", amount);
    }
}
