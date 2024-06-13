package org.lamisplus.modules.starter.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReporterDto {

    private String lastName;
    private String firstName;
    private String address;
    private String city;
    private String state;
    private String phoneNumber;
    private String professional;
    private String occupation;
}
