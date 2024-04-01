
import {Component, EventEmitter, Injectable} from "@angular/core";
import { User } from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private userData: User | undefined;
  userDataChanged: EventEmitter<User> = new EventEmitter<User>();

  private loadingSupplyProduct: boolean = false;
  loadingSupplyProductDataChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  getUserData(): User | undefined {
    return this.userData;
  }

  setUserData(value: User | undefined): void {
    this.userData = value;
    this.userDataChanged.emit(value);
  }

  getLoadingSupplyProduct(): boolean {
    return this.loadingSupplyProduct;
  }

  setLoadingSupplyProduct(value: boolean):void {
    this.loadingSupplyProduct = value;
    this.loadingSupplyProductDataChanged.emit(value);
  }
}