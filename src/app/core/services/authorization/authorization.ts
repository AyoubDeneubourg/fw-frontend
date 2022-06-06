import { HttpHeaders } from "@angular/common/http";

export function getHeaders(options?: any): HttpOptions {
    const authorization = getToken() ? { 'Authorization': getToken() } : null

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        //'Content-Type': 'application/json',

        'Access-Control-Allow-Origin': '*',
        ...authorization,
        ...options
      })
    };
    return httpOptions;
  }

  

  export function getToken(): Token {
    if (localStorage.getItem('token')) return localStorage.getItem('token') as Token;
    else return null
  }
  
  
  export function setToken(token: Token) {
    localStorage.setItem('token', token);
  }
  
  export function removeToken() {
    localStorage.removeItem('token');
  }
  
  
  export type Token = string;

  export type HttpOptions = {
    headers: HttpHeaders
  }

