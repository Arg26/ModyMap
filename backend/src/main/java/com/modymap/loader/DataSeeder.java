package com.modymap.loader;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.modymap.entity.Building;
import com.modymap.entity.User;
import com.modymap.repository.BuildingRepository;
import com.modymap.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

@Component
public class DataSeeder implements CommandLineRunner {

    private final BuildingRepository buildingRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(BuildingRepository buildingRepository,
                    UserRepository userRepository,
                    PasswordEncoder passwordEncoder) {
        this.buildingRepository = buildingRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        if (buildingRepository.count() == 0) {
            InputStream input =
                    new ClassPathResource("ModyData.json").getInputStream();
            List<Map<String, Object>> buildings =
                    mapper.readValue(input,
                            new TypeReference<>() {
                            });
            for (Map<String, Object> b : buildings) {
                Building building = new Building();
                building.setName((String) b.get("NAME"));
                building.setCategory((String) b.get("CATEGORY"));
                building.setDescription((String) b.get("DESCRIPTION"));
                building.setLatitude(((Number) b.get("LATITUDE")).doubleValue());
                building.setLongitude(((Number) b.get("LONGITUDE")).doubleValue());
                building.setTiming((String) b.get("TIMING"));
                building.setImageUrl((String) b.get("IMAGE_URL"));
                building.setContacts((String) b.get("CONTACTS"));
                Object emailObj = b.get("EMAIL");
                if (emailObj instanceof String) {
                    building.setEmail((String) emailObj);
                } else {
                    building.setEmail(mapper.writeValueAsString(emailObj));
                }
                buildingRepository.save(building);
            }
            System.out.println("Loaded Buildings: " + buildingRepository.count());
        }

        if (userRepository.count() == 0) {
            ClassPathResource usersResource = new ClassPathResource("users40.json");

            if (!usersResource.exists()) {
                System.out.println("users40.json not found on classpath, skipping user seeding.");
                return;
            }

            try (InputStream input = usersResource.getInputStream()) {
                List<User> users =
                        mapper.readValue(input,
                                new TypeReference<List<User>>() {
                                });
                for (User user : users) {
                    user.setPassword(
                            passwordEncoder.encode(user.getPassword())
                    );
                    if (user.getRole() == null || user.getRole().isBlank()) {
                        user.setRole("STUDENT");
                    }
                    userRepository.save(user);
                }
                System.out.println("Loaded Users: " + userRepository.count());
            }
        }
    }
}
