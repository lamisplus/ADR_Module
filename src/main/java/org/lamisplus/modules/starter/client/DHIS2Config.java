package org.lamisplus.modules.starter.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
@ConfigurationProperties()
public class DHIS2Config {
    @Value("${dhis2.username}")
    private String username;

    @Value("${dhis2.password}")
    private String password;

    @Value("${dhis2.baseUrl}")
    private String baseUrl;
    @Value("${dhis2.readTimeout}")
    private Duration readTimeout;
    @Value("${dhis2.connectTimeout}")
    private Duration connectTimeout;

    public Duration getReadTimeout() {
        return readTimeout;
    }

    public void setReadTimeout(int readTimeout) {
        this.readTimeout = Duration.ofDays(readTimeout);
    }

    public Duration getConnectTimeout() {
        return connectTimeout;
    }

    public void setConnectTimeout(int connectTimeout) {
        this.connectTimeout = Duration.ofDays(connectTimeout);
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }
}
