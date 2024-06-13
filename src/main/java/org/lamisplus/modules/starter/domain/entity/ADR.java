package org.lamisplus.modules.starter.domain.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "ADR_table")
public class ADR {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "patient_id")
    @NotNull(message = "PatientId must not be null")
    private Long patientId;
    @Column(name = "weight")
    @NotNull(message = "weight must not be null")
    private Integer weight;
    @Embedded
    @Column(name = "adverse_event")
    private AdverseEvent adverseEvent;
    @Embedded
    @Column(name = "suspected_drug")
    private SuspectedDrug suspectedDrug;
    @Embedded
    @Column(name = "concomitant_medicines")
    private ConcomitantMedicines concomitantMedicines;
    @Column(name = "relevant_test")
    private String relevantTest;
    @Column(name= "relevant_test_date")
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date relevantTestDate;
    @Column(name= "preexisting_medical_conditions")
    private String preexistingMedicalConditions;
    @Embedded
    @Column(name= "reporter")
    @NotNull(message = "Reporter must not be null")
    private Reporter reporter;
}
