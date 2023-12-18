import { BehaviorSubject, Subject } from "rxjs";

const imageObserver = new BehaviorSubject<string>('');

export const getImageName = () => {
    return imageObserver;
}

export const setImageName = (url: string) => {
    imageObserver.next(url);
}