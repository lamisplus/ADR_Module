package org.lamisplus.modules.starter.domain.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Convert;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

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
//    @Convert(converter = LocalDateTime.class)
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate expiryDate;
}
