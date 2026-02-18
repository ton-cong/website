package com.example.demo.specification;

import com.example.demo.entity.Product;
import org.springframework.data.jpa.domain.Specification;

public class ProductSpecification {

    private ProductSpecification() {


    }

    public static Specification<Product> hasKeyword(String keyword) {
        return (root, query, cb) -> {
            if (keyword == null || keyword.trim().isEmpty()) {
                return cb.conjunction();
            }
            String pattern = "%" + keyword.toLowerCase() + "%";
            return cb.or(
                    cb.like(cb.lower(root.get("name")), pattern),
                    cb.like(cb.lower(root.get("description")), pattern),
                    cb.like(cb.lower(root.get("brand")), pattern)
            );
        };
    }

    public static Specification<Product> hasCategory(Integer categoryId) {
        return (root, query, cb) -> {
            if (categoryId == null) {
                return cb.conjunction();
            }
            return cb.equal(root.get("category").get("id"), categoryId);
        };
    }

    public static Specification<Product> priceBetween(Double minPrice, Double maxPrice) {
        return (root, query, cb) -> {
            if (minPrice == null && maxPrice == null) {
                return cb.conjunction();
            }
            if (minPrice != null && maxPrice != null) {
                return cb.between(root.get("price"), minPrice, maxPrice);
            }
            if (minPrice != null) {
                return cb.greaterThanOrEqualTo(root.get("price"), minPrice);
            }
            return cb.lessThanOrEqualTo(root.get("price"), maxPrice);
        };
    }

    public static Specification<Product> hasBrand(String brand) {
        return (root, query, cb) -> {
            if (brand == null || brand.trim().isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(cb.lower(root.get("brand")), brand.toLowerCase());
        };
    }
}
