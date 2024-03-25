package util

import (
	"errors"
	db "habithub/db/sqlc"
	"strconv"
	"strings"
	"time"
)

type Day struct {
	Date         string     `json:"date"`
	DayOfTheWeek string     `json:"dayOfTheWeek"`
	Events       []db.Event `json:"events"`
	IsToday      bool       `json:"isToday"`
	IsNotInMonth bool       `json:"isNotInMonth"`
}

func GenerateCalendar(year int, month time.Month) []Day {
	firstDay := time.Date(year, month, 1, 0, 0, 0, 0, time.Local)

	start := firstDay.AddDate(0, 0, -int(firstDay.Weekday())+1)

	lastDay := time.Date(year, month+1, 0, 0, 0, 0, 0, time.Local)

	var ax int
	if lastDay.Weekday() == 0 {
		ax = 7
	} else {
		ax = int(lastDay.Weekday())
	}

	end := lastDay.AddDate(0, 0, 7-ax)

	var calendar []Day

	dic := map[int]string{
		0: "Sun",
		1: "Mon",
		2: "Tue",
		3: "Wed",
		4: "Thu",
		5: "Fri",
		6: "Sat",
	}

	today := time.Now().Format("2006-01-02")

	for current := start; !current.After(end); current = current.AddDate(0, 0, 1) {
		day := Day{
			Date:         current.Format("2006-01-02"),
			DayOfTheWeek: dic[int(current.Weekday())],
		}

		if current.Month() != month {
			day.IsNotInMonth = true
		}

		if current.Format("2006-01-02") == today {
			day.IsToday = true
		}

		calendar = append(calendar, day)
	}

	return calendar
}

func AddEventToCalendar(events []db.Event, calendar []Day) []Day {
	for _, event := range events {
        calendar = AddOneEvent(event, calendar)	
	}
	return calendar
}

func AddOneEvent(event db.Event, calendar []Day) []Day {
	switch event.Frequency {
	case "Single":
		for i, day := range calendar {
			if day.Date == event.FrequencyExtension {
				calendar[i].Events = append(day.Events, event)
				break
			}
		}
	case "Monthly":
		for i, day := range calendar {
			if strings.Split(day.Date, "-")[2] == event.FrequencyExtension {
				calendar[i].Events = append(calendar[i].Events, event)
				break
			}
		}
	case "Annually":
		eventParts := strings.Split(event.FrequencyExtension, "-")
		eventMonth, _ := strconv.Atoi(eventParts[0])
		eventDay, _ := strconv.Atoi(eventParts[1])

		for i, day := range calendar {
			parts := strings.Split(day.Date, "-")
			dayMonth, _ := strconv.Atoi(parts[1])
			dayDay, _ := strconv.Atoi(parts[2])

			if dayMonth == eventMonth && dayDay == eventDay {
				calendar[i].Events = append(calendar[i].Events, event)
				break
			}
		}
	case "Weekly":
		weekDays := strings.Split(event.FrequencyExtension, "-")
		for i, day := range calendar {

			for _, weekDay := range weekDays {
				if weekDay == day.DayOfTheWeek {
					calendar[i].Events = append(calendar[i].Events, event)
				}
			}
		}
	}
    return calendar
}

func FindToday(calendar []Day) (Day, error) {
	l := 0
	r := len(calendar) - 1

	today := time.Now().Format("2006-01-02")

	for l <= r {
		mid := l + (r-l)/2
		if calendar[mid].Date == today {
			return calendar[mid], nil
		} else if calendar[mid].Date < today {
			l = mid + 1
		} else {
			r = mid - 1
		}
	}

	return Day{}, errors.New("Not Found")
}

func IsLeapYear(year int) bool {
	if year%4 == 0 && (year%100 != 0 || year%400 == 0) {
		return true
	}
	return false
}
