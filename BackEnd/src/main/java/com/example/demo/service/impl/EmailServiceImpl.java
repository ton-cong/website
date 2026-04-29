package com.example.demo.service.impl;

import com.example.demo.entity.Order;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;
    private final UserRepository userRepository;

    @Value("${spring.mail.username}")
    private String senderEmail;

    @Override
    @Async
    public void sendOrderConfirmation(Order order) {
        log.info("Starting to send order confirmation email for Order ID: {}", order.getId());
        User user = userRepository.findById(order.getUserId()).orElse(null);
        if (user == null || user.getEmail() == null) {
            log.error("Could not send email, user not found or email is empty");
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(senderEmail);
            helper.setTo(user.getEmail());
            helper.setSubject("Xác nhận đơn hàng #" + order.getId() + " từ TQuad");

            String htmlContent = "<h2>Cảm ơn bạn đã đặt hàng tại TQuad!</h2>"
                    + "<p>Xin chào <b>" + order.getFullName() + "</b>,</p>"
                    + "<p>Đơn hàng <b>#" + order.getId() + "</b> của bạn đã được tiếp nhận và đang trong quá trình chờ xử lý.</p>"
                    + "<h3>Thông tin giao hàng:</h3>"
                    + "<ul>"
                    + "<li><b>Người nhận:</b> " + order.getFullName() + "</li>"
                    + "<li><b>Điện thoại:</b> " + order.getPhone() + "</li>"
                    + "<li><b>Địa chỉ:</b> " + order.getAddress() + "</li>"
                    + "<li><b>Tổng tiền:</b> " + String.format("%,.0f", order.getTotalPrice()) + "đ</li>"
                    + "<li><b>Phương thức thanh toán:</b> " + order.getPaymentMethod() + "</li>"
                    + "</ul>"
                    + "<br>"
                    + "<p>Trân trọng,<br>Đội ngũ TQuad.</p>";

            helper.setText(htmlContent, true);
            mailSender.send(message);

            log.info("Order confirmation email sent successfully to: {}", user.getEmail());
        } catch (MessagingException e) {
            log.error("Failed to send order confirmation email", e);
        }
    }

    @Override
    @Async
    public void sendNewPassword(String email, String newPassword) {
        log.info("Sending new password to email: {}", email);
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(senderEmail);
            helper.setTo(email);
            helper.setSubject("Yêu cầu cấp lại mật khẩu - TQuad");

            String htmlContent = "<h2>Cấp lại mật khẩu mới</h2>"
                    + "<p>Chào bạn,</p>"
                    + "<p>Chúng tôi đã nhận được yêu cầu cấp lại mật khẩu cho tài khoản của bạn.</p>"
                    + "<p>Mật khẩu mới của bạn là: <strong style='font-size: 18px; color: #d9534f;'>" + newPassword + "</strong></p>"
                    + "<p>Vui lòng đăng nhập bằng mật khẩu này và tiến hành đổi mật khẩu ngay lập tức để bảo mật tài khoản.</p>"
                    + "<br>"
                    + "<p>Trân trọng,<br>Đội ngũ TQuad.</p>";

            helper.setText(htmlContent, true);
            mailSender.send(message);

            log.info("New password email sent successfully to: {}", email);
        } catch (MessagingException e) {
            log.error("Failed to send new password email", e);
        }
    }
}
