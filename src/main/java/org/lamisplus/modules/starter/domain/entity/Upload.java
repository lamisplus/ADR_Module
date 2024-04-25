package org.lamisplus.modules.starter.domain.entity;

import lombok.Data;
import java.time.LocalDate;

import javax.persistence.*;

@Entity
@Table(name = "DHIS2_Uploads")
@Data
public class Upload {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String filename;
    private LocalDate uploadDate;
    private String status;

}
