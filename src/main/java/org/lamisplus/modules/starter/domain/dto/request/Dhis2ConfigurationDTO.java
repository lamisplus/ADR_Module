package org.lamisplus.modules.starter.domain.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Dhis2ConfigurationDTO {
    private String url;
    private String username;
    private String password;
}
