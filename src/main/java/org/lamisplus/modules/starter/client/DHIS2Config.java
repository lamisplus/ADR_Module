package org.lamisplus.modules.starter.domain.entity;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DHIS2Config {
    @Value("${dhis2.username}")
    private String username;

    @Value("${dhis2.password}")
    private String password;

    @Value("${dhis2.baseUrl}")
    private String baseUrl;

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
