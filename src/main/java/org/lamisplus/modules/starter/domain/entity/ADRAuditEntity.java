package org.lamisplus.modules.starter.domain.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.vladmihalcea.hibernate.type.array.IntArrayType;
import com.vladmihalcea.hibernate.type.array.StringArrayType;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import com.vladmihalcea.hibernate.type.json.JsonNodeBinaryType;
import com.vladmihalcea.hibernate.type.json.JsonNodeStringType;
import com.vladmihalcea.hibernate.type.json.JsonStringType;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;
import org.lamisplus.modules.base.security.SecurityUtils;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.time.LocalDateTime;


@MappedSuperclass
@Data
@TypeDefs({
        @TypeDef(name = "string-array", typeClass = StringArrayType.class),
        @TypeDef(name = "int-array", typeClass = IntArrayType.class),
        @TypeDef(name = "json", typeClass = JsonStringType.class),
        @TypeDef(name = "jsonb", typeClass = JsonBinaryType.class),
        @TypeDef(name = "jsonb-node", typeClass = JsonNodeBinaryType.class),
        @TypeDef(name = "json-node", typeClass = JsonNodeStringType.class),
})
public class ADRAuditEntity {

    @Column(name = "created_date", updatable = false)
    @CreatedDate
    @JsonFormat(pattern = "yyyy-MM-dd-HH-mm-ss")
    private LocalDateTime createdDate = LocalDateTime.now ();
    @ToString.Exclude
    @Column(name = "created_by", updatable = false)
    private String createdBy = SecurityUtils.getCurrentUserLogin ().orElse ("");

    @Column(name = "last_modified_date")
    @LastModifiedDate
    @JsonFormat(pattern = "yyyy-MM-dd-HH-mm-ss")
    private LocalDateTime lastModifiedDate = LocalDateTime.now ();

    @Column(name = "last_modified_by")
    @ToString.Exclude
    private String lastModifiedBy = SecurityUtils.getCurrentUserLogin ().orElse ("");

    @PrePersist
    @PreUpdate
    public void update() {
        lastModifiedDate = LocalDateTime.now ();
        lastModifiedBy = SecurityUtils.getCurrentUserLogin ().orElse ("");
    }

}
