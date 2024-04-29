package org.lamisplus.modules.starter.repository;

import org.lamisplus.modules.starter.domain.entity.Dhis2Configuration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Dhis2ConfigurationRepository extends JpaRepository<Dhis2Configuration, Long> {
}