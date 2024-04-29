package org.lamisplus.modules.starter.domain.mapper;

import org.lamisplus.modules.starter.domain.dto.request.Dhis2ConfigurationDTO;
import org.lamisplus.modules.starter.domain.entity.Dhis2Configuration;
import org.springframework.stereotype.Component;

@Component
public class Dhis2ConfigurationMapper {
    public Dhis2ConfigurationDTO toDhisConfigurationDTO(Dhis2Configuration dhisConfiguration) {
        Dhis2ConfigurationDTO dhisConfigurationDTO = new Dhis2ConfigurationDTO();
        dhisConfigurationDTO.setUrl(dhisConfiguration.getUrl());
        dhisConfigurationDTO.setUsername(dhisConfiguration.getUsername());
        dhisConfigurationDTO.setPassword(dhisConfiguration.getPassword());
        return dhisConfigurationDTO;
    }

    public Dhis2Configuration toDhisConfiguration(Dhis2ConfigurationDTO dhisConfigurationDTO) {
        Dhis2Configuration dhisConfiguration = new Dhis2Configuration();
        dhisConfiguration.setUrl(dhisConfigurationDTO.getUrl());
        dhisConfiguration.setUsername(dhisConfigurationDTO.getUsername());
        dhisConfiguration.setPassword(dhisConfigurationDTO.getPassword());
        return dhisConfiguration;
    }


}
