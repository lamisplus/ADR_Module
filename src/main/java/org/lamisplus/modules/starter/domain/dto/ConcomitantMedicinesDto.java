package org.lamisplus.modules.starter.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ConcomitantMedicinesDto {

    private List<String> brands;
    private Integer dosage;
    private String route;
    private String display;
    private Date stopped;
    private String reasons;
}
