package com.example.demo.mapper;

import com.example.demo.dto.response.ProductResponse;
import com.example.demo.dto.response.ProductVariantResponse;
import com.example.demo.entity.Product;
import com.example.demo.entity.ProductVariant;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.math.BigDecimal;

@Mapper(componentModel = "spring")
public abstract class ProductMapper {

    @Mapping(target = "categoryId", source = "categoryId")
    @Mapping(target = "categoryName", source = "category.name")
    @Mapping(target = "price", expression = "java(getFirstVariantPrice(product))")
    @Mapping(target = "salePrice", expression = "java(getFirstVariantSalePrice(product))")
    @Mapping(target = "stock", expression = "java(getFirstVariantStock(product))")
    @Mapping(target = "cpu", expression = "java(getFirstVariantCpu(product))")
    @Mapping(target = "ram", expression = "java(getFirstVariantRam(product))")
    @Mapping(target = "storage", expression = "java(getFirstVariantStorage(product))")
    @Mapping(target = "screen", expression = "java(getFirstVariantScreen(product))")
    @Mapping(target = "specifications", expression = "java(getFirstVariantSpecifications(product))")
    public abstract ProductResponse toResponse(Product product);

    public abstract ProductVariantResponse toVariantResponse(ProductVariant variant);

    protected BigDecimal getFirstVariantPrice(Product product) {
        if (product.getVariants() != null && !product.getVariants().isEmpty()) {
            return product.getVariants().get(0).getPrice();
        }
        return null;
    }

    protected BigDecimal getFirstVariantSalePrice(Product product) {
        if (product.getVariants() != null && !product.getVariants().isEmpty()) {
            return product.getVariants().get(0).getSalePrice();
        }
        return null;
    }

    protected Integer getFirstVariantStock(Product product) {
        if (product.getVariants() != null && !product.getVariants().isEmpty()) {
            return product.getVariants().get(0).getStock();
        }
        return null;
    }

    protected String getFirstVariantCpu(Product product) {
        if (product.getVariants() != null && !product.getVariants().isEmpty()) {
            return product.getVariants().get(0).getCpu();
        }
        return null;
    }

    protected String getFirstVariantRam(Product product) {
        if (product.getVariants() != null && !product.getVariants().isEmpty()) {
            return product.getVariants().get(0).getRam();
        }
        return null;
    }

    protected String getFirstVariantStorage(Product product) {
        if (product.getVariants() != null && !product.getVariants().isEmpty()) {
            return product.getVariants().get(0).getStorage();
        }
        return null;
    }

    protected String getFirstVariantScreen(Product product) {
        if (product.getVariants() != null && !product.getVariants().isEmpty()) {
            return product.getVariants().get(0).getScreen();
        }
        return null;
    }

    protected String getFirstVariantSpecifications(Product product) {
        if (product.getVariants() != null && !product.getVariants().isEmpty()) {
            return product.getVariants().get(0).getSpecifications();
        }
        return null;
    }
}
