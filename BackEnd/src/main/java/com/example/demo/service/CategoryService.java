package com.example.demo.service;

import com.example.demo.dto.request.CategoryRequestDTO;
import com.example.demo.dto.response.CategoryResponseDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface CategoryService {

    CategoryResponseDTO createCategory(CategoryRequestDTO request);

    CategoryResponseDTO updateCategory(int id, CategoryRequestDTO request);

    boolean deleteCategory(int id);

    List<CategoryResponseDTO> getAllCategory();

    CategoryResponseDTO getById(int id);
}
