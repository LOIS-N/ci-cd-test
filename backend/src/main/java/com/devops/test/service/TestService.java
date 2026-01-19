package com.devops.test.service;

import com.devops.test.entity.AccessLog;
import com.devops.test.repository.AccessLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TestService {

    private final AccessLogRepository accessLogRepository;
    private final RedisTemplate<String, String> redisTemplate;

    private static final String VISITOR_COUNT_KEY = "visitorCount";

    public Map<String, Object> handleTest(String clientIp) {
        // Increment visitor count in Redis
        Long visitorCount = redisTemplate.opsForValue().increment(VISITOR_COUNT_KEY);

        // Save access log to MySQL
        AccessLog accessLog = new AccessLog();
        accessLog.setClientIp(clientIp);
        accessLogRepository.save(accessLog);

        // Get total count of access logs from database
        long dbLogCount = accessLogRepository.count();

        // Prepare response
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Connection Successful");
        response.put("visitorCount", visitorCount);
        response.put("dbLogCount", dbLogCount);

        return response;
    }

}
