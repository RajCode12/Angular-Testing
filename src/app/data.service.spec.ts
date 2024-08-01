import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { USERS } from './user';

describe('DataService', () => {
  let service: DataService;
  let testingController : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(DataService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should get all users', () => {
    service.getAllUser().subscribe((users:any) => {
      expect(users).toBeTruthy();
      expect(users.length).toBe(3);
      const secondUser = users.find((user:any) => user.id === 2);
      expect(secondUser.name).toBe('Dev');
      
    });
    // we can invoke mock request using exceptOne
    const mockReq = testingController.expectOne('api/users');
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(Object.values(USERS));
    //Now, setup is ready
  });

  it('should get user by Id', () => {
    service.getUserById(1).subscribe((user:any) => {
      expect(user).toBeTruthy();
      expect(user.name).toBe('Raj');
      
    });
    const mockReq = testingController.expectOne('api/users/1');
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(USERS[1]);
  });

  it('should update user by Id', () => {
    let changes = {age : 24};
    service.updateUserById(1,changes).subscribe((user:any) => {
      expect(user).toBeTruthy();
      expect(user.id).toBe(1);
    })
    const mockReq = testingController.expectOne('api/users/1');
    expect(mockReq.request.method).toEqual('PUT');

    let modifiedUser = USERS[1];
    modifiedUser.age = 24;
    mockReq.flush(modifiedUser);
  });
  
});
