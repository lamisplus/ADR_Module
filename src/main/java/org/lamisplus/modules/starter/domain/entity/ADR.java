package org.lamisplus.modules.starter.domain.entity;


import java.io.Serializable;


import javax.persistence.*;

import lombok.*;
import org.hibernate.annotations.Type;
import org.lamisplus.modules.patient.domain.Patient;
import org.springframework.data.domain.Persistable;
import com.fasterxml.jackson.databind.JsonNode;
import javax.persistence.Entity;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "adr_table")
public class ADR extends ADRAuditEntity implements Persistable<Long>, Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false)
    private Long id;
    @Column(name = "patient_uuid")
    private String patientUuid;
    @Column(name = "weight")
    private Integer weight;
    @Column(name = "facility_id")
    private Long facilityID;
    @Type(type = "jsonb-node")
    @Column(columnDefinition = "jsonb", name = "adverse_effect", nullable = true)
    private JsonNode adverseEffect;

    @Type(type = "jsonb-node")
    @Column(columnDefinition = "jsonb", name = "severe_drugs", nullable = true)
    private JsonNode severeDrugs;

    @Type(type = "jsonb-node")
    @Column(columnDefinition = "jsonb", name = "concomitant_medicines", nullable = true)
    private JsonNode concomitantMedicines;

    @Type(type = "jsonb-node")
    @Column(columnDefinition = "jsonb", name = "reporter", nullable = true)
    private JsonNode reporter;

    @Override
    public boolean isNew() {
        // TODO Auto-generated method stub
        return id == null;
    }
}
