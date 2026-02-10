package com.example.demo.service.impl;

import com.example.demo.dto.request.CategoryRequestDTO;
import com.example.demo.dto.response.CategoryResponseDTO;
import com.example.demo.entity.Category;
import com.example.demo.mapper.CategoryMapper;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public CategoryResponseDTO createCategory(CategoryRequestDTO request) {

        if (categoryRepository.existsByName(request.getName())) {
            throw new RuntimeException("Category name already exists");
        }

        Category category = categoryMapper.toCategory(request);

        Category saved = categoryRepository.save(category);

        return categoryMapper.toCategoryResponseDto(saved);
    }

    @Override
    public CategoryResponseDTO updateCategory(int id, CategoryRequestDTO request) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (categoryRepository.existsByName(request.getName())
                && !category.getName().equals(request.getName())) {
            throw new RuntimeException("Category name already exists");
        }

        category.setName(request.getName());
        category.setDescription(request.getDescription());

        Category updated = categoryRepository.save(category);

        return categoryMapper.toCategoryResponseDto(updated);
    }

    @Override
    public boolean deleteCategory(int id) {
        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Category not found");
        }

        categoryRepository.deleteById(id);
        return true;
    }

    @Override
    public List<CategoryResponseDTO> getAllCategory() {
        return categoryRepository.findAll()
                .stream()
                .map(categoryMapper::toCategoryResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryResponseDTO getById(int id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        return categoryMapper.toCategoryResponseDto(category);
    }
}
