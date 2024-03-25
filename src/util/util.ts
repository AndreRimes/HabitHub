import { Day } from "@/types/models";

export function BinarySearch(searchDate: string, calendar: Day[]){
    let l = 0;
    let r = calendar.length - 1;

    while (l <= r) {
        let mid = Math.floor((r + l) / 2)
        if (calendar[mid].date === searchDate) {
            return calendar[mid];
        } else if (calendar[mid].date < searchDate) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }

    return calendar[0]
}