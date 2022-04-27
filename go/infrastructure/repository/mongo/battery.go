package mongo

import (
	"freelancer/college-app/go/entity"
	"time"

	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type BatteryPayloadModel struct {
	ID           bson.ObjectId `bson:"_id"`
	UserID       bson.ObjectId `bson:"user_id"`
	BatteryLevel float64       `bson:"battery_level"`
	LowPowerMode bool          `bson:"low_power_mode"`
	BatteryState string        `bson:"battery_state"`
	CreationDate time.Time     `bson:"creation_date"`
}

func toBatteryPayloadModel(battery entity.BatteryPayload) BatteryPayloadModel {

	var batteryID bson.ObjectId
	if battery.ID != "" {
		batteryID = bson.ObjectIdHex(battery.ID)
	} else {
		batteryID = bson.NewObjectId()
	}

	var userID bson.ObjectId
	if battery.UserID != "" {
		userID = bson.ObjectIdHex(battery.UserID)
	} else {
		userID = bson.NewObjectId()
	}

	return BatteryPayloadModel{
		ID:           batteryID,
		UserID:       userID,
		BatteryLevel: battery.BatteryLevel,
		LowPowerMode: battery.LowPowerMode,
		BatteryState: battery.BatteryState,
		CreationDate: battery.CreationDate,
	}
}

type BatteryRepository struct {
	Session      *mgo.Session
	DatabaseName string
}

func NewBatteryRepository(repository *Repository) *BatteryRepository {
	return &BatteryRepository{
		Session:      repository.Session,
		DatabaseName: repository.DatabaseName,
	}
}

func (r *BatteryRepository) CreateBattery(batteryPayload entity.BatteryPayload) error {

	session := r.Session.Copy()
	defer session.Close()
	com := session.DB(r.DatabaseName).C("batteries")

	batteryPayloadModel := toBatteryPayloadModel(batteryPayload)
	err := com.Insert(&batteryPayloadModel)
	if err != nil {
		return err
	}

	return nil
}
