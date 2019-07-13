package com.catalogapp.repository;

import com.catalogapp.domain.VehicleModels;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the VehicleModels entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VehicleModelsRepository extends JpaRepository<VehicleModels, Long> {

}
