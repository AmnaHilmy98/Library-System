import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  headers: Headers;

  constructor(private http: HttpClient) {
  }


  public readonly SERVER_URL = 'http://localhost:9000';
  public readonly BOOKS_URL = '/books';
  public readonly SEARCH_BOOKS_URL = '/books/search';
  public readonly LENDING_BOOKS_URL = '/books/lending/';
  public readonly BORROW_BOOKS_URL = '/books/borrow/';
  public readonly RETURN_BOOKS_URL = '/books/return/';
  public readonly DELETE_BOOKS_URL = '/books/delete/';
  public readonly NOTIFICATIONS_URL = '/notifications';

  getBooks(): Observable<any> {
    const requestUrl: string = this.SERVER_URL + this.BOOKS_URL;
    return this.http.get(requestUrl);
  }

  searchBooks(obj): Observable<any> {
    let requestUrl: string = this.SERVER_URL + this.SEARCH_BOOKS_URL;
    if (obj) {
      if (obj.itemName && obj.itemId) {
        requestUrl = this.SERVER_URL + this.SEARCH_BOOKS_URL + '?id=' + obj.itemId + '&name=' + obj.itemName;
      } else if (obj.itemName) {
        requestUrl = this.SERVER_URL + this.SEARCH_BOOKS_URL + '?name=' + obj.itemName;
      } else if (obj.itemId) {
        requestUrl = this.SERVER_URL + this.SEARCH_BOOKS_URL + '?id=' + obj.itemId;
      }
    }
    return this.http.get(requestUrl);
  }

  getNotifications(): Observable<any> {
    const requestUrl: string = this.SERVER_URL + this.NOTIFICATIONS_URL;
    return this.http.get(requestUrl);
  }

  borrowBook(id: number, reader: string): Observable<any> {
    const requestUrl: string = this.SERVER_URL + this.BORROW_BOOKS_URL + id + '?r=' + reader;
    return this.http.get(requestUrl);
  }

  returnBook(id: number): Observable<any> {
    const requestUrl: string = this.SERVER_URL + this.RETURN_BOOKS_URL + id;
    return this.http.get(requestUrl);
  }

  deleteBook(id: number): Observable<any> {
    const requestUrl: string = this.SERVER_URL + this.DELETE_BOOKS_URL + id;
    return this.http.get(requestUrl);
  }

  addBook(item: any): Observable<any> {
    const requestUrl: string = this.SERVER_URL + this.BOOKS_URL;
    return this.http.post(requestUrl, item);
  }

  getLendings(id: string): Observable<any> {
    const requestUrl: string = this.SERVER_URL + this.LENDING_BOOKS_URL + id;
    return this.http.get(requestUrl);
  }
}
