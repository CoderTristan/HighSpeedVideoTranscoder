package com.example.fullsite;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Path;
import java.nio.file.Files;


@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/transcode")
    public ResponseEntity<String> transcode(@RequestParam("file") MultipartFile file) throws Exception {

        Path input = Files.createTempFile("input-", ".mp4");
        Path output = Files.createTempFile("output-", ".mp4");

        file.transferTo(input.toFile());

        ProcessBuilder pb = new ProcessBuilder(
                "ffmpeg",
                "-i", input.toString(),
                "-vcodec", "libx264",
                "-acodec", "aac",
                output.toString()
        );

        pb.inheritIO().start().waitFor();

        return ResponseEntity.ok("Transcoding complete: " + output.toString());

    }

}