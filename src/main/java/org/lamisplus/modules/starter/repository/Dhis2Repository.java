package org.lamisplus.modules.starter.repository;

import org.lamisplus.modules.starter.domain.entity.DHIS2Config;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StarterRepository extends JpaRepository<DHIS2Config, Long> {
}
