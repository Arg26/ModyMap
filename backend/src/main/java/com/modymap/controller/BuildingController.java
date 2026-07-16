package com.modymap.controller;

import com.modymap.entity.Building;
import com.modymap.service.BuildingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buildings")
@CrossOrigin(origins = "*")
public class BuildingController {

    private final BuildingService buildingService;

    public BuildingController(BuildingService buildingService) {
        this.buildingService = buildingService;
    }

    @GetMapping
    public List<Building> getAllBuildings() {
        return buildingService.getAllBuildings();
    }

    @GetMapping("/{id}")
    public Building getBuilding(@PathVariable Long id) {
        return buildingService.getBuilding(id);
    }

    @GetMapping("/search")
    public List<Building> search(
            @RequestParam String keyword) {

        return buildingService.search(keyword);
    }

    @GetMapping("/category/{category}")
    public List<Building> byCategory(
            @PathVariable String category) {

        return buildingService.getByCategory(category);
    }
}