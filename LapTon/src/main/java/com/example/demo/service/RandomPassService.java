package com.example.demo.service;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RandomPassService {
    public String generateRandomPass(){
        String uuid = UUID.randomUUID().toString().replace("-","");
        return uuid.substring(20);
    }
}
