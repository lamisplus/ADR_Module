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

//    @Query(value = "SELECT adr.patient_uuid,p.hospital_Number, p.first_Name, p.surname, p.sex " +
//            "FROM adr_table adr " +
//            "JOIN patient_person p on p.uuid=adr.patient_uuid",nativeQuery = true)
//    List<PatientDetails> findPatientDataByAdr(@Param("patientUuid") String patientUuid);

//    @Query(value = "SELECT adr.patient_uuid,p.hospital_Number, p.first_Name, p.surname, p.sex " +
//            "FROM adr_table adr " +
//            "JOIN patient_person p on p.uuid=adr.patient_uuid",nativeQuery = true)
//    List<PatientDetails> getAllPatientAdr();


//    @Query(value = "SELECT p.hospital_number AS hospitalNumber, p.first_name AS firstName, p.surname AS surname, p.sex AS sex, " +
//            "adr.patient_uuid AS patientUuid, adr.weight, adr.facility_id AS facilityID, adr.adverse_effect AS adverseEffect, " +
//            "adr.severe_drugs AS severeDrugs, adr.concomitant_medicines AS concomitantMedicines, adr.reporter " +
//            "FROM adr_table adr " +
//            "JOIN patient_person p ON p.uuid = adr.patient_uuid", nativeQuery = true)
//    List<PatientDetails> getAllPatientAdr();
//

    @Query(value = "SELECT p.hospital_number, p.first_name, p.surname, p.sex, " +
            "adr.patient_uuid, adr.weight, adr.facility_id, adr.adverse_effect, " +
            "adr.severe_drugs, adr.concomitant_medicines, adr.reporter " +
            "FROM adr_table adr " +
            "JOIN patient_person p ON p.uuid = adr.patient_uuid", nativeQuery = true)
    List<Object[]> getAllPatientAdr();


}
