package com.example.demo.dto;

import lombok.Data;

@Data
public class TokenResponseDTO {
    private String token;
    private String userId;
    public TokenResponseDTO(String token, String userId) {
        this.token=token;
        this.userId=userId;
    }
}
