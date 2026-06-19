package com.example.fullsite;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VideoRepository extends JpaRepository<Video, Long> {
    // Easily pull all videos belonging to a specific logged-in user
    List<Video> findByUserId(Long userId);
}