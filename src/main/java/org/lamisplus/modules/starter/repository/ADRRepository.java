package org.lamisplus.modules.starter.repository;

import org.lamisplus.modules.starter.domain.entity.ADR;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ADRRepository extends JpaRepository<ADR, Long> {
    Optional<ADR> findByPatientUuid(String patientUuid);

    @Query(value = "SELECT p.hospital_number, p.first_name, p.surname, p.sex, adr.* FROM adr_table adr " +
            "JOIN patient_person p ON p.uuid = adr.patient_uuid WHERE adr.patient_uuid = :patientUuid", nativeQuery = true)
    List<Object[]> findPatientDataByAdr(@Param("patientUuid") String patientUuid);



}
