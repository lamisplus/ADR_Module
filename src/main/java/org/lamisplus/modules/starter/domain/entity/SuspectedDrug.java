package org.lamisplus.modules.starter.domain.entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SuspectedDrug {

    @Column(name = "drug_type")
    private String drugType;
    @Column(name = "brand_name")
    private String brandName;
    @Column(name = "generic_name")
    private String genericName;
    @Column(name = "address_of_manufacturer")
    private String addressOfManufacturer;
    @Column(name = "batch_no")
    private String batchNo;
    @Column(name = "NAFDAC_No")
    private String NAFDACNo;
    @Column(name = "expiry_date")
    private String expiryDate;
    @Column(name = "drug_dosage")
    private Integer drugDosage;;
    @Column(name = "frequency")
    private Integer frequency;
    @Column(name = "route_of_administration")
    private String routeOfAdministration;
    @Column(name = "medication_started")
    private String medicationStarted;
    @Column(name = "medication_stopped")
    private String medicationStopped;
    @Column(name = "reaction_started")
    private String reactionStarted;
    @Column(name = "reaction_stopped")
    private String reactionStopped;
    @Column(name = "reaction_reduced")
    private String reactionReduced;
    @Column(name = "reaction_reappeared_after_reintroduction")
    private String reactionReappearedAfterReintroduction;


}
