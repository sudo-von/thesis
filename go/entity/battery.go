package entity

import "time"

type BatteryPayload struct {
	ID           string
	UserID       string
	BatteryLevel float64
	LowPowerMode bool
	BatteryState string
	CreationDate time.Time
}
