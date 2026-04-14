package com.example.demo.controller;

import com.example.demo.service.VNPayService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private VNPayService vnPayService;

    @PostMapping("/create")
    public ResponseEntity<?> createPayment(HttpServletRequest request,
                                           @RequestParam("amount") long amount,
                                           @RequestParam("orderInfo") String orderInfo) {
        String url = vnPayService.createPaymentUrl(amount, orderInfo, request);
        return ResponseEntity.ok(Map.of("status", "OK", "url", url));
    }
}
