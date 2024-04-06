import { Day } from "@/types/models";

export function BinarySearch(searchDate: string, calendar: Day[]) {
    let l = 0;
    let r = calendar.length - 1;

    while (l <= r) {
        let mid = Math.floor((r + l) / 2)
        if (calendar[mid].date === searchDate) {
            return mid;
        } else if (calendar[mid].date < searchDate) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }

    return -1
}


export function getFomatedToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


export function getHeader() {

    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`
    };

    return headers

}