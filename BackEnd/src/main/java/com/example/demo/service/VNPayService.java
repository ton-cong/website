package com.example.demo.service;

import com.example.demo.config.VNPayConfig;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class VNPayService {

    @Value("${vnpay.tmnCode}")    private String tmnCode;
    @Value("${vnpay.hashSecret}") private String hashSecret;
    @Value("${vnpay.payUrl}")     private String payUrl;
    @Value("${vnpay.returnUrl}")  private String returnUrl;

    public String createPaymentUrl(long amount, String orderInfo, HttpServletRequest req) {
        Map<String, String> p = new TreeMap<>();
        p.put("vnp_Version",    "2.1.0");
        p.put("vnp_Command",    "pay");
        p.put("vnp_TmnCode",    tmnCode);
        p.put("vnp_Amount",     String.valueOf(amount * 100));
        p.put("vnp_CurrCode",   "VND");
        p.put("vnp_TxnRef",     VNPayConfig.getRandomNumber(8));
        p.put("vnp_OrderInfo",  orderInfo.replaceAll("[^a-zA-Z0-9]", ""));
        p.put("vnp_OrderType",  "other");
        p.put("vnp_Locale",     "vn");
        p.put("vnp_ReturnUrl",  returnUrl);
        p.put("vnp_IpAddr",     VNPayConfig.getIpAddress(req));

        SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmss");
        fmt.setTimeZone(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));
        Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));
        p.put("vnp_CreateDate", fmt.format(cal.getTime()));
        cal.add(Calendar.MINUTE, 15);
        p.put("vnp_ExpireDate", fmt.format(cal.getTime()));

        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        for (var it = p.entrySet().iterator(); it.hasNext(); ) {
            var e = it.next();
            try {
                String v = URLEncoder.encode(e.getValue(), StandardCharsets.US_ASCII.toString());
                String k = URLEncoder.encode(e.getKey(), StandardCharsets.US_ASCII.toString());
                hashData.append(e.getKey()).append('=').append(v);
                query.append(k).append('=').append(v);
            } catch (Exception ex) { ex.printStackTrace(); }
            if (it.hasNext()) { hashData.append('&'); query.append('&'); }
        }

        String hash = VNPayConfig.hmacSHA512(hashSecret, hashData.toString());
        return payUrl + "?" + query + "&vnp_SecureHash=" + hash;
    }
}
