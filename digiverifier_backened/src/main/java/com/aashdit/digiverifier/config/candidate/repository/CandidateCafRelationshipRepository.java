package com.aashdit.digiverifier.config.candidate.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aashdit.digiverifier.config.candidate.model.CandidateCafRelationship;

public interface CandidateCafRelationshipRepository extends JpaRepository<CandidateCafRelationship, Long> {

}
