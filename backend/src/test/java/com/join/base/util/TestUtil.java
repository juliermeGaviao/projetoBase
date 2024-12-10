package com.join.base.util;

import java.net.http.HttpClient;

import org.mockito.MockedStatic;
import org.mockito.Mockito;

public class TestUtil {

    private static HttpClient httpClientMock;

    public static HttpClient getHttpClientMock() {
    	if (httpClientMock == null) {
    		setupAll();
    	}

    	return httpClientMock;
    }

    private static void setupAll() {
    	MockedStatic<HttpClient> httpClientMockedStatic = Mockito.mockStatic(HttpClient.class);

    	httpClientMock = Mockito.mock(HttpClient.class);

    	httpClientMockedStatic.when(HttpClient::newHttpClient).thenReturn(httpClientMock);
    }

}
