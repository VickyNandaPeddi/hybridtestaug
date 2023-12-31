package com.aashdit.digiverifier.config.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aashdit.digiverifier.config.superadmin.model.Source;

public interface SourceRepository extends JpaRepository<Source, Long> {

	Source findBySourceName(String sourceName);

	List<Source> findByIsActiveTrue();

}
