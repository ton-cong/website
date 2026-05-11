import React from 'react';
import '../../styles/invoice.css';
import tquadStamp from '../../assets/tquad_stamp.png';

const numberToVietnameseWords = (number) => {
    const units = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
    const tens = ['', 'mười', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'];

    if (number === 0) return 'Không đồng';

    let words = '';
    const billion = Math.floor(number / 1000000000);
    const million = Math.floor((number % 1000000000) / 1000000);
    const thousand = Math.floor((number % 1000000) / 1000);
    const remainder = Math.floor(number % 1000);

    if (billion > 0) words += `${numberToVietnameseWords(billion)} tỷ `;
    if (million > 0) words += `${numberToVietnameseWords(million)} triệu `;
    if (thousand > 0) words += `${numberToVietnameseWords(thousand)} nghìn `;

    if (remainder > 0) {
        const hundreds = Math.floor(remainder / 100);
        const tensDigit = Math.floor((remainder % 100) / 10);
        const unitsDigit = remainder % 10;

        if (hundreds > 0) words += `${units[hundreds]} trăm `;
        else if (billion > 0 || million > 0 || thousand > 0) words += 'không trăm ';

        if (tensDigit > 1) {
            words += `${tens[tensDigit]} `;
            if (unitsDigit === 1) words += 'mốt ';
            else if (unitsDigit === 5) words += 'lăm ';
            else if (unitsDigit > 0) words += `${units[unitsDigit]} `;
        } else if (tensDigit === 1) {
            words += 'mười ';
            if (unitsDigit === 5) words += 'lăm ';
            else if (unitsDigit > 0) words += `${units[unitsDigit]} `;
        } else if (unitsDigit > 0) {
            if (billion > 0 || million > 0 || thousand > 0 || hundreds > 0) words += 'linh ';
            words += `${units[unitsDigit]} `;
        }
    }

    return words.trim() + ' đồng';
};

const InvoiceTemplate = ({ order, sellerInfo }) => {
    if (!order) return null;

    const items = order.items || order.orderItems || [];
    
    // Sử dụng tổng tiền từ đơn hàng làm gốc để đảm bảo tính chính xác tuyệt đối
    const totalPayment = order.totalPrice || order.totalAmount || 0;
    
    // Giả định thuế VAT 10% đã bao gồm trong tổng tiền
    const subtotal = Math.round(totalPayment / 1.1);
    const vatAmount = totalPayment - subtotal;

    const date = order.createdAt ? new Date(order.createdAt) : new Date();
    
    const defaultSeller = {
        name: 'CÔNG TY TNHH CÔNG NGHỆ TQUAD',
        taxCode: '0109123456',
        address: 'Số 123 Đường ABC, Quận Cầu Giấy, Hà Nội, Việt Nam',
        phone: '0123.456.789',
        email: 'contact@tquad.vn',
        website: 'http://tquad.vn',
        accountNo: '0451000450388',
        bank: 'Ngân hàng Vietcombank - CN Thành Công Hà Nội'
    };

    const seller = { ...defaultSeller, ...sellerInfo };

    const getPaymentMethod = (method) => {
        if (!method) return 'TM/CK';
        const m = method.toUpperCase();
        if (m.includes('BANK') || m.includes('TRANSFER') || m.includes('VNPAY') || m.includes('QR')) {
            return 'CK (Chuyển khoản)';
        }
        return 'TM (Tiền mặt)';
    };

    return (
        <div className="invoice-container">
            <div className="invoice-watermark">
                TQuad STORE<br />Thiết bị Hi-End
            </div>

            <div className="invoice-header">
                <div className="logo-section">
                    <div className="logo-text">TQuad</div>
                    <div className="logo-subtext">Đẳng cấp Laptop Hi-End</div>
                </div>
                <div className="title-section">
                    <h1>HÓA ĐƠN GIÁ TRỊ GIA TĂNG</h1>
                    <div className="subtitle">(VAT INVOICE)</div>
                    <div style={{ fontSize: '11px', marginTop: '5px' }}>
                        Bản thể hiện của hóa đơn điện tử<br />
                        (Electronic invoice display)
                    </div>
                </div>
                <div className="serial-section">
                    <div>Ký hiệu (Serial): <span>1C23TQD</span></div>
                    <div>Số (No.): <span style={{ fontSize: '16px', color: '#d9534f' }}>{String(order.id).padStart(6, '0')}</span></div>
                </div>
            </div>

            <div className="invoice-date">
                Ngày {date.getDate()} tháng {date.getMonth() + 1} năm {date.getFullYear()}
            </div>

            <div className="info-section">
                <div className="info-row">
                    <div className="info-label">Đơn vị bán hàng (Seller):</div>
                    <div className="info-value font-bold">{seller.name}</div>
                </div>
                <div className="info-row">
                    <div className="info-label">Mã số thuế (Tax code):</div>
                    <div className="info-value">{seller.taxCode}</div>
                </div>
                <div className="info-row">
                    <div className="info-label">Địa chỉ (Address):</div>
                    <div className="info-value">{seller.address}</div>
                </div>
                <div className="info-row">
                    <div className="info-label" style={{ minWidth: '150px' }}>Điện thoại (Tel): {seller.phone}</div>
                    <div className="info-value" style={{ display: 'flex' }}>
                        <div style={{ flex: 1 }}>Email: {seller.email}</div>
                        <div style={{ flex: 1 }}>Website: {seller.website}</div>
                    </div>
                </div>
                <div className="info-row">
                    <div className="info-label">Số tài khoản (Account No.):</div>
                    <div className="info-value">{seller.accountNo}  Ngân hàng (Bank): {seller.bank}</div>
                </div>
            </div>

            <div className="info-section" style={{ borderTop: 'none', marginTop: '-20px' }}>
                <div className="info-row">
                    <div className="info-label">Họ tên người mua hàng:</div>
                    <div className="info-value">{order.fullName}</div>
                </div>
                <div className="info-row">
                    <div className="info-label">Tên đơn vị:</div>
                    <div className="info-value"></div>
                </div>
                <div className="info-row">
                    <div className="info-label">Mã số thuế:</div>
                    <div className="info-value"></div>
                </div>
                <div className="info-row">
                    <div className="info-label">Địa chỉ (Address):</div>
                    <div className="info-value">{order.address}</div>
                </div>
                <div className="info-row">
                    <div className="info-label">Hình thức thanh toán:</div>
                    <div className="info-value">{getPaymentMethod(order.paymentMethod)}</div>
                </div>
                <div className="info-row">
                    <div className="info-label">Ghi chú (Note):</div>
                    <div className="info-value">{order.note}</div>
                </div>
            </div>

            <table className="invoice-table">
                <thead>
                    <tr>
                        <th style={{ width: '40px' }}>STT<br />(No.)</th>
                        <th>Tên hàng hóa, dịch vụ<br />(Description)</th>
                        <th style={{ width: '80px' }}>Đơn vị tính<br />(Unit)</th>
                        <th style={{ width: '60px' }}>Số lượng<br />(Quantity)</th>
                        <th style={{ width: '100px' }}>Đơn giá<br />(Unit price)</th>
                        <th style={{ width: '120px' }}>Thành tiền<br />(Amount)</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td className="text-center">{index + 1}</td>
                            <td>
                                <div className="font-bold">{item.productName}</div>
                                <div style={{ fontSize: '11px', color: '#555' }}>
                                    {item.ram && item.storage ? `(RAM: ${item.ram} | SSD: ${item.storage})` : ''}
                                </div>
                            </td>
                            <td className="text-center">Chiếc</td>
                            <td className="text-center">{item.quantity}</td>
                            <td className="text-right">{item.price?.toLocaleString()}</td>
                            <td className="text-right">{(item.price * item.quantity)?.toLocaleString()}</td>
                        </tr>
                    ))}
                    {[...Array(Math.max(0, 8 - items.length))].map((_, i) => (
                        <tr key={`empty-${i}`} style={{ height: '30px' }}>
                            <td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <table className="summary-section">
                <tbody>
                    <tr>
                        <td colSpan="5" className="text-right font-bold" style={{ borderRight: 'none' }}>
                            Cộng tiền hàng (Total amount):
                        </td>
                        <td className="text-right font-bold" style={{ width: '120px' }}>
                            {subtotal.toLocaleString()}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="3" style={{ borderRight: 'none' }}>
                            Thuế suất GTGT (VAT rate): 10%
                        </td>
                        <td colSpan="2" className="text-right font-bold" style={{ borderLeft: 'none', borderRight: 'none' }}>
                            Tiền thuế GTGT (VAT amount):
                        </td>
                        <td className="text-right font-bold">
                            {vatAmount.toLocaleString()}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="5" className="text-right font-bold" style={{ borderRight: 'none', fontSize: '15px' }}>
                            TỔNG CỘNG TIỀN THANH TOÁN (Total payment):
                        </td>
                        <td className="text-right font-bold" style={{ fontSize: '15px' }}>
                            {totalPayment.toLocaleString()}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="amount-in-words">
                Số tiền viết bằng chữ (Amount in words): <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>{numberToVietnameseWords(totalPayment)}</span>
            </div>

            <div className="signature-section">
                <div className="signature-box">
                    <div className="signature-title">Người mua hàng (Buyer)</div>
                    <div className="signature-subtitle">(Ký, ghi rõ họ tên)</div>
                    <div className="signature-subtitle">(Sign, full name)</div>
                    <div className="signature-space"></div>
                </div>
                <div className="signature-box seller-stamp">
                    <div className="signature-title">Người bán hàng (Seller)</div>
                    <div className="signature-subtitle">(Ký, ghi rõ họ tên)</div>
                    <div className="signature-subtitle">(Sign, full name)</div>
                    <div className="signature-space">
                        <img src={tquadStamp} alt="Seller Stamp" className="stamp-img" />
                        <div className="digital-signature" style={{ marginTop: '40px' }}>
                            Chữ ký hợp lệ<br />
                            Ký bởi: CÔNG TY TNHH CÔNG NGHỆ TQUAD<br />
                            Ký ngày: {date.toLocaleDateString('vi-VN')}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '50px', fontSize: '10px', textAlign: 'center', borderTop: '1px dashed #ccc', paddingTop: '10px' }}>
                Đơn vị cung cấp dịch vụ Hóa đơn điện tử: Tập đoàn Công nghiệp - Viễn thông Quân đội (Viettel), MST: 0100109106<br />
                Tra cứu hóa đơn điện tử tại Website: https://sinvoice.viettel.vn/tracuu. Mã số bí mật: 80EMT2HH4BW3A7X. Mã của cơ quan thuế: 007B4B3EBE1DB045C491D5533460B79EB8
            </div>
        </div>
    );
};

export default InvoiceTemplate;
