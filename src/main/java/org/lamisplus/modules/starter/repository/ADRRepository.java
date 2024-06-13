package org.lamisplus.modules.starter.repository;

import org.lamisplus.modules.starter.domain.entity.ADR;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ADRRepository extends JpaRepository<ADR, Long> {
    Optional<ADR> findByPatientId(Long patientId);
}
