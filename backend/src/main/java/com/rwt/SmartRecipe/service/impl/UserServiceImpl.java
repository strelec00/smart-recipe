package com.rwt.SmartRecipe.service.impl;

import com.rwt.SmartRecipe.dto.user.UserDTO;
import com.rwt.SmartRecipe.model.User;
import com.rwt.SmartRecipe.repository.UserRepository;
import com.rwt.SmartRecipe.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public UserDTO userToDTO(User user) {
        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    public User userDTOtoEntity(UserDTO userDTO) {
        return modelMapper.map(userDTO, User.class);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(this::userToDTO).collect(Collectors.toList());
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        return userRepository.findByEmail(email).map(this::userToDTO).orElseThrow(() ->
                new EntityNotFoundException("Couldn't find user with this email"));
    }

    @Override
    public UserDTO getUserById(UUID id) {
        return userRepository.findById(id).map(this::userToDTO).orElseThrow(() ->
                new EntityNotFoundException("User not found"));
    }

    @Override
    public UserDTO createUser(UserDTO user) {
        return userToDTO(userRepository.save(userDTOtoEntity(user)));
    }

    @Override
    public UserDTO updateUser(UserDTO user, UUID id) {
        if (!userRepository.existsById(id)) {
            throw new EntityNotFoundException("User not found");
        }

        return userToDTO(userRepository.save(userDTOtoEntity(user)));
    }

    @Override
    public void deleteUser(UUID id) {
        if (!userRepository.existsById(id)) {
            throw new EntityNotFoundException("User not found");
        }

        userRepository.deleteById(id);
    }
}
