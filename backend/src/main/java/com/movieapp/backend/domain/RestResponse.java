package com.movieapp.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RestResponse<T> {
    private int statusCode;
    private Object error;
    private Object message;
    private T data;

}
