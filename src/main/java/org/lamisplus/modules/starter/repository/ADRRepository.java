package org.lamisplus.modules.starter.repository;

import org.lamisplus.modules.starter.domain.dto.PatientADRProjection;
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

    @Query(value = "SELECT p.hospital_Number, p.first_Name, p.surname, p.sex " +
        "FROM adr_table adr " +
        "JOIN patient_person p on p.uuid=adr.patient_uuid " +
        "WHERE adr.patient_uuid = :patientUuid", nativeQuery = true)
    List<ADR> findPatientDataByAdr(@Param("patientUuid") String patientUuid);

    @Query(value = "SELECT p.hospital_Number as hospitalNumber, p.first_Name as firstName, p.surname as surname, p.sex as sex, p.date_of_birth as dob, p.uuid as patientUuid\n" +
            "FROM adr_table adr\n" +
            "JOIN patient_person p on p.uuid=adr.patient_uuid",nativeQuery = true)
    List<PatientADRProjection> getAllPatientAdr();

    @Query(value = "SELECT p.hospital_Number as hospitalNumber, p.first_Name as firstName, p.surname as surname, p.sex as sex, p.date_of_birth as dob, p.uuid as patientUuid\n" +
            "FROM adr_table adr\n" +
            "JOIN patient_person p on p.uuid=adr.patient_uuid WHERE (p.first_name ilike ?1 OR p.surname ilike ?1 OR p.hospital_number ilike ?1)",nativeQuery = true)
    List<PatientADRProjection> getAllPatientAdrByParam(String queryParam);

}
