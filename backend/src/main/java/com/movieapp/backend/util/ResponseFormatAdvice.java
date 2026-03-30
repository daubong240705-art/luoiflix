package com.movieapp.backend.util;

import com.movieapp.backend.domain.RestResponse;
import com.movieapp.backend.util.annotation.ApiMessage;

import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

@ControllerAdvice
public class ResponseFormatAdvice implements ResponseBodyAdvice<Object> {

    @Override
    public boolean supports(MethodParameter returnType, Class converterType) {
        return returnType.hasMethodAnnotation(ApiMessage.class);
    }

    @Override
    public Object beforeBodyWrite(
            Object body,
            MethodParameter returnType,
            MediaType selectedContentType,
            Class selectedConverterType,
            ServerHttpRequest request,
            ServerHttpResponse response) {

        ApiMessage apiMessage = returnType.getMethodAnnotation(ApiMessage.class);

        int status = ((ServletServerHttpResponse) response)
                .getServletResponse()
                .getStatus();

        return RestResponse.builder()
                .statusCode(status)
                .message(apiMessage.value())
                .data(body)
                .error(null)
                .build();
    }
}