/**
 * Docker Engine API
 * The Engine API is an HTTP API served by Docker Engine. It is the API the Docker client uses to communicate with the Engine, so everything the Docker client can do can be done with the API. Most of the client's commands map directly to API endpoints (e.g. `docker ps` is `GET /containers/json`). The notable exception is running containers, which consists of several API calls. # Errors The API uses standard HTTP status codes to indicate the success or failure of the API call. The body of the response will be JSON in the following format: ``` {   \"message\": \"page not found\" } ``` # Versioning The API is usually changed in each release, so API calls are versioned to ensure that clients don't break. To lock to a specific version of the API, you prefix the URL with its version, for example, call `/v1.30/info` to use the v1.30 version of the `/info` endpoint. If the API version specified in the URL is not supported by the daemon, a HTTP `400 Bad Request` error message is returned. If you omit the version-prefix, the current version of the API (v1.40) is used. For example, calling `/info` is the same as calling `/v1.40/info`. Using the API without a version-prefix is deprecated and will be removed in a future release. Engine releases in the near future should support this version of the API, so your client will continue to work even if it is talking to a newer Engine. The API uses an open schema model, which means server may add extra properties to responses. Likewise, the server will ignore any extra query parameters and request body properties. When you write clients, you need to ignore additional properties in responses to ensure they do not break when talking to newer daemons. # Authentication Authentication for registries is handled client side. The client has to send authentication details to various endpoints that need to communicate with registries, such as `POST /images/(name)/push`. These are sent as `X-Registry-Auth` header as a Base64 encoded (JSON) string with the following structure: ``` {   \"username\": \"string\",   \"password\": \"string\",   \"email\": \"string\",   \"serveraddress\": \"string\" } ``` The `serveraddress` is a domain/IP without a protocol. Throughout this structure, double quotes are required. If you have already got an identity token from the [`/auth` endpoint](#operation/SystemAuth), you can just pass this instead of credentials: ``` {   \"identitytoken\": \"9cbaf023786cd7...\" } ``` 
 *
 * OpenAPI spec version: 1.40
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs/Observable';

import { ErrorResponse } from '../model/errorResponse';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class SessionExperimentalService {

    protected basePath = 'http://localhost/v1.40';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Initialize interactive session
     * Start a new interactive session with a server. Session allows server to call back to the client for advanced capabilities. &gt; **Note**: This endpoint is *experimental* and only available if the daemon is started with experimental &gt; features enabled. The specifications for this endpoint may still change in a future version of the API. ### Hijacking This endpoint hijacks the HTTP connection to HTTP2 transport that allows the client to expose gPRC services on that connection. For example, the client sends this request to upgrade the connection: &#x60;&#x60;&#x60; POST /session HTTP/1.1 Upgrade: h2c Connection: Upgrade &#x60;&#x60;&#x60; The Docker daemon will respond with a &#x60;101 UPGRADED&#x60; response follow with the raw stream: &#x60;&#x60;&#x60; HTTP/1.1 101 UPGRADED Connection: Upgrade Upgrade: h2c &#x60;&#x60;&#x60; 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public session(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public session(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public session(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public session(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/vnd.docker.raw-stream'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'text/plain'
        ];

        return this.httpClient.post<any>(`${this.basePath}/session`,
            null,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
