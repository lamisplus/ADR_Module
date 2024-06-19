package org.lamisplus.modules.starter.repository;

import org.lamisplus.modules.starter.domain.dto.PatientDetails;
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

    @Query(value = "SELECT adr.patient_uuid,p.hospital_Number, p.first_Name, p.surname, p.sex " +
            "FROM adr_table adr " +
            "JOIN patient_person p on p.uuid=adr.patient_uuid",nativeQuery = true)
    List<PatientDetails> findPatientDataByAdr(@Param("patientUuid") String patientUuid);

    @Query(value = "SELECT adr.patient_uuid,p.hospital_Number, p.first_Name, p.surname, p.sex " +
            "FROM adr_table adr " +
            "JOIN patient_person p on p.uuid=adr.patient_uuid",nativeQuery = true)
    List<PatientDetails> getAllPatientAdr();



}
