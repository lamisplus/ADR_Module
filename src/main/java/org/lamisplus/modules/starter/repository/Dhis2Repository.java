package org.lamisplus.modules.starter.repository;

import org.lamisplus.modules.starter.domain.entity.Upload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Dhis2Repository extends JpaRepository<Upload, Long> {

}
