package com.example.demo.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

@Configuration
public class DatabaseInitConfig {

    @Bean
    public CommandLineRunner initDatabase(JdbcTemplate jdbcTemplate) {
        return args -> {
            try {
                jdbcTemplate.execute("ALTER TABLE users ADD COLUMN deleted TINYINT(1) DEFAULT 0");
                System.out.println("Successfully added 'deleted' column to 'users' table.");
            } catch (Exception e) {
                // Column might already exist, ignore
                System.out.println("Column 'deleted' might already exist or could not be added: " + e.getMessage());
            }
        };
    }
}
