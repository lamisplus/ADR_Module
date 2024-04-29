package org.lamisplus.modules.starter.controller;

import org.lamisplus.modules.starter.domain.dto.request.Dhis2ConfigurationDTO;
import org.lamisplus.modules.starter.domain.entity.Dhis2Configuration;
import org.lamisplus.modules.starter.domain.mapper.Dhis2ConfigurationMapper;
import org.lamisplus.modules.starter.service.Dhis2ConfigurationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/v1/configuration")
public class Dhis2ConfigurationController {
    @Autowired
    private Dhis2ConfigurationService dhis2ConfigurationService;

    @Autowired
    private Dhis2ConfigurationMapper dhis2ConfigurationMapper;

    public Dhis2ConfigurationController(Dhis2ConfigurationService dhis2ConfigurationService, Dhis2ConfigurationMapper dhis2ConfigurationMapper) {
        this.dhis2ConfigurationService = dhis2ConfigurationService;
        this.dhis2ConfigurationMapper = dhis2ConfigurationMapper;
    }

    @GetMapping("/")
    public List<Dhis2Configuration> getAllConfiguration() {
//      return dhis2ConfigurationService.getAllDhis2Configuration().stream()
//              .map(dhis2ConfigurationMapper::toDhisConfigurationDTO)
//              .collect(Collectors.toList());
        return dhis2ConfigurationService.getAllDhis2Configuration();
    }
    @PostMapping("/")
    public Dhis2ConfigurationDTO addConfiguration(@RequestBody Dhis2ConfigurationDTO dhisConfigurationDTO) {
        return dhis2ConfigurationMapper.toDhisConfigurationDTO(
                dhis2ConfigurationService.saveDhis2Configuration(
                        dhis2ConfigurationMapper.toDhisConfiguration(dhisConfigurationDTO)));
    }

    @PutMapping("/{id}")
    public Dhis2ConfigurationDTO updateConfiguration(@PathVariable Long id, @RequestBody Dhis2ConfigurationDTO dhisConfigurationDTO) {
        return dhis2ConfigurationMapper.toDhisConfigurationDTO(
                dhis2ConfigurationService.updateConfiguration(id, dhis2ConfigurationMapper.toDhisConfiguration(dhisConfigurationDTO)));
    }

    @DeleteMapping("/{id}")
    public void deleteConfiguration(@PathVariable Long id) {
        dhis2ConfigurationService.deleteConfiguration(id);
    }
}
