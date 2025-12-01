package com.example.demo.entity;

import com.example.demo.enums.ProductStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    private String description;

    private String specifications;

    private Double price;

    @Column(name = "sale_price")
    private Double salePrice;

    private Integer stock;

    @Column(name = "image_url")
    private String imageUrl;

    private String brand;

    private String cpu;

    private String ram;

    private String storage;

    private String screen;

    @Enumerated(EnumType.STRING)
    private ProductStatus status;

    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;
}
