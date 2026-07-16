package com.modymap.repository;

import com.modymap.entity.Building;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BuildingRepository extends JpaRepository<Building, Long> {

    List<Building> findByCategoryIgnoreCase(String category);

    List<Building> findByNameContainingIgnoreCase(String keyword);

    default List<Building> search(String keyword) {
        return findByNameContainingIgnoreCase(keyword);
    }
}