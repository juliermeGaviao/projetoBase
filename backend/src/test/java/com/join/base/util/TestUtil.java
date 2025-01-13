package com.join.base.util;

import java.net.http.HttpClient;

import org.mockito.MockedStatic;
import org.mockito.Mockito;

public class TestUtil {

    private static MockedStatic<HttpClient> httpClientMockedStatic;

    public static HttpClient getHttpClientMock() {
		HttpClient result = Mockito.mock(HttpClient.class);

		getMockStatic().when(HttpClient::newHttpClient).thenReturn(result);

    	return result;
    }

    private static MockedStatic<HttpClient> getMockStatic() {
    	if (httpClientMockedStatic == null) {
        	httpClientMockedStatic = Mockito.mockStatic(HttpClient.class);
    	}

    	return httpClientMockedStatic;
    }

}
