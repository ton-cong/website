package com.example.demo.dto.response;

import com.example.demo.entity.Category;
import com.example.demo.entity.Product;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryResponseDTO {
    private Integer id;

    private String name;

    private String description;

    private Timestamp createdAt;

}
