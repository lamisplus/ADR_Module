package org.lamisplus.modules.starter.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Reporter {
    @NotNull(message = "lastName is required")
    private String lastName;
    @NotNull(message = "firstName is required")
    private String firstName;
    @NotNull(message = "middleName is required")
    private String address;
    @NotNull(message = "address is required")
    private String city;
    @NotNull(message = "city is required")
    private String state;
    private String phoneNumber;
    @NotNull(message = "phoneNumber is required")
    private String healthProfessional;
    private String occupation;
    @NotNull(message = "occupation is required")
    private String country;
    private String email;
}
