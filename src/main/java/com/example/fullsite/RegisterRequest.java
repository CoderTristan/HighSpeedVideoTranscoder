package com.example.fullsite;

// Java Records automatically provide immutability, constructors, getters, equals, and hashcode
public record RegisterRequest(String firstname, String lastname, String email, String password) {}

