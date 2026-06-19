# Video Creator Toolkit

A high-performance, full-stack media processing workspace designed to handle on-demand video transcoding, lightweight editing proxy generation, and direct studio-quality audio extraction profiles. This system pairs a secure Spring Boot REST engine with a native background FFmpeg hardware abstraction pipeline and an automated AWS S3 cloud distribution matrix.

## Core Features

* **Lightweight Production Proxies:** Compiles swift, highly responsive 480p H.264 streams optimized for immediate, stutter-free timeline skipping and playback in video editing software.
* **Optimized File Compression:** Multi-pass `libx264` processing with raised Constant Rate Factors (CRF=28) and `slow` computational presets to drastically minimize file sizes while preserving absolute decoder compliance across all web browsers.
* **Dynamic Audio Extraction:** Isolates and strips audio tracks directly from heavy video containers, transforming source files into optimized, independent 192kbps MP3 assets.
* **Secure Cloud Storage Delivery:** Native AWS SDK integrations providing real-time, time-restricted S3 presigned viewer tokens to shield structural assets from public visibility.
* **Relational Workspace History:** Maintains transactional tracking maps and persistent processing metadata logs bound via an integrated PostgreSQL database schema.

---

## Technical Pipeline Architecture

The application balances high-compute server-side media processing with smooth, decoupled web client operations:

[React 18 / Vite Frontend Portal]
│
│  (JWT Authorization Handshake Header)
▼
[Spring Boot REST Engine Gateway]
├───► [Local OS Worker Process + FFmpeg Native Binary CLI]
│         (Profiles: 480p Proxies / Smart Compression / MP3 Rips)
│
└───► [AWS S3 Sovereign Cloud Storage Infrastructure]
(Secure Time-Locked Presigned Resource Playback Links)


### Underlying Technology Infrastructure Stack

* **Application Client UI Layer:** React 18, TypeScript Engine, Tailwind CSS, Vite Bundler
* **Application Core Architecture Layer:** Java 17 Runtime, Spring Boot 3 Framework, Spring Security Core (JWT)
* **Data Strategy Framework Layer:** PostgreSQL Engine, Spring Data JPA / Hibernate Resource Mapping
* **System Processing Framework Layer:** Native FFmpeg System Binary, AWS Java SDK v2 (S3 Cloud Interface), Project Lombok

---

## Initialization & Workspace Execution

### Environmental System Requirements

Verify that your host system satisfies the minimal processing parameters listed here:
* Java Development Kit (JDK) 17 or higher
* Node.js Environment Runtime Version 18 or higher
* Active PostgreSQL Database Engine instance
* **System FFmpeg Framework Core:** The raw system binary must be globally configured and discoverable on your operating system’s environment execution matrix (`ffmpeg -version`).

### 1. Application Core Setup

Open and verify your environment parameters within your core properties profile file: `src/main/resources/application.properties`

```properties
# Relational Database Connection Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/your_database_name
spring.datasource.username=your_system_username
spring.datasource.password=your_secure_password

# Multi-part Payload Upload Size Configuration Thresholds
spring.servlet.multipart.max-file-size=500MB
spring.servlet.multipart.max-request-size=500MB

# Sovereign AWS Storage S3 Bucket Parameters
aws.s3.bucket-name=your-production-bucket-name
aws.region=us-east-2
Execute the core server compilation process to boot the microservice context:

Bash
./mvnw spring-boot:run
2. Client Interface Setup
Initialize the node packaging structure context and start the client UI asset compilation service:

Bash
npm install
npm run dev
Navigate your local web browser to http://localhost:5173 to begin utilizing the toolkit engine features.

API Routing Specification Guide
All communication paths are protected by network interceptors. Include your valid JWT token in your request headers: Authorization: Bearer <TOKEN>.

Media Asset Execution Processing Path
Network Endpoint Route: POST /api/v1/video/process

Request Structure Profile: multipart/form-data

Route Query Modifiers:

action (Optional Parameters | Core Default: proxy): Options include proxy, compress, or audio.

Network Status Validation Code: 200 OK returns a plain text string container indicating a direct secure presigned S3 object link.

User Workspace Asset Library Retrieval Path
Network Endpoint Route: GET /api/v1/video/my-videos

Network Status Validation Code: 200 OK returns an indexed array cluster layout of authenticated presigned video links.

Technical System Architecture & Core Integrity Insights
Browser Streaming Decoupling Fixes: Raw high-efficiency formats (like basic H.265/HEVC streams) face severe browser limitations depending on hardware constraints and OS licensing. This platform eliminates blank-screen / audio-only playback failures by forcing standard 8-bit color space architectures (-pix_fmt yuv420p) combined with fine-tuned Constant Rate Factor options on native H.264 (libx264) profiles. This makes all output streams instantly playable inside standard HTML5 video canvases.

State Interceptor Protection Logic: To resolve authentication timing conflicts during hard browser reloads, frontend synchronization sequences (useEffect) actively evaluate local storage keys prior to requesting assets. This prevents unauthorized handshake drops and stops unexpected 403 Forbidden authorization failures from occurring on page boot.
