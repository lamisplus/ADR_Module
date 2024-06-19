package org.lamisplus.modules.starter.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Reporter {

    private String lastName;
    private String firstName;
    private String address;
    private String city;
    private String state;
    private String phoneNumber;
    private String healthProfessional;
    private String occupation;
    private String country;
    private String email;
}
