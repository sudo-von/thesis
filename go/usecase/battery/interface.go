package battery

import (
	"freelancer/college-app/go/entity"
)

type UserReader interface {
	GetUserByID(userID string) (*entity.User, error)
}

type UserRepository interface {
	UserReader
}

type BatteryWriter interface {
	CreateBattery(newBattery entity.BatteryPayload) error
}

type BatteryRepository interface {
	BatteryWriter
}
