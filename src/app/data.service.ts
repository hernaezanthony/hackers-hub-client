import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get('https://localhost:4000/api/events')
  }

  postData(jSon){
	  return this.http.post('https://localhost:4000/api/events', jSon)     
  }

  getEvent(eventId) {
    return this.http.get('https://localhost:4000/api/events/'+eventId)
  }

  updateEvent(eventId, jSon){
    return this.http.put('https://localhost:4000/api/events/'+eventId, jSon)
  }

  deleteEvent(eventId){
    return this.http.delete('https://localhost:4000/api/events/'+eventId)
  }
}
