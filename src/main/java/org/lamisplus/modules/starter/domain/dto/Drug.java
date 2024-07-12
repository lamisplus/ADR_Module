package org.lamisplus.modules.starter.domain.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Drug {

    @NotNull(message = "drugType is required")
    private String drugType;
    @NotNull(message = "drugName is required")
    private String brandName;
    @NotNull(message = "genericName is required")
    private String genericName;
    @NotNull(message = "strength is required")
    private String ManufacturerName;
    @NotNull(message = "manufacturerAddress is required")
    private String manufacturerAddress;
    @NotNull(message = "manufacturerCountry is required")
    private String batchNo;
    @NotNull(message = "batchNo is required")
    private String nafdacNo;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date expiryDate;
    @NotNull(message = "relevant is required")
    private Integer dosage;
    @NotNull(message = "frequency is required")
    private Integer frequency;
    @NotNull(message = "duration is required")
    private String administrationRoute;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @NotNull(message = "dateMedicationStarted is required")
    private Date dateMedicationStarted;
    private Date dateMedicationStopped;
    @NotNull(message = "reasonMedicationStopped is required")
    private String reactionStopped;
    @NotNull(message = "reactionReappeared is required")
    private String reactionReappeared;

}
