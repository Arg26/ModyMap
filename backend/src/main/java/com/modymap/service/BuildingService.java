package com.modymap.service;

import com.modymap.entity.Building;
import com.modymap.repository.BuildingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BuildingService {

    private final BuildingRepository buildingRepository;

    public BuildingService(BuildingRepository buildingRepository) {
        this.buildingRepository = buildingRepository;
    }

    public List<Building> getAllBuildings() {
        return buildingRepository.findAll();
    }

    public Building getBuilding(Long id) {
        return buildingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Building not found"));
    }

    public List<Building> getByCategory(String category) {
        return buildingRepository.findByCategoryIgnoreCase(category);
    }

    public List<Building> search(String keyword) {
        return buildingRepository.search(keyword);
    }
}