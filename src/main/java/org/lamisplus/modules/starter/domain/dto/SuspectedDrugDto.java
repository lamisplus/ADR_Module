package org.lamisplus.modules.starter.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SuspectedDrugDto {

    private String drugType;
    private String brandName;
    private String genericName;
    private String addressOfManufacturer;
    private String batchNo;
    private String NAFDACNo;
    private String expiryDate;
    private Integer drugDosage;
    private Integer frequency;
    private String routeOfAdministration;
    private String medicationStarted;
    private String medicationStopped;
    private String reactionStarted;
    private String reactionStopped;
    private String reactionReduced;
    private String reactionReappearedAfterReintroduction;


}
