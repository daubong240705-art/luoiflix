package com.movieapp.backend.controller.admin;

import com.movieapp.backend.domain.User;
import com.movieapp.backend.dto.ResultPaginationDTO;
import com.movieapp.backend.dto.User.UserDTO;
import com.movieapp.backend.dto.User.UserRequest;
import com.movieapp.backend.service.UserService;
import com.movieapp.backend.util.annotation.ApiMessage;
import com.turkraft.springfilter.boot.Filter;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1/users")
@AllArgsConstructor
public class UserController {

  private final UserService userService;
  private final PasswordEncoder passwordEncoder;

  // API: danh sách người dùng
  @GetMapping
  @PreAuthorize("hasAuthority('ADMIN')")
  @ResponseStatus(HttpStatus.OK)
  @ApiMessage("Lấy danh sách người dùng thành công")
  public ResultPaginationDTO getAllUsers(
      @Filter Specification<User> spec,
      Pageable pageable) {

    return userService.getAllUsers(spec, pageable);
  }

  // API: lấy người dùng theo id
  @GetMapping("/{id}")
  @PreAuthorize("hasAuthority('ADMIN')")
  @ResponseStatus(HttpStatus.OK)
  @ApiMessage("Lấy thông tin người dùng thành công")
  public UserDTO getUserById(@PathVariable("id") Long id) {
    return userService.getUserById(id);
  }

  // API: Theem ngoui dung
  @PostMapping
  @PreAuthorize("hasAuthority('ADMIN')")
  @ResponseStatus(HttpStatus.CREATED)
  @ApiMessage("Tạo mới người dùng thành công")
  public UserDTO createUser(@RequestBody @Valid UserRequest request) {
    String hashPassword = passwordEncoder.encode(request.getPassword());
    request.setPassword(hashPassword);
    return userService.createUser(request);
  }

  // API: Cập nhật người dùng
  @PutMapping("/{id}")
  @PreAuthorize("hasAuthority('ADMIN')")
  @ResponseStatus(HttpStatus.OK)
  @ApiMessage("Cập nhật người dùng thành công")
  public UserDTO updatedUser(@PathVariable("id") @Valid Long id, @RequestBody UserRequest request) {
    return userService.updateUser(id, request);
  }

  // API: Xoá người dùng
  @DeleteMapping("/{id}")
  @PreAuthorize("hasAuthority('ADMIN')")
  @ApiMessage("Xóa người dùng thành công")
  public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id) {
    userService.deleteUser(id);
    return ResponseEntity.ok().build();
  }

}
