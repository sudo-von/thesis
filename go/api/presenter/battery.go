package presenter

import (
	"errors"
	"net/http"
	"strings"
)

type BatteryPayload struct {
	BatteryLevel float64 `json:"battery_level" example:"20.00"`
	LowPowerMode bool    `json:"low_power_mode" example:"true"`
	BatteryState string  `json:"battery_state" example:"charging"`
}

func (bp *BatteryPayload) validate() (err error) {
	if bp.BatteryLevel == 0 {
		err = mergeErrors(err, errors.New("missing field battery_level"))
	}
	if len(strings.TrimSpace(bp.BatteryState)) == 0 {
		err = mergeErrors(err, errors.New("missing field battery_state"))
	}
	return
}

func (bp *BatteryPayload) Bind(r *http.Request) error {
	if err := bp.validate(); err != nil {
		return err
	}
	return nil
}
