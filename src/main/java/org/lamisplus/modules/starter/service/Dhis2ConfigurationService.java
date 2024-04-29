package org.lamisplus.modules.starter.service;

import org.lamisplus.modules.starter.domain.entity.Dhis2Configuration;
import org.lamisplus.modules.starter.exeception.ResourceNotFoundException;
import org.lamisplus.modules.starter.repository.Dhis2ConfigurationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Dhis2ConfigurationService {
    @Autowired
    private Dhis2ConfigurationRepository dhis2ConfigurationRepository;

    public List<Dhis2Configuration> getAllDhis2Configuration() {
        return dhis2ConfigurationRepository.findAll();
    }

    public Dhis2Configuration saveDhis2Configuration(Dhis2Configuration dhisConfiguration) {
        return dhis2ConfigurationRepository.save(dhisConfiguration);
    }

    public void deleteConfiguration(Long id) {
        Dhis2Configuration configuration = dhis2ConfigurationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Configuration", "id", id));
        dhis2ConfigurationRepository.delete(configuration);
    }

    public Dhis2Configuration updateConfiguration(Long id, Dhis2Configuration updatedDhis2Configuration) {
        Dhis2Configuration existingConfiguration = dhis2ConfigurationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Configuration", "id", id));
        existingConfiguration.setUrl(updatedDhis2Configuration.getUrl());
        existingConfiguration.setUsername(updatedDhis2Configuration.getUsername());
        existingConfiguration.setUsername(updatedDhis2Configuration.getPassword());
        return dhis2ConfigurationRepository.save(existingConfiguration);
    }

}
