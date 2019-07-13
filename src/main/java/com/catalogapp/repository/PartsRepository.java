package com.catalogapp.repository;

import com.catalogapp.domain.Parts;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Parts entity.
 */
@Repository
public interface PartsRepository extends JpaRepository<Parts, Long> {

    @Query(value = "select distinct parts from Parts parts left join fetch parts.vehicleModels",
        countQuery = "select count(distinct parts) from Parts parts")
    Page<Parts> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct parts from Parts parts left join fetch parts.vehicleModels")
    List<Parts> findAllWithEagerRelationships();

    @Query("select parts from Parts parts left join fetch parts.vehicleModels where parts.id =:id")
    Optional<Parts> findOneWithEagerRelationships(@Param("id") Long id);

}
