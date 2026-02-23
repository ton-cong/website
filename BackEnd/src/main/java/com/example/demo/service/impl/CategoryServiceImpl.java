package com.example.demo.service.impl;

import com.example.demo.dto.request.CategoryRequestDTO;
import com.example.demo.dto.response.CategoryResponseDTO;
import com.example.demo.entity.Category;
import com.example.demo.mapper.CategoryMapper;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public CategoryResponseDTO createCategory(CategoryRequestDTO request) {
        Category category = categoryMapper.toCategory(request);
        categoryRepository.insert(category);
        return categoryMapper.toCategoryResponseDto(category);
    }

    @Override
    public CategoryResponseDTO updateCategory(int id, CategoryRequestDTO request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        category.setName(request.getName());
        category.setDescription(request.getDescription());
        categoryRepository.save(category);
        return categoryMapper.toCategoryResponseDto(category);
    }

    @Override
    public boolean deleteCategory(int id) {
        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Category not found with id: " + id);
        }
        categoryRepository.deleteById(id);
        return true;
    }

    @Override
    public List<CategoryResponseDTO> getAllCategory() {
        return categoryRepository.findAll().stream()
                .map(categoryMapper::toCategoryResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public Page<CategoryResponseDTO> getAllCategory(int page, int size, String sortBy, String sortDir) {
        long total = categoryRepository.count();
        int offset = page * size;
        List<CategoryResponseDTO> list = categoryRepository.findAllPaged(sortBy, sortDir, size, offset)
                .stream()
                .map(categoryMapper::toCategoryResponseDto)
                .collect(Collectors.toList());
        return new PageImpl<>(list, PageRequest.of(page, size), total);
    }

    @Override
    public CategoryResponseDTO getById(int id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        return categoryMapper.toCategoryResponseDto(category);
    }
}
