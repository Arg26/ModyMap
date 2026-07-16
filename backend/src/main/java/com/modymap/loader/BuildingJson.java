package com.modymap.loader;

import com.fasterxml.jackson.annotation.JsonProperty;

public class BuildingJson {

    @JsonProperty("ID")
    private Integer id;

    @JsonProperty("NAME")
    private String name;

    @JsonProperty("CATEGORY")
    private String category;

    @JsonProperty("DESCRIPTION")
    private String description;

    @JsonProperty("LATITUDE")
    private Double latitude;

    @JsonProperty("LONGITUDE")
    private Double longitude;

    @JsonProperty("TIMING")
    private String timing;

    @JsonProperty("IMAGE_URL")
    private String imageUrl;

    @JsonProperty("CONTACTS")
    private String contacts;

    @JsonProperty("EMAIL")
    private Object email;

    public BuildingJson() {}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getTiming() {
        return timing;
    }

    public void setTiming(String timing) {
        this.timing = timing;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getContacts() {
        return contacts;
    }

    public void setContacts(String contacts) {
        this.contacts = contacts;
    }

    public Object getEmail() {
        return email;
    }

    public void setEmail(Object email) {
        this.email = email;
    }
}