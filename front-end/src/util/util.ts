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


export function generateRandomString(length: number): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        randomString += charset[randomIndex];
    }

    return randomString;
}

export function generateUniqueRandomString(length: number): string {
    const usedStrings = new Set<string>();
    let randomString = generateRandomString(length);

    while (usedStrings.has(randomString)) {
        randomString = generateRandomString(length);
    }

    usedStrings.add(randomString);
    return randomString;
}

