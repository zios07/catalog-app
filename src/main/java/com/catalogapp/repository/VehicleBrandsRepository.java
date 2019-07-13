package com.catalogapp.repository;

import com.catalogapp.domain.VehicleBrands;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the VehicleBrands entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VehicleBrandsRepository extends JpaRepository<VehicleBrands, Long> {

}
