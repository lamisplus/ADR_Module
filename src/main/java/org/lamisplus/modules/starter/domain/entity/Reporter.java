package org.lamisplus.modules.starter.domain.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Reporter {

    @Column(name = "last_name")
    private String lastName;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "address")
    private String address;
    @Column(name = "city")
    private String city;
    @Column(name="state")
    private String state;
    @Column(name="phone_number")
    private String phoneNumber;
    @Column(name="professional")
    private String professional;
    @Column(name="occupation")
    private String occupation;
}
